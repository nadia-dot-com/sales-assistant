import { Flex, IconButton, Textarea } from "@chakra-ui/react";
import { X } from "lucide-react";
import {
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
} from "react";
import { styles } from "@/components/molecules/ChatTextarea/ChatTextarea.styles";

interface ChatTextareaProps {
  value: string;
  placeholder: string;
  label: string;
  onValueChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onClick: () => void;
  isLoading: boolean;
  onClear: () => void;
  isMultiline: boolean;
  onMultilineChange: (isMultiline: boolean) => void;
}

const TAG = "ChatTextarea";

export function ChatTextarea({
  value,
  placeholder,
  label,
  isLoading,
  onValueChange,
  onSubmit,
  onClick,
  onClear,
  isMultiline,
  onMultilineChange,
}: ChatTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    const checkHeight = () => {
      const style = getComputedStyle(textarea);
      const lineHeight =
        Number.parseFloat(style.lineHeight) ||
        Number.parseFloat(style.fontSize) * 1.4;
      const padding =
        Number.parseFloat(style.paddingTop) +
        Number.parseFloat(style.paddingBottom);
      const roundBrowserHeight = 1;

      if (textarea.clientHeight > lineHeight + padding + roundBrowserHeight) {
        onMultilineChange(true);
      }
    };

    const observer = new ResizeObserver(checkHeight);
    observer.observe(textarea);
    return () => observer.disconnect();
  });

  useEffect(() => {
    if (!value) onMultilineChange(false);
  }, [value, onMultilineChange]);

  const handleOnKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter") return;
    if (event.shiftKey || event.nativeEvent.isComposing) return;

    event.preventDefault();
    if (isLoading) return;
    onSubmit(event.currentTarget.value);
  };

  const handleOnPaste = (event: ClipboardEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget;
    setTimeout(() => onValueChange(textarea.value), 0);
  };

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onValueChange(event.target.value);
  };

  return (
    <Flex
      data-testid={TAG}
      {...(isMultiline ? styles.rootMultiline : styles.root)}
    >
      <Textarea
        ref={textareaRef}
        value={value}
        placeholder={placeholder}
        aria-label={label}
        data-testid={`${TAG}-textarea`}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        onPaste={handleOnPaste}
        onClick={onClick}
        {...styles.textarea}
      />
      <IconButton
        variant="outline"
        size="md"
        disabled={value.trim() === ""}
        data-testid={`${TAG}-cancel`}
        onClick={onClear}
        {...styles.deleteButton}
      >
        <X />
      </IconButton>
    </Flex>
  );
}
