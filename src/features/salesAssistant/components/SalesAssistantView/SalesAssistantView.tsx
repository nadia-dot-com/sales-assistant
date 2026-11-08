"use client";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChatTextarea } from "@/components/molecules/ChatTextarea/ChatTextarea";
import { LanguageSwitcher } from "@/components/molecules/LanguageSwitcher/LanguageSwitcher";
import type { SearchFacetInput } from "@/features/product/helpers/filterAndFacetsTypes/filterAndFacetsTypes.types";
import type { ProductFacetResponse } from "@/features/product/types/productResponse.types";
import { ChatMessages } from "@/features/salesAssistant/components/ChatMessages/ChatMessages";
import { styles } from "@/features/salesAssistant/components/SalesAssistantView/SalesAssistantView.styles";
import { ScrollDownButton } from "@/features/salesAssistant/components/ScrollDownButton/ScrollDownButton";
import { VoiceRecognition } from "@/features/salesAssistant/components/VoiceRecognition/VoiceRecognition";
import { VoiceRecognitionTrigger } from "@/features/salesAssistant/components/VoiceRecognitionTrigger/VoiceRecognitionTrigger";
import type { AvailableLanguage } from "@/features/salesAssistant/config";
import { CHAT_SCROLL_KEY } from "@/features/salesAssistant/constants/chatSessionKey";
import { useChat } from "@/features/salesAssistant/hook/useChat";
import { useVoiceRecognition } from "@/features/salesAssistant/hook/useVoiceRecognition";
import { useMicrophonePermission } from "@/hooks/useMicrophonePermission";

const getScroller = () => document.body;

interface SalesAssistantViewProps {
  availableLanguages: AvailableLanguage[];
  language: string;
  facetMap: ProductFacetResponse["facetMap"];
  buildedFacets: SearchFacetInput[];
  chatId: string;
}

const TAG = "SalesAssistant";

export function SalesAssistantView({
  availableLanguages,
  language,
  facetMap,
  buildedFacets,
}: SalesAssistantViewProps) {
  const t = useTranslations();
  const [clientLanguage, setClientLanguage] = useState(language);
  const [isMultiline, setIsMultiline] = useState(false);
  const pathname = usePathname();
  const isOnSalesAssistant = pathname === "/salesAssistant";
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputBarRef = useRef<HTMLDivElement | null>(null);
  const languageChat = clientLanguage.slice(0, 2);
  const micButtonRef = useRef<HTMLButtonElement | null>(null);
  const { chatHistory, isLoading, handleSearch, handleFiltersChange, session } =
    useChat(languageChat, facetMap, buildedFacets);

  const voice = useVoiceRecognition(clientLanguage, handleSearch, isLoading);

  const { permissionStatus, isLoading: isPermissionLoading } =
    useMicrophonePermission({
      onGranted: () => {
        voice.setRecognitionState("off");
      },
      onDenied: () => {
        voice.retireRecognition();
      },
    });

  useEffect(() => {
    setClientLanguage(language);
  }, [language]);

  useEffect(() => {
    if (!session) return;
    const params = new URLSearchParams(window.location.search);
    params.set("chatId", session);
    window.history.replaceState(
      window.history.state,
      "",
      `?${params.toString()}`,
    );
  }, [session]);

  useEffect(() => {
    if (!isOnSalesAssistant) return;
    const el = getScroller();
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      const value = el.scrollTop;
      timeoutId = setTimeout(() => {
        sessionStorage.setItem(CHAT_SCROLL_KEY, String(value));
      }, 150);
    };

    el.addEventListener("scroll", handleScroll);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [isOnSalesAssistant]);

  useLayoutEffect(() => {
    if (chatHistory.length === 0) return;
    const saved = sessionStorage.getItem(CHAT_SCROLL_KEY);
    if (!saved) return;
    getScroller().scrollTop = Number(saved);
    sessionStorage.removeItem(CHAT_SCROLL_KEY);
  }, [chatHistory.length]);

  const handleOnValueChange = (value: string) => {
    voice.transcriptRef.current = value;
    voice.setTranscript(value);
  };

  const handleOnSubmit = (value: string) => {
    const trimmedTranscript = value.trim();

    if (!trimmedTranscript) {
      return;
    }

    handleSearch(trimmedTranscript);
    voice.clearTranscript();
    voice.retireRecognition();
  };

  const handleClick = () => {
    voice.retireRecognition();
  };

  return (
    <Flex {...styles.container}>
      {chatHistory.length === 0 ? (
        <Flex {...styles.wrapper}>
          <VoiceRecognitionTrigger
            isActive={voice.recognitionState === "recording"}
            onClick={() => micButtonRef.current?.click()}
          />
        </Flex>
      ) : (
        <>
          <ChatMessages
            chatHistory={chatHistory}
            isLoading={isLoading}
            facetMap={facetMap}
            onFiltersChange={handleFiltersChange}
          />
          <Box ref={bottomRef} data-testid={`${TAG}-intersection-box`}></Box>
        </>
      )}
      <Flex
        data-testid="SalesAssistantView-inputBar"
        {...styles.inputBar}
        ref={inputBarRef}
      >
        <Flex {...styles.controlContainer}>
          <LanguageSwitcher
            availableLanguages={availableLanguages}
            selectedLanguage={clientLanguage}
            onLanguageChange={setClientLanguage}
          />
          <VoiceRecognition
            {...voice}
            permissionStatus={permissionStatus}
            isPermissionLoading={isPermissionLoading}
            isMultiline={isMultiline}
            micButtonRef={micButtonRef}
          />
        </Flex>
        <ChatTextarea
          isMultiline={isMultiline}
          onMultilineChange={setIsMultiline}
          onClear={voice.clearTranscript}
          value={voice.transcript}
          isLoading={isLoading}
          placeholder={t("salesAssistantPage.voiceRecognition.placeholder")}
          label={t("salesAssistantPage.voiceRecognition.inputLabel")}
          onValueChange={(value) => handleOnValueChange(value)}
          onSubmit={(value) => handleOnSubmit(value)}
          onClick={handleClick}
        />
        <Flex {...styles.controlButtons}>
          <IconButton
            variant="outline"
            size="md"
            disabled={voice.transcript === "" || isLoading}
            data-testid={`${TAG}-submit-button`}
            aria-label={t("salesAssistantPage.chat.sendMessage.label")}
            onClick={() => handleOnSubmit(voice.transcript)}
            {...styles.submitButton}
          >
            <Check />
          </IconButton>
        </Flex>
        {chatHistory.length !== 0 && (
          <ScrollDownButton
            getScroller={getScroller}
            targetRef={bottomRef}
            inputBarRef={inputBarRef}
          />
        )}
      </Flex>
    </Flex>
  );
}
