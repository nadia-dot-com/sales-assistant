"use client";
import { Center, Flex, Heading, Icon, Spinner } from "@chakra-ui/react";
import { Mic } from "lucide-react";
import { useTranslations } from "next-intl";
import type { RefObject } from "react";
import { ActionButton } from "@/components/atoms/ActionButton";
import { Tooltip } from "@/components/atoms/Tooltip";
import { styles } from "@/features/salesAssistant/components/VoiceRecognition/VoiceRecognition.styles";
import type { useVoiceRecognitionProps } from "@/features/salesAssistant/hook/useVoiceRecognition";

const TAG = "VoiceRecognition";

interface VoiceRecognitionProps extends useVoiceRecognitionProps {
  permissionStatus: PermissionState | undefined;
  isPermissionLoading: boolean;
  isMultiline?: boolean;
  micButtonRef: RefObject<HTMLButtonElement | null>;
}

export function VoiceRecognition({
  recognitionState,
  speechRecognitionSupported,
  isPermissionLoading,
  isDownloading,
  permissionStatus,
  triggerRecognition,
  micButtonRef,
  isMultiline = false,
}: VoiceRecognitionProps) {
  const t = useTranslations();

  const color =
    recognitionState !== "off" ? "destructive-color" : "foreground-color";

  const isHintOpen = recognitionState === "recording" && !isMultiline;

  if (!speechRecognitionSupported) {
    return (
      <Heading data-testid={`${TAG}-unsupportedBrowser`}>
        {t("salesAssistantPage.voiceRecognition.unsupportedBrowser")}
      </Heading>
    );
  }
  if (isPermissionLoading || isDownloading) {
    return (
      <Center>
        <Spinner data-testid={`${TAG}-spinner`} />
      </Center>
    );
  }

  if (permissionStatus === "denied") {
    return (
      <Heading data-testid={`${TAG}-enableMicrophone`}>
        {t("salesAssistantPage.voiceRecognition.enableMicrophone")}
      </Heading>
    );
  }

  return (
    <Flex {...styles.root}>
      <Tooltip
        open={isHintOpen}
        positioning={{ placement: "top" }}
        content={t("salesAssistantPage.voiceRecognition.listening")}
        data-testid={`${TAG}-transcript-listening`}
        showArrow
        contentProps={{ ...styles.voiceHint }}
      >
        <ActionButton
          ref={micButtonRef}
          onClick={() => triggerRecognition(permissionStatus)}
          variant="solid"
          backgroundColor={`${color}/40`}
          color={color}
          animation={recognitionState !== "off" ? "pulse" : "paused"}
          data-testid={`${TAG}-mic`}
          data-state={recognitionState}
          aria-label={t(
            `salesAssistantPage.voiceRecognition.status.${recognitionState}`,
          )}
          {...styles.button}
        >
          <Icon {...styles.iconSmall}>
            <Mic />
          </Icon>
        </ActionButton>
      </Tooltip>
    </Flex>
  );
}
