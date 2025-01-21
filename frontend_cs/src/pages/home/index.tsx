import { Box, Button, Container, Flex, Heading, Icon, Stack, Text, useColorModeValue, } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { FcAbout, FcAssistant, FcCollaboration, FcDonate, FcManager, } from 'react-icons/fc'

interface CardProps {
    heading: string
    description: string
    icon: ReactElement
    href: string
}

const Card = ({ heading, description, icon, href }: CardProps) => {
    return (
        <Box
            bg="white"
            shadow="lg"
            maxW={{ base: 'full', md: '275px' }}
            w={'full'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}>
            <Stack align={'start'} spacing={2}>
                <Flex
                    w={16}
                    h={16}
                    align={'center'}
                    justify={'center'}
                    color={'white'}
                    rounded={'full'}
                    bg={useColorModeValue('gray.100', 'gray.700')}>
                    {icon}
                </Flex>
                <Box mt={2}>
                    <Heading size="md">{heading}</Heading>
                    <Text mt={1} fontSize={'sm'}>
                        {description}
                    </Text>
                </Box>
                <Button as="a" href={href} variant={'link'} colorScheme={'blue'} size={'sm'}>
                    Go to
                </Button>
            </Stack>
        </Box>
    )
}

export const HomePage = () => {
    return (
        <Box p={4}>
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                    Welcome to Customer Service Portal
                </Heading>
                <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
                    This is a customer service portal, where CS specialists could monitor customers service flow easily!
                    With all information, you can contact via: anhloc280@gmail.com (Paul Phan)
                </Text>
            </Stack>

            <Container maxW={'5xl'} mt={12}>
                <Flex flexWrap="wrap" gridGap={6} justify="center">
                    <Card
                        heading={'Customers Management'}
                        icon={<Icon as={FcAssistant} w={10} h={10} />}
                        description={'Create, Update, Read customer information.'}
                        href={'/customers'}
                    />
                    <Card
                        heading={'User Management'}
                        icon={<Icon as={FcCollaboration} w={10} h={10} />}
                        description={'Create, Update, Read, grant permission for employee in system'}
                        href={'/users'}
                    />
                    <Card
                        heading={'Support ticket Management'}
                        icon={<Icon as={FcDonate} w={10} h={10} />}
                        description={'You can create, update support ticket when customers need help.'}
                        href={'#'}
                    />
                    <Card
                        heading={'Messenger Management'}
                        icon={<Icon as={FcManager} w={10} h={10} />}
                        description={'Chat with customers on online environment.'}
                        href={'#'}
                    />
                    <Card
                        heading={'Profile Management'}
                        icon={<Icon as={FcAbout} w={10} h={10} />}
                        description={'You can manage your profile.'}
                        href={'#'}
                    />
                </Flex>
            </Container>
        </Box>
    )
}