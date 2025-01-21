import { Flex, IconButton, useColorModeValue, Text, HStack, Menu, MenuButton, VStack, Avatar, Box, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import Cookies from 'js-cookie';
import { MobileProps } from "@/abstract/props";
import { navigateToLogin } from "@/utils";


export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const userProfile = localStorage.getItem("userProfile") ? JSON.parse(localStorage.getItem("userProfile") as string) : null
  const userName = userProfile?.name;
  const userRole = userProfile?.role == 0 ? "User" : "Adminitrator";

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.pond5.com/hand-rubbing-angry-boys-head-footage-007926095_iconl.jpeg'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{userName}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {userRole}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem as="a" href="/profile">Profile</MenuItem>
              <MenuItem as="a" href="/settings">Settings</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => {
                localStorage.removeItem("userProfile");
                Cookies.remove("token");
                navigateToLogin();
              }}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}
