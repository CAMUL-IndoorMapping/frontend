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
    Input,
    InputGroup,
    InputRightElement,
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
import { AdminFeedback } from "../admin/feedback";
import AdminBeacons from "../admin/beacons";
import { goToAdminFeedbackPage, goToBeaconsPage } from "../../../store/navigation-reducer";
import { useStoreDispatch } from "../../../store";

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
        },
        {
            settingName: t("admin_feedback")
        },
        {
            settingName: t("admin_beacons")
        }
    ];

    const [stateSettingName, setSettingName] = useState("Setting Name");

    // Set das OPTIONS
    function setStates(
        settingName: string
    ): void {
        setSettingName(settingName);
    }

    //Open e close para Dialog e Modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    //Ação do botão de show password
    const [show, setShow] = React.useState(false)
    const handleClickShowButton = () => setShow(!show)

    //Click numa opção
    const handleClick = (newSettingName: React.SetStateAction<string>) => {
        setSettingName(newSettingName)
        onOpen()
    }

    //Click num botão de confirmar uma ação
    const handleClickConfirm = () => {
        onOpen()
    }

    const handleDeleteAccountConfirm = () => {
        //MANDAR APAGAR A CONTA PELO PEDIDO
        onClose()
        alert("You just deleted your account... how dare u :(")
    }

    function handleChangePasswordConfirm(old: string, newPass: string): void {
        console.log(old)
        console.log(newPass)
        //Verificar se os dados são válidos
        //MANDAR MUDAR PASS A CONTA PELO PEDIDO
        onClose()
        alert("You just updated your password... noice xD")
    }

    //Guardar valores das passwords no Change password
    const [valuePasswordOld, setValueOld] = React.useState('')
    const [valuePasswordNew, setValueNew] = React.useState('');
    const [valuePasswordNewConfirm, setValueNewConfirm] = React.useState('');

    //Dispatch function
    const dispatch = useStoreDispatch();

    const handleChangeOld = (event: { target: { value: React.SetStateAction<string>; }; }) => setValueOld(event.target.value)
    const handleChangeNew = (event: { target: { value: React.SetStateAction<string>; }; }) => setValueNew(event.target.value)
    const handleChangeNewConfirm = (event: { target: { value: React.SetStateAction<string>; }; }) => setValueNewConfirm(event.target.value)

    function getSettingContentBrowser(settingName: string): ReactNode {
        switch (settingName) {
            case t("themes"):
                return (
                    <>
                        <Text fontSize="xx-large" textColor={"isepBrick.500"}>
                            {t("themes")}
                        </Text>
                        <br></br>
                        <Text fontSize="large">
                            {t('themes_content_1')}
                        </Text>
                        <ThemeToggle></ThemeToggle>
                    </>
                );

                break;
            case t("sounds"): //t("sounds")
                return (
                    <>
                        <Text fontSize="xx-large" textColor={"isepBrick.500"}>
                            {t("sounds")}
                        </Text>
                        <br></br>
                        <Text fontSize="md">
                            {t('sounds_content_1')}
                        </Text>
                    </>
                );
                break;
            case t("delete_account"): //t("delete_account")
                return (
                    <>
                        <Text fontSize="xx-large" textColor={"isepBrick.500"}>
                            {t("delete_account")}
                        </Text>
                        <br></br>
                        <Text fontSize="md">
                            {t("delete_account_content_1")}
                        </Text>
                        <Text fontSize="xx-small">
                            <strong>{t("warning")}</strong>: {t("delete_account_content_2")}
                        </Text>
                        <br></br>
                        <CustomButton
                            backgroundColor="isepBrick.500"
                            borderColor="isepGreen.500"
                            buttonColor="isepGrey.600"
                            hoverColor="isepBrick.400"
                            text={t("delete_account")}
                            textColor="#FFFFFF"
                            width="280px"
                            handleButtonClick={() => handleClickConfirm()}
                        />

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>{t("delete_account_content_3")}</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Text fontSize="md">
                                        {t("delete_account_content_4")}
                                    </Text>
                                    <br></br>
                                    <CustomButton
                                        backgroundColor="isepBrick.500"
                                        borderColor="isepGreen.500"
                                        buttonColor="isepGrey.600"
                                        hoverColor="isepBrick.400"
                                        text={t("confirm")}
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
                                        text={t("cancel")}
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
            case t("change_password"):
                return (
                    <>
                        <Text fontSize="xx-large" textColor={"isepBrick.500"}>
                            {t("change_password")}
                        </Text>
                        <br></br>
                        <Text fontSize="md">
                            {t("change_password_content_1")}
                        </Text>
                        <Text fontSize="xx-small">
                            <strong>{t("warning")}</strong>: {t("change_password_content_2")}
                        </Text>
                        <br></br>
                        <CustomButton
                            backgroundColor="isepBrick.500"
                            borderColor="isepGreen.500"
                            buttonColor="isepGrey.600"
                            hoverColor="isepBrick.400"
                            text={t("change_password")}
                            textColor="#FFFFFF"
                            width="280px"
                            handleButtonClick={() => handleClickConfirm()}
                        />

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>{t("change_password_content_3")}</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>

                                    <InputGroup size='md'>
                                        {/* <Text mb='8px'>Value: {valuePasswordOld}</Text> */}
                                        <Input
                                            variant='flushed' placeholder={t('old_password')} marginBottom={"20px"}
                                            pr='4.5rem'
                                            type={show ? 'text' : 'password'}
                                            onChange={handleChangeOld}
                                            value={valuePasswordOld}
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClickShowButton}>
                                                {show ? t('hide_password') : t('show_password')}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <InputGroup size='md'>
                                        {/* <Text mb='8px'>Value: {valuePasswordNew}</Text> */}
                                        <Input
                                            variant='flushed' placeholder={t('new_password')} marginBottom={"20px"}
                                            pr='4.5rem'
                                            type={show ? 'text' : 'password'}
                                            onChange={handleChangeNew}
                                            value={valuePasswordNew}
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClickShowButton}>
                                                {show ? t('hide_password') : t('show_password')}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <InputGroup size='md'>
                                        {/* <Text mb='8px'>Value: {valuePasswordNewConfirm}</Text> */}
                                        <Input
                                            variant='flushed' placeholder={t('confirm_password')} marginBottom={"20px"}
                                            pr='4.5rem'
                                            type={show ? 'text' : 'password'}
                                            onChange={handleChangeNewConfirm}
                                            value={valuePasswordNewConfirm}
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClickShowButton}>
                                                {show ? t('hide_password') : t('show_password')}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>

                                    <CustomButton
                                        backgroundColor="isepBrick.500"
                                        borderColor="isepGreen.500"
                                        buttonColor="isepGrey.600"
                                        hoverColor="isepBrick.400"
                                        text={t('save_changes')}
                                        textColor="#FFFFFF"
                                        width="280px"
                                        handleButtonClick={() => handleChangePasswordConfirm(valuePasswordOld, valuePasswordNew)}
                                        disabledCondition={valuePasswordNewConfirm != valuePasswordNew || (valuePasswordNewConfirm === "" || valuePasswordNew === "" || valuePasswordOld === "")}
                                    />
                                    <br></br>
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </>
                );
                break;
            case t("about_app"): //t("about_app")
                return (
                    <>
                        <Text fontSize="xx-large" textColor={"isepBrick.500"}>
                            {t("about_app")}
                        </Text>
                        <br></br>
                        <Text fontSize="large">
                            {t("about_app_content_1")}
                        </Text>
                        <br></br>
                        <Text fontSize="md">
                            {t("about_app_content_2")}
                            {t("about_app_content_3")}
                        </Text>
                        <Image src={"https://s3-alpha-sig.figma.com/img/e61d/d2cb/0a63e30674435607b06b4d6b466384f5?Expires=1653264000&Signature=DO-5QTTdSrt52S62TeXnUDv5kGF7x-H~XS2i9F7U4guJhpn1vX8oK4P5pZatIZw9UbnpJxN~D5MbvX~cCsnaNlIP5lVq3oTujy~hOUNMhwcbFpLrhhUXd0ZxLO1a1Ru-hQrrdOuskQoi55G4NjJFPm6rO9TynhaQzLlGiM~wdNb8xYA34f6a5N1TvtEp6GR~Z5vELnqHpZvfcMVCEALJwy8PsxbzyzA5-myfIIBa53xL9fixwJg~u2u5pEEeElhiRS7FyvZMeWQyb7jb3A7nyH8bbWbdXROqHDV1FozpluMmrmWMGG-8mT1DRBRRrBmPxF46tOa9n6ouvj13SUNxLw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"} alt="uploadImage" width={"50%"} />
                    </>
                );
                break;
            case t("contact_us"): //t("contact_us")
                return (
                    <>
                        <Text fontSize="xx-large" textColor={"isepBrick.500"}>
                            {t("contact_us")}
                        </Text>
                        <br></br>
                        <Text fontSize="md">
                            {t("contact_us_content_1")}
                        </Text>
                    </>
                );
                break;
            case t("terms_conditions"): //t("terms_conditions")
                return (
                    <>
                        <Text fontSize="xx-large" textColor={"isepBrick.500"}>
                            {t("terms_conditions")}
                        </Text>
                        <br></br>
                        <Text fontSize="md">
                            {t("terms_conditions_content_1")}
                        </Text>
                    </>
                );
                break;
            case t("patch_notes"): //t("patch_notes")
                return (
                    <>
                        <Text fontSize="xx-large" textColor={"isepBrick.500"}>
                            {t("patch_notes")}
                        </Text>
                        <br></br>
                        <Text fontSize="md">
                            {t("patch_notes_content_1")}
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
                        <Text fontSize="large">
                            {t('themes_content_1')}
                        </Text>
                        <ThemeToggle></ThemeToggle>
                    </>
                );

                break;
            case t("sounds"): //t("sounds")
                return (
                    <>
                        <Text fontSize="md">
                            {t('sounds_content_1')}
                        </Text>
                    </>
                );
                break;
            case t("delete_account"): //t("delete_account")
                return (
                    <>
                        <Text fontSize="md">
                            {t("delete_account_content_4")}
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
                        <InputGroup size='md'>
                            {/* <Text mb='8px'>Value: {valuePasswordOld}</Text> */}
                            <Input
                                variant='flushed' placeholder={t('old_password')} marginBottom={"20px"}
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                onChange={handleChangeOld}
                                value={valuePasswordOld}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClickShowButton}>
                                    {show ? t('hide_password') : t('show_password')}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <InputGroup size='md'>
                            {/* <Text mb='8px'>Value: {valuePasswordNew}</Text> */}
                            <Input
                                variant='flushed' placeholder={t('new_password')} marginBottom={"20px"}
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                onChange={handleChangeNew}
                                value={valuePasswordNew}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClickShowButton}>
                                    {show ? t('hide_password') : t('show_password')}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <InputGroup size='md'>
                            {/* <Text mb='8px'>Value: {valuePasswordNewConfirm}</Text> */}
                            <Input
                                variant='flushed' placeholder={t('confirm_password')} marginBottom={"20px"}
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                onChange={handleChangeNewConfirm}
                                value={valuePasswordNewConfirm}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClickShowButton}>
                                    {show ? t('hide_password') : t('show_password')}
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                        <CustomButton
                            backgroundColor="isepBrick.500"
                            borderColor="isepGreen.500"
                            buttonColor="isepGrey.600"
                            hoverColor="isepBrick.400"
                            text={t('save_changes')}
                            textColor="#FFFFFF"
                            width="280px"
                            handleButtonClick={() => handleChangePasswordConfirm(valuePasswordOld, valuePasswordNew)}
                            disabledCondition={valuePasswordNewConfirm != valuePasswordNew || (valuePasswordNewConfirm === "" || valuePasswordNew === "" || valuePasswordOld === "")}
                        />
                        <br></br>
                    </>
                );
                break;
            case t("about_app"): //t("about_app")
                return (
                    <>
                        <Text fontSize="large">
                            {t("about_app_content_1")}
                        </Text>
                        <br></br>
                        <Text fontSize="md">
                            {t("about_app_content_2")}
                            {t("about_app_content_3")}
                        </Text>
                        <Image src={"https://s3-alpha-sig.figma.com/img/e61d/d2cb/0a63e30674435607b06b4d6b466384f5?Expires=1653264000&Signature=DO-5QTTdSrt52S62TeXnUDv5kGF7x-H~XS2i9F7U4guJhpn1vX8oK4P5pZatIZw9UbnpJxN~D5MbvX~cCsnaNlIP5lVq3oTujy~hOUNMhwcbFpLrhhUXd0ZxLO1a1Ru-hQrrdOuskQoi55G4NjJFPm6rO9TynhaQzLlGiM~wdNb8xYA34f6a5N1TvtEp6GR~Z5vELnqHpZvfcMVCEALJwy8PsxbzyzA5-myfIIBa53xL9fixwJg~u2u5pEEeElhiRS7FyvZMeWQyb7jb3A7nyH8bbWbdXROqHDV1FozpluMmrmWMGG-8mT1DRBRRrBmPxF46tOa9n6ouvj13SUNxLw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"} alt="uploadImage" width={"50%"} />
                    </>
                );
                break;
            case t("contact_us"): //t("contact_us")
                return (
                    <>
                        <Text fontSize="md">
                            {t("contact_us_content_1")}
                        </Text>
                    </>
                );
                break;
            case t("terms_conditions"): //t("terms_conditions")
                return (
                    <>
                        <Text fontSize="md">
                            {t("terms_conditions_content_1")}
                        </Text>
                    </>
                );
                break;
            case t("patch_notes"): //t("patch_notes")
                return (
                    <>
                        <Text fontSize="md">
                            {t("patch_notes_content_1")}
                        </Text>
                    </>
                );
                break;
            case t("admin_feedback"): 
                return (
                    <>
                        {dispatch(goToAdminFeedbackPage())}
                    </>
                );
                break;
            case t("admin_beacons"): 
                return (
                    <>
                        {dispatch(goToBeaconsPage())}
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
                <SimpleGrid columns={[1, 2]} minChildWidth={"200px"}>
                    <Box width={"200px"}>
                        {array1.map(({ settingName }) => (

                            <Button variant='link'
                                __css={{
                                    'justify-content': 'left',
                                    'padding-left': "30px"
                                }}
                                width="100%"
                                marginBottom="5"

                                _hover={{ bg: "isepBrick.300", textColor: "black" }}
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
