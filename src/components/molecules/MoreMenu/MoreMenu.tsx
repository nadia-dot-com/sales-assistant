import {
  Icon,
  Menu,
  type MenuOpenChangeDetails,
  Portal,
} from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import type { PropsWithChildren, Ref } from "react";

interface MoreMenuProps extends PropsWithChildren {
  ref?: Ref<HTMLButtonElement> | undefined;
  hasCurrentOption?: boolean;
  open: boolean;
  setIsOpen: (details: MenuOpenChangeDetails) => void;
  onClick?: () => void;
}

export function MoreMenu({
  ref,
  open,
  setIsOpen,
  children,
  hasCurrentOption,
  onClick,
}: MoreMenuProps) {
  return (
    <Menu.Root open={open} onOpenChange={setIsOpen}>
      <Menu.Trigger
        ref={ref}
        color={hasCurrentOption || open ? "primary-color" : ""}
        onClick={onClick}
      >
        <Icon>
          <ChevronDown size={24} />
        </Icon>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>{children}</Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
