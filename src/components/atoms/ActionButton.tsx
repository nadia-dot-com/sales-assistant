"use client";
import { Button, type ButtonProps, Spinner } from "@chakra-ui/react";
import type { Ref } from "react";

interface ActionButtonProps extends ButtonProps {
  isPending?: boolean;
  ref?: Ref<HTMLButtonElement> | undefined;
}

export function ActionButton({
  children,
  onClick,
  isPending,
  ref,
  ...props
}: ActionButtonProps) {
  return (
    <Button ref={ref} onClick={onClick} {...props}>
      {isPending ? <Spinner /> : children}
    </Button>
  );
}
