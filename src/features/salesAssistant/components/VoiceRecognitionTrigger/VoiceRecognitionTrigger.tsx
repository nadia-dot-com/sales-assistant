import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import AvatarIcon from "@/assets/icons/avatar.svg";
import { ActionButton } from "@/components/atoms/ActionButton";
import { ResponseTail } from "@/components/atoms/ResponseTail/ResponseTail";
import { styles } from "@/features/salesAssistant/components/VoiceRecognitionTrigger/VoiceRecognitionTrigger.styles";

interface VoiceRecognitionTriggerProps {
  onClick: () => void;
  isActive: boolean;
}

export function VoiceRecognitionTrigger({
  onClick,
  isActive,
}: VoiceRecognitionTriggerProps) {
  const t = useTranslations();

  return (
    <Flex {...styles.root}>
      <ActionButton onClick={onClick} {...styles.button}>
        <Icon {...styles.icon}>
          <AvatarIcon aria-label="Avatar" role="img" />
        </Icon>
      </ActionButton>
      <Flex {...styles.messageSlot}>
        <Flex
          {...styles.voiceWaveform}
          visibility={isActive ? "visible" : "hidden"}
        >
          <Box {...styles.voiceWaveformBar} />
          <Box {...styles.voiceWaveformBar} />
          <Box {...styles.voiceWaveformBar} />
          <Box {...styles.voiceWaveformBar} />
          <Box {...styles.voiceWaveformBar} />
          <Box {...styles.voiceWaveformBar} />
          <Box {...styles.voiceWaveformBar} />
          <Box {...styles.voiceWaveformBar} />
          <Box {...styles.voiceWaveformBar} />
          <Box {...styles.voiceWaveformBar} />
          <Box {...styles.voiceWaveformBar} />
          <Box {...styles.voiceWaveformBar} />
          <Box {...styles.voiceWaveformBar} />
        </Flex>
        <Flex
          {...styles.welcomeContainer}
          visibility={isActive ? "hidden" : "visible"}
        >
          <Heading as="h1" {...styles.welcomeMessage}>
            {t("salesAssistantPage.welcome.message")}
            <ResponseTail />
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  );
}
