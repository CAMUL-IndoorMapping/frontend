import React, { ReactNode, useState } from "react";
import {
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text,
    Image,
    Center,
    Button,
    ButtonGroup,
    SimpleGrid,
    Grid,
    GridItem,
    Divider,
    extendTheme,
    ColorModeScript,
    useColorMode,
    useColorModeValue,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    useDisclosure,
    RadioGroup,
    Stack,
    Radio,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from "@chakra-ui/react";
import ReactAudioPlayer from "react-audio-player";
import { BrowserView, MobileView } from "react-device-detect";
import theme from './theme';
import Toggle from "../../../components/buttons/toggle";
import { useTranslation } from "react-i18next";

import { ChevronRightIcon } from '@chakra-ui/icons'
import CustomButton from "../../../components/buttons";
import ThemeToggle from "../../../components/buttons/toggle";
import { FaBold } from "react-icons/fa";

interface Options {
    settingName: string
}

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}


function UserSettings() {

    const { t } = useTranslation();

    const array1: Options[] = [ //endpoint Feedback/GET ALL
        {
            settingName: t("themes")
        },
        {
            settingName: t("sounds")
        },
        {
            settingName: t("delete_account")
        },
        {
            settingName: t("change_password")
        },
        {
            settingName: t("about_app")
        },
        {
            settingName: t("contact_us")
        },
        {
            settingName: t("terms_conditions")
        },
        {
            settingName: t("patch_notes")
        }
    ];

    const [stateSettingName, setSettingName] = useState("Setting Name");

    function setStates(
        settingName: string
    ): void {
        setSettingName(settingName);
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [placement, setPlacement] = React.useState('bottom')
    const btnRef = React.useRef()

    const handleClick = (newSettingName: React.SetStateAction<string>) => {
        setSettingName(newSettingName)
        onOpen()
    }

    const handleClickConfirm = () => {
        onOpen()
    }

    const handleDeleteAccountConfirm = () => {
        //MANDAR APAGAR A CONTA PELO PEDIDO
        onClose()
        alert("You just deleted your account... how dare u :(")
    }

    function getSettingContentBrowser(settingName: string): ReactNode {
        switch (settingName) {
            case t("themes"):
                return (
                    <>
                        <br></br>
                        <Text fontSize="large">
                            In this section you will be able to change between theme styles of the application - white and dark mode.
                        </Text>
                        <ThemeToggle></ThemeToggle>
                    </>
                );

                break;
            case t("sounds"): //t("sounds")
                return (
                    <>
                        <Text fontSize="md">
                            My new sound update section
                            Edit content here
                        </Text>
                    </>
                );
                break;
            case t("delete_account"): //t("delete_account")
                return (
                    <>
                        <Text fontSize="md">
                            In this section you will be able to delete your account from the current application system.
                        </Text>
                        <Text fontSize="xx-small">
                            <Text textStyle={{ fontWeight: 'bold' }}></Text>: You won't be able to use it at its fullest after the action confirmation.
                        </Text>
                        <br></br>
                        <CustomButton
                            backgroundColor="isepBrick.500"
                            borderColor="isepGreen.500"
                            buttonColor="isepGrey.600"
                            hoverColor="isepBrick.400"
                            text="Delete Account"
                            textColor="#FFFFFF"
                            width="280px"
                            handleButtonClick={() => handleClickConfirm()}
                        />

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Account Delete confirmation</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Text fontSize="md">
                                        Are you sure you want to delete your account?
                                    </Text>
                                    <br></br>
                                    <CustomButton
                                        backgroundColor="isepBrick.500"
                                        borderColor="isepGreen.500"
                                        buttonColor="isepGrey.600"
                                        hoverColor="isepBrick.400"
                                        text="CONFIRM"
                                        textColor="#FFFFFF"
                                        width="280px"
                                        handleButtonClick={() => handleDeleteAccountConfirm()}
                                    />
                                    <br></br>
                                    <CustomButton
                                        backgroundColor="white"
                                        borderColor="isepBrick.500"
                                        buttonColor="white"
                                        hoverColor="isepBrick.400"
                                        text="CANCEL"
                                        textColor="isepBrick.500"
                                        width="280px"
                                        handleButtonClick={() => onClose}
                                    />
                                    <br></br>
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </>
                );
                break;
            case t("change_password"): //t("change_password")
                return (
                    <>
                        <Text fontSize="md">
                            My new change password section
                            Edit content of HTML here
                        </Text>
                    </>
                );
                break;
            case t("about_app"): //t("about_app")
                return (
                    <>
                        <br></br>
                        <Text fontSize="large">
                            How it all started.
                        </Text>
                        <br></br>
                        <Text fontSize="md">
                            This is our about the App section. It's not much but you don't need information to know our app is dope!
                            Just use it please... thank you for your attention.
                        </Text>
                        <Image src={"https://s3-alpha-sig.figma.com/img/e61d/d2cb/0a63e30674435607b06b4d6b466384f5?Expires=1653264000&Signature=DO-5QTTdSrt52S62TeXnUDv5kGF7x-H~XS2i9F7U4guJhpn1vX8oK4P5pZatIZw9UbnpJxN~D5MbvX~cCsnaNlIP5lVq3oTujy~hOUNMhwcbFpLrhhUXd0ZxLO1a1Ru-hQrrdOuskQoi55G4NjJFPm6rO9TynhaQzLlGiM~wdNb8xYA34f6a5N1TvtEp6GR~Z5vELnqHpZvfcMVCEALJwy8PsxbzyzA5-myfIIBa53xL9fixwJg~u2u5pEEeElhiRS7FyvZMeWQyb7jb3A7nyH8bbWbdXROqHDV1FozpluMmrmWMGG-8mT1DRBRRrBmPxF46tOa9n6ouvj13SUNxLw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"} alt="uploadImage" />
                    </>
                );
                break;
            case t("contact_us"): //t("contact_us")
                return (
                    <>

                        <Text fontSize="md">
                            My new Contact us section
                            Edit content of HTML here
                        </Text>
                    </>
                );
                break;
            case t("terms_conditions"): //t("terms_conditions")
                return (
                    <>
                        <Text fontSize="md">
                            My new terms and conditions section
                            Edit content of HTML here
                        </Text>
                    </>
                );
                break;
            case t("patch_notes"): //t("patch_notes")
                return (
                    <>
                        <Text fontSize="md">
                            My new patch notes section
                            Edit content of HTML here
                        </Text>
                    </>
                );
                break;
            default:
                break;
        }
    }

    function getSettingContentMobile(settingName: string): ReactNode {
        switch (settingName) {
            case t("themes"):
                return (
                    <>
                        <br></br>
                        <Text fontSize="large">
                            In this section you will be able to change between theme styles of the application - white and dark mode.
                        </Text>
                        <ThemeToggle></ThemeToggle>
                    </>
                );

                break;
            case t("sounds"): //t("sounds")
                return (
                    <>
                        <Text fontSize="md">
                            My new sound update section
                            Edit content here
                        </Text>
                    </>
                );
                break;
            case t("delete_account"): //t("delete_account")
                return (
                    <>
                        <Text fontSize="md">
                            Are you sure you want to delete your account?
                        </Text>
                        <br></br>
                        <CustomButton
                            backgroundColor="isepBrick.500"
                            borderColor="isepGreen.500"
                            buttonColor="isepGrey.600"
                            hoverColor="isepBrick.400"
                            text="CONFIRM"
                            textColor="#FFFFFF"
                            width="280px"
                            handleButtonClick={() => handleDeleteAccountConfirm()}
                        />
                        <br></br>
                        <CustomButton
                            backgroundColor="white"
                            borderColor="isepBrick.500"
                            buttonColor="white"
                            hoverColor="isepBrick.400"
                            text="CANCEL"
                            textColor="isepBrick.500"
                            width="280px"
                            handleButtonClick={() => onClose()}
                        />
                    </>
                );
                break;
            case t("change_password"): //t("change_password")
                return (
                    <>
                        <Text fontSize="md">
                            My new change password section
                            Edit content of HTML here
                        </Text>
                    </>
                );
                break;
            case t("about_app"): //t("about_app")
                return (
                    <>
                        <br></br>
                        <Text fontSize="large">
                            How it all started.
                        </Text>
                        <br></br>
                        <Text fontSize="md">
                            This is our about the App section. It's not much but you don't need information to know our app is dope!
                            Just use it please... thank you for your attention.
                        </Text>
                        <Image src={"https://s3-alpha-sig.figma.com/img/e61d/d2cb/0a63e30674435607b06b4d6b466384f5?Expires=1653264000&Signature=DO-5QTTdSrt52S62TeXnUDv5kGF7x-H~XS2i9F7U4guJhpn1vX8oK4P5pZatIZw9UbnpJxN~D5MbvX~cCsnaNlIP5lVq3oTujy~hOUNMhwcbFpLrhhUXd0ZxLO1a1Ru-hQrrdOuskQoi55G4NjJFPm6rO9TynhaQzLlGiM~wdNb8xYA34f6a5N1TvtEp6GR~Z5vELnqHpZvfcMVCEALJwy8PsxbzyzA5-myfIIBa53xL9fixwJg~u2u5pEEeElhiRS7FyvZMeWQyb7jb3A7nyH8bbWbdXROqHDV1FozpluMmrmWMGG-8mT1DRBRRrBmPxF46tOa9n6ouvj13SUNxLw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"} alt="uploadImage" />
                    </>
                );
                break;
            case t("contact_us"): //t("contact_us")
                return (
                    <>

                        <Text fontSize="md">
                            My new Contact us section
                            Edit content of HTML here
                        </Text>
                    </>
                );
                break;
            case t("terms_conditions"): //t("terms_conditions")
                return (
                    <>
                        <Text fontSize="md">
                            My new terms and conditions section
                            Edit content of HTML here
                        </Text>
                    </>
                );
                break;
            case t("patch_notes"): //t("patch_notes")
                return (
                    <>
                        <Text fontSize="md">
                            My new patch notes section
                            Edit content of HTML here
                        </Text>
                    </>
                );
                break;
            default:
                break;
        }
    }

    return (
        <>
            <MobileView>
                {array1.map(({ settingName }) => (
                    <>
                        {/* <Accordion allowToggle>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton onClick={() => handleClick(settingName)}
                                        bg="isepBrick.300"
                                        m={4}
                                        color="isepGrey.500"
                                    >
                                        <Box textAlign="left" textColor="#000000">
                                            {settingName}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                            </AccordionItem>
                        </Accordion> */}


                        <Button variant='link' onClick={() => handleClick(settingName)}
                            color={'isep.brick.500'}
                            marginBottom="5"
                            marginLeft={'7'}
                            __css={{
                                'justify-content': 'left'
                            }}
                            textAlign='left'
                            width="100%"
                            justify-content='center !important'
                            key={stateSettingName}
                        >
                            {settingName}
                            <ChevronRightIcon __css={{
                                'justify-content': 'right'
                            }}>

                            </ChevronRightIcon>
                        </Button>
                    </>
                ))}
                <Drawer
                    isOpen={isOpen}
                    placement='bottom'
                    onClose={onClose}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>{stateSettingName}</DrawerHeader>
                        <DrawerBody>
                            {getSettingContentMobile(stateSettingName)}
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </MobileView>

            <BrowserView>
                <SimpleGrid columns={[1, 2]}>
                    <Box>
                        {array1.map(({ settingName }) => (

                            <Button variant='link'
                                __css={{
                                    'justify-content': 'left',
                                    'padding-left': "30px"
                                }}
                                width="100%"
                                marginBottom="5"

                                _hover={{ bg: "isepBrick.300" }}
                                _focus={{
                                    boxShadow: "none",
                                }}
                                textAlign='left'
                                onClick={() =>
                                    setStates(settingName)
                                }
                            >
                                {settingName}
                                <ChevronRightIcon __css={{
                                    'justify-content': 'right'
                                }}
                                    textAlign="right"
                                />
                            </Button>
                        ))}
                    </Box>

                    <Box
                        marginBottom="1%"
                        textAlign={"left"}
                        borderRadius="3xl"
                        width="500px"
                    >
                        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                            <GridItem colSpan={1} h="320" w="10">
                                <Divider orientation="vertical" />
                            </GridItem>
                            <GridItem colStart={2} colEnd={7} h="320">
                                <Box>
                                    {getSettingContentBrowser(stateSettingName)}
                                    <Box height={'100px'}></Box>
                                    <Text fontSize="xs" as="i" align={"left"}>
                                        {stateSettingName}
                                    </Text>
                                </Box>
                            </GridItem>
                        </Grid>
                    </Box>
                </SimpleGrid>
            </BrowserView>
        </>
    );
}

// export class Settings extends React.Component<{}, {}> {
//     state: Options = {
//         settingName: ""
//     };


//     private setSetting(
//         event: string,
//         eventName: string,
//         eventType: string
//     ) {
//         this.setState({ settingName: event });
//     }




//     private getSettingContent(settingName: string): ReactNode {
//         switch (settingName) {
//             case "Themes": //t("themes")
//                 return (
//                     <div>
//                         <Text fontSize="xx-large">
//                             Themes
//                         </Text>
//                         <br></br>
//                         <Text fontSize="large">
//                             In this section you will be able to change between theme styles of the application - white and dark mode.
//                         </Text>
//                         <Toggle></Toggle>
//                     </div>
//                 );

//                 break;
//             case "Sounds": //t("sounds")
//                 return (
//                     <div>
//                         <Text fontSize="md">
//                             My new sound update section
//                             Edit content of HTML here
//                         </Text>
//                     </div>
//                 );
//                 break;
//             case "Delete Account": //t("delete_account")
//                 return (
//                     <div>
//                         <Text fontSize="md">
//                             My new delete acoount section
//                             Edit content of HTML here
//                         </Text>
//                     </div>
//                 );
//                 break;
//             case "Change Password": //t("change_password")
//                 return (
//                     <div>
//                         <Text fontSize="md">
//                             My new change password section
//                             Edit content of HTML here
//                         </Text>
//                     </div>
//                 );
//                 break;
//             case "About the App": //t("about_app")
//                 return (
//                     <div>
//                         <Text fontSize="xx-large">
//                             About Us
//                         </Text>
//                         <br></br>
//                         <Text fontSize="large">
//                             How it all started.
//                         </Text>
//                         <br></br>
//                         <Text fontSize="md">
//                             This is our about the App section. It's not much but you don't need information to know our app is dope!
//                             Just use it please... thank you for your attention.
//                         </Text>
//                         <Image src={"https://s3-alpha-sig.figma.com/img/e61d/d2cb/0a63e30674435607b06b4d6b466384f5?Expires=1653264000&Signature=DO-5QTTdSrt52S62TeXnUDv5kGF7x-H~XS2i9F7U4guJhpn1vX8oK4P5pZatIZw9UbnpJxN~D5MbvX~cCsnaNlIP5lVq3oTujy~hOUNMhwcbFpLrhhUXd0ZxLO1a1Ru-hQrrdOuskQoi55G4NjJFPm6rO9TynhaQzLlGiM~wdNb8xYA34f6a5N1TvtEp6GR~Z5vELnqHpZvfcMVCEALJwy8PsxbzyzA5-myfIIBa53xL9fixwJg~u2u5pEEeElhiRS7FyvZMeWQyb7jb3A7nyH8bbWbdXROqHDV1FozpluMmrmWMGG-8mT1DRBRRrBmPxF46tOa9n6ouvj13SUNxLw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"} alt="uploadImage" />
//                     </div>
//                 );
//                 break;
//             case "Contact Us": //t("contact_us")
//                 return (
//                     <div>

//                         <Text fontSize="md">
//                             My new Contact us section
//                             Edit content of HTML here
//                         </Text>
//                     </div>
//                 );
//                 break;
//             case "Terms and Conditions": //t("terms_conditions")
//                 return (
//                     <div>
//                         <Text fontSize="md">
//                             My new terms and conditions section
//                             Edit content of HTML here
//                         </Text>
//                     </div>
//                 );
//                 break;
//             case "Patch Notes": //t("patch_notes")
//                 return (
//                     <div>
//                         <Text fontSize="md">
//                             My new patch notes section
//                             Edit content of HTML here
//                         </Text>
//                     </div>
//                 );
//                 break;
//             default:
//                 break;
//         }
//     }

//     render() {
//         return (
//             <>
//                 <MobileView>
//                     {array1.map(({ settingName }) => (
//                         <Accordion allowToggle>
//                             <AccordionItem>
//                                 <h2>
//                                     <AccordionButton
//                                         bg="isepBrick.300"
//                                         w="100%"
//                                         p={4}
//                                         color="isepGrey.500"
//                                     >
//                                         <Box flex="1" textAlign="left" textColor="#000000">
//                                             {settingName}
//                                         </Box>
//                                         <AccordionIcon />
//                                     </AccordionButton>
//                                 </h2>
//                                 <AccordionPanel pb={4}>
//                                     {this.getSettingContent(settingName)}
//                                 </AccordionPanel>
//                             </AccordionItem>
//                         </Accordion>
//                     ))}
//                 </MobileView>

//                 <BrowserView>
//                     <SimpleGrid columns={[1, 2]}>
//                         <Box>
//                             {array1.map(({ settingName }) => (
//                                 <Center>
//                                     <ButtonGroup marginTop="1%" marginBottom="0.5%">
//                                         <Button
//                                             width="350px"
//                                             height="67px"
//                                             _hover={{ bg: "isepBrick.300" }}
//                                             variant="outline"
//                                             _focus={{
//                                                 boxShadow: "none",
//                                             }}
//                                             onClick={() =>
//                                                 this.setSetting(settingName, settingName, settingName)
//                                             }
//                                         >
//                                             <Text>{settingName}</Text>
//                                         </Button>
//                                     </ButtonGroup>
//                                 </Center>
//                             ))}
//                         </Box>

//                         <Box
//                             marginBottom="1%"
//                             textAlign={"left"}
//                             borderRadius="3xl"
//                             width="500px"
//                         >
//                             <Grid templateColumns="repeat(5, 1fr)" gap={4}>
//                                 <GridItem colSpan={1} h="320" w="10">
//                                     <Divider orientation="vertical" />
//                                 </GridItem>
//                                 <GridItem colStart={2} colEnd={7} h="320">
//                                     <Box>
//                                         {this.getSettingContent(this.state.settingName)}
//                                         <Box height={'100px'}></Box>
//                                         <Text fontSize="xs" as="i" align={"left"}>
//                                             {this.state.settingName}
//                                         </Text>
//                                     </Box>
//                                 </GridItem>
//                             </Grid>
//                         </Box>
//                     </SimpleGrid>
//                 </BrowserView>
//             </>
//         );
//     }
// }

export default UserSettings;
