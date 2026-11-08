"use client";

import { useEffect, useRef, useState } from "react";
import { isLocalRecognitionAvailable } from "@/features/salesAssistant/functions/isLocalRecognitionAvailable";
import type { RecognitionState } from "@/features/salesAssistant/types/recognitionState.types";

const DELAY_TO_CUT_MESSAGE_IN_SECONDS = 2000;

export function useVoiceRecognition(
  language: string,
  onSearch: (sentence: string) => void | Promise<void>,
  isLoading: boolean,
) {
  const [transcript, setTranscript] = useState<string>("");
  const transcriptRef = useRef<string>("");

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [recognitionState, setRecognitionState] =
    useState<RecognitionState>("off");

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const processLocallyRef = useRef(false);

  const [speechRecognitionSupported, setSpeechRecognitionSupported] =
    useState(true);

  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const loadingRef = useRef<boolean | null>(null);

  useEffect(() => {
    loadingRef.current = isLoading;
  }, [isLoading]);

  const clearTranscript = () => {
    transcriptRef.current = "";
    setTranscript("");
  };

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const retireRecognition = () => {
    setRecognitionState("off");
    clearTimer();
    const recognition = recognitionRef.current;
    recognitionRef.current = null;
    recognition?.stop();
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <the retire recognition should not be a part of dependency for useEffect>
  useEffect(() => {
    const SpeechRecognitionBuilder =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionBuilder) {
      setSpeechRecognitionSupported(false);
      return;
    }

    let cancelled = false;
    processLocallyRef.current = false;

    isLocalRecognitionAvailable({
      builder: SpeechRecognitionBuilder,
      language: language,
      onDownloadingChange: setIsDownloading,
    })
      .then((available) => {
        if (!cancelled) {
          processLocallyRef.current = available;
        }
      })
      .catch(() => {
        if (!cancelled) {
          processLocallyRef.current = false;
        }
      });

    return () => {
      cancelled = true;
      retireRecognition();
    };
  }, [language]);

  const startSilenceTimer = (): void => {
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;

      const trimmedTranscript = transcriptRef.current.trim();

      if (loadingRef.current) {
        retireRecognition();
        return;
      }

      if (trimmedTranscript) {
        onSearch(trimmedTranscript);
      }

      clearTranscript();
      retireRecognition();
    }, DELAY_TO_CUT_MESSAGE_IN_SECONDS);
  };

  const createRecognition = (): SpeechRecognition | null => {
    const SpeechRecognitionBuilder =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionBuilder) {
      return null;
    }

    const recognition = new SpeechRecognitionBuilder();

    recognition.lang = language;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.processLocally = processLocallyRef.current;

    recognition.onend = () => {
      if (recognitionRef.current !== recognition) {
        return;
      }

      retireRecognition();
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      if (recognitionRef.current !== recognition) {
        return;
      }

      clearTimer();
      startSilenceTimer();

      let finalTranscript = "";
      let interimTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      transcriptRef.current = finalTranscript + interimTranscript;
      setTranscript(transcriptRef.current);
      setRecognitionState("recording");
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.warn(event);
    };

    return recognition;
  };

  const triggerRecognition = (
    permissionStatus: PermissionState | undefined,
  ) => {
    if (recognitionState === "recording") {
      retireRecognition();
      return;
    }

    const recognition = createRecognition();

    if (!recognition) {
      return;
    }

    if (permissionStatus === "granted") {
      setRecognitionState("recording");
    }

    clearTranscript();
    recognitionRef.current = recognition;
    recognition.start();
    startSilenceTimer();
  };

  return {
    recognitionState,
    speechRecognitionSupported,
    isDownloading,
    recognitionRef,
    timeoutRef,
    transcript,
    createRecognition,
    startSilenceTimer,
    setRecognitionState,
    setTranscript,
    transcriptRef,
    clearTranscript,
    retireRecognition,
    triggerRecognition,
  };
}

export interface useVoiceRecognitionProps
  extends ReturnType<typeof useVoiceRecognition> {}
