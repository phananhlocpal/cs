import { Outlet } from "react-router-dom";
import { Box, Drawer, DrawerContent, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings } from "react-icons/fi";
import { LinkItemProps } from "@/abstract/props";
import { SidebarContent, MobileNav } from "./components";
import { useNavigate } from "react-router-dom";

export const BasicLayout = () => {
  const navigate = useNavigate();
  setNavigateFunction(navigate);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome , href: '/'},
    { name: 'Customers', icon: FiTrendingUp, href: '/customers' },
    { name: 'Users', icon: FiCompass, href: '/users' },
    { name: 'Request Tickets', icon: FiStar, href: '/requests' },
    { name: 'Chat', icon: FiSettings, href: '/chat' },
  ]

  return (
    <>
      <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
        <SidebarContent onClose={() => onClose} LinkItems={LinkItems} display={{ base: 'none', md: 'block' }} />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full">
          <DrawerContent>
            <SidebarContent onClose={onClose} LinkItems={LinkItems}/>
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4">
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
