import type { ButtonProps } from "@chakra-ui/react"
import { IconButton as ChakraIconButton } from "@chakra-ui/react"
import { useTranslations } from "next-intl"
import * as React from "react"
import { X } from "lucide-react"

export type CloseButtonProps = ButtonProps

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(function CloseButton(props, ref) {
  const t = useTranslations();

  return (
    <ChakraIconButton variant="ghost" aria-label={t("common.closeButton.close")} ref={ref} {...props}>
      {props.children ?? <X />}
    </ChakraIconButton>
  )
})
