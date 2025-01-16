import {
    Box,
    Flex,
    Text,
    CloseButton,
    useColorModeValue,
} from "@chakra-ui/react";
import { SidebarProps } from "@/abstract/props";
import { NavItem } from "../navItem/navItem.component";
import { Link } from "react-router-dom";

export const SidebarContent = ({
    onClose,
    LinkItems,
    ...rest
}: SidebarProps) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Logo
                </Text>
                <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <Link key={link.name} to={link.href} style={{ textDecoration: "none" }}>
                    <NavItem icon={link.icon}>{link.name}</NavItem>
                </Link>
            ))}
        </Box>
    );
};
