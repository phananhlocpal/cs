import { BoxProps } from "@chakra-ui/react";
import { LinkItemProps } from "./LinkItemProps";

export interface SidebarProps extends BoxProps {
    onClose: () => void,
    LinkItems: Array<LinkItemProps>
}