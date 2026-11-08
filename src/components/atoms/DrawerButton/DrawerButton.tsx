import { Button, type ButtonProps, Text } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import type { IconName } from "lucide-react/dynamic";
import { styles } from "@/components/atoms/DrawerButton/DrawerButton.styles";

interface DrawerButtonProps extends ButtonProps {
  title: string;
  iconName?: IconName;
}
export function DrawerButton({ title, iconName, ...props }: DrawerButtonProps) {
  return (
    <Button type="button" variant="ghost" {...styles.button} {...props}>
      <Text>{title}</Text>
      <ChevronRight />
    </Button>
  );
}
