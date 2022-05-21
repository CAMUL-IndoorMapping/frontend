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
  toast,
  useToast,
  Heading,
  Container,
} from "@chakra-ui/react";
import ReactAudioPlayer from "react-audio-player";
import { BrowserView, MobileView } from "react-device-detect";
import theme from "./theme";
import Toggle from "../../../components/buttons/toggle";
import { useTranslation } from "react-i18next";

import { ChevronRightIcon } from "@chakra-ui/icons";
import CustomButton from "../../../components/buttons";
import ThemeToggle from "../../../components/buttons/toggle";
import { FaBold } from "react-icons/fa";
import AdminFeedback from "../admin/feedback";
import AdminBeacons from "../admin/beacons";
import {
  goToAdminFeedbackPage,
  goToBeaconsPage,
  goToLoginPage,
} from "../../../store/navigation-reducer";
import store, { useStoreDispatch, useStoreSelector } from "../../../store";
import { useSelector } from "react-redux";
import { login, logout, userData } from "../../../store/user-reducer";
import axios from "axios";
import { MdPassword } from "react-icons/md";
import i18n from "../../../i18n";

interface Options {
  settingName: string;
}

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const api = "https://camul2022.pythonanywhere.com";

function UserSettings() {
  const { t } = useTranslation();
  const [langCod, setLangCode] = useState<"PT" | "EN">("PT");

  React.useEffect(() => {
    if (langCod === "PT") {
      i18n.changeLanguage("pt-PT");
    } else {
      i18n.changeLanguage("en-GB");
    }
  }, [langCod]);

  const toast = useToast();

  const currentUser = useStoreSelector(userData);

  console.log(currentUser);

  const settingsForMobile: Options[] =
    currentUser.isAdmin == true
      ? [
          //endpoint Feedback/GET ALL

          {
            settingName: "Logout",
          },
          {
            settingName: t("language"),
          },
          {
            settingName: t("themes"),
          },
          {
            settingName: t("sounds"),
          },
          {
            settingName: t("delete_account"),
          },
          {
            settingName: t("change_password"),
          },
          {
            settingName: t("about_app"),
          },
          {
            settingName: t("contact_us"),
          },
          {
            settingName: t("terms_conditions"),
          },
          {
            settingName: t("patch_notes"),
          },
          {
            settingName: t("admin_feedback"),
          },
          {
            settingName: t("admin_beacons"),
          },
        ]
      : [
          {
            settingName: "logout",
          },
          {
            settingName: t("language"),
          },
          {
            settingName: t("themes"),
          },
          {
            settingName: t("sounds"),
          },
          {
            settingName: t("delete_account"),
          },
          {
            settingName: t("change_password"),
          },
          {
            settingName: t("about_app"),
          },
          {
            settingName: t("contact_us"),
          },
          {
            settingName: t("terms_conditions"),
          },
          {
            settingName: t("patch_notes"),
          },
        ];

  const settingsForWeb: Options[] =
    currentUser.isAdmin == true
      ? [
          //endpoint Feedback/GET ALL

          {
            settingName: "Logout",
          },
          {
            settingName: t("themes"),
          },
          {
            settingName: t("sounds"),
          },
          {
            settingName: t("delete_account"),
          },
          {
            settingName: t("change_password"),
          },
          {
            settingName: t("about_app"),
          },
          {
            settingName: t("contact_us"),
          },
          {
            settingName: t("terms_conditions"),
          },
          {
            settingName: t("patch_notes"),
          }
        ]
      : [
          {
            settingName: "logout",
          },
          {
            settingName: t("themes"),
          },
          {
            settingName: t("sounds"),
          },
          {
            settingName: t("delete_account"),
          },
          {
            settingName: t("change_password"),
          },
          {
            settingName: t("about_app"),
          },
          {
            settingName: t("contact_us"),
          },
          {
            settingName: t("terms_conditions"),
          },
          {
            settingName: t("patch_notes"),
          },
        ];
        
  const [stateSettingName, setSettingName] = useState("Setting Name");

  const [isLoadingButton, setIsLoading] = useState(false);

  const [isInvalidOldPassword, setInvalidOldPassword] = useState(false);

  // Set das OPTIONS
  function setStates(settingName: string): void {
    setSettingName(settingName);
  }

  //Open e close para Dialog e Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Ação do botão de show password
  const [show, setShow] = React.useState(false);
  const handleClickShowButton = () => {
    setShow(!show);
  };

  //Click numa opção
  const handleClick = (newSettingName: React.SetStateAction<string>) => {
    setSettingName(newSettingName);
    setValueOld("");
    setValueNew("");
    setValueNewConfirm("");
    onOpen();
  };

  //Click num botão de confirmar uma ação
  const handleClickConfirm = () => {
    setValueOld("");
    setValueNew("");
    setValueNewConfirm("");
    onOpen();
  };

  const handleLogoutConfirm = () => {
    dispatch(logout());
    dispatch(goToLoginPage());
  };

  const handleDeleteAccountConfirm = () => {
    var jsonDataUDeleteAccount = {
      username: currentUser.username,
      password: currentUser.password,
    };
    setIsLoading(true);
    //MANDAR APAGAR A CONTA PELO PEDIDO
    fetch(api + "/account/delete", {
      method: "DELETE",
      mode: "cors",
      body: JSON.stringify(jsonDataUDeleteAccount),
      headers: {
        authToken: currentUser.authToken,
        "Content-Type": "application/json",
      },
    }).then(
      (response) => {
        if (!response.ok) {
          toast({
            title: t("delete_account_general_error"),
            status: "error",
            isClosable: true,
          });
          throw new Error("Error" + response.status);
        } else {
          toast({
            title: t("delete_account_success"),
            status: "success",
            isClosable: true,
          });
          console.log(response);
          setTimeout(() => {
            dispatch(goToLoginPage());
          }, 2000);
        }
        setIsLoading(false);
      },
      (error) => {
        console.log("erro:" + error);
        setIsLoading(false);
      }
    );
  };

  function handleChangePasswordConfirm(old: string, newPass: string): void {
    var jsonDataUpdateAccount = {
      username: currentUser.username,
      oldPassword: old,
      newPassword: newPass,
    };
    setIsLoading(true);
    //Verificar se os dados são válidos
    fetch(api + "/account/change", {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(jsonDataUpdateAccount),
      headers: {
        authToken: currentUser.authToken,
        "Content-Type": "application/json",
      },
    }).then(
      (response) => {
        if (!response.ok) {
          toast({
            title: t("change_password_general_error"),
            status: "error",
            isClosable: true,
          });
          onClose();
          throw new Error("Error" + response.status);
        } else {
          toast({
            title: t("change_password_success"),
            status: "success",
            isClosable: true,
          });
          console.log(response);

          var updateUserData = {
            username: currentUser.username,
            isAdmin: currentUser.isAdmin,
            password: newPass,
            authToken: currentUser.authToken,
          };

          console.log("login");
          dispatch(login(updateUserData));
          onClose();
        }
        setIsLoading(false);
      },
      (error) => {
        console.log("erro:" + error);
        setIsLoading(false);
      }
    );
  }

  //Guardar valores das passwords no Change password
  const [valuePasswordOld, setValueOld] = React.useState("");
  const [valuePasswordNew, setValueNew] = React.useState("");
  const [valuePasswordNewConfirm, setValueNewConfirm] = React.useState("");

  //Dispatch function
  const dispatch = useStoreDispatch();

  const handleChangeOld = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValueOld(event.target.value);
    setInvalidOldPassword(false);
  };
  const handleChangeNew = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setValueNew(event.target.value);
  const handleChangeNewConfirm = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setValueNewConfirm(event.target.value);

  const handleVerifyOld = () => setInvalidOldPassword(true);

  function getSettingContentBrowser(settingName: string): ReactNode {
    switch (settingName) {
      case "logout":
        return (
          <>
            <Text fontSize="md">{t("logoutConfirmation")}</Text>
            <br></br>
            <CustomButton
              backgroundColor="isepBrick.500"
              borderColor="isepGreen.500"
              buttonColor="isepGrey.600"
              hoverColor="isepBrick.400"
              text="CONFIRM"
              textColor="#FFFFFF"
              width="280px"
              isLoading={isLoadingButton}
              handleButtonClick={() => handleLogoutConfirm()}
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

      case t("themes"):
        return (
          <>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("themes")}
            </Text>
            <br></br>
            <Text fontSize="large">{t("themes_content_1")}</Text>
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
            <Text fontSize="md">{t("sounds_content_1")}</Text>
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
            <Text fontSize="md">{t("delete_account_content_1")}</Text>
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
                  <Text fontSize="md">{t("delete_account_content_4")}</Text>
                  <br></br>
                  <CustomButton
                    backgroundColor="isepBrick.500"
                    borderColor="isepGreen.500"
                    buttonColor="isepGrey.600"
                    hoverColor="isepBrick.400"
                    text={t("confirm")}
                    textColor="#FFFFFF"
                    width="280px"
                    isLoading={isLoadingButton}
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
            <Text fontSize="md">{t("change_password_content_1")}</Text>
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
                  <InputGroup size="md">
                    {/* <Text mb='8px'>Value: {valuePasswordOld}</Text> */}
                    <Input
                      variant="flushed"
                      placeholder={t("old_password")}
                      marginBottom={"20px"}
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      onChange={handleChangeOld}
                      value={valuePasswordOld}
                      isInvalid={valuePasswordOld !== currentUser.password}
                      errorBorderColor="red.300"
                      onInvalid={handleVerifyOld}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleClickShowButton}
                      >
                        {show ? t("hide_password") : t("show_password")}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Text
                    size="xs"
                    color="red.300"
                    display={
                      valuePasswordOld === currentUser.password
                        ? "none"
                        : "block"
                    }
                  >
                    {t("change_password_content_old_password_message")}
                  </Text>
                  <br hidden={valuePasswordOld === currentUser.password} />
                  <InputGroup size="md">
                    {/* <Text mb='8px'>Value: {valuePasswordNew}</Text> */}
                    <Input
                      variant="flushed"
                      placeholder={t("new_password")}
                      marginBottom={"20px"}
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      onChange={handleChangeNew}
                      isInvalid={
                        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}$/.test(
                          valuePasswordNew
                        )
                      }
                      errorBorderColor="red.300"
                      value={valuePasswordNew}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleClickShowButton}
                      >
                        {show ? t("hide_password") : t("show_password")}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Text
                    size="xs"
                    color="red.300"
                    display={
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}$/.test(
                        valuePasswordNew
                      )
                        ? "none"
                        : "block"
                    }
                  >
                    {t("change_password_content_new_password_message")}
                  </Text>
                  <br
                    hidden={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}$/.test(
                      valuePasswordNew
                    )}
                  />
                  <InputGroup size="md">
                    {/* <Text mb='8px'>Value: {valuePasswordNewConfirm}</Text> */}
                    <Input
                      variant="flushed"
                      placeholder={t("confirm_password")}
                      marginBottom={"20px"}
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      onChange={handleChangeNewConfirm}
                      value={valuePasswordNewConfirm}
                      isInvalid={valuePasswordNewConfirm != valuePasswordNew}
                      errorBorderColor="red.300"
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleClickShowButton}
                      >
                        {show ? t("hide_password") : t("show_password")}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Text
                    size="xs"
                    color="red.300"
                    display={
                      valuePasswordNewConfirm === valuePasswordNew
                        ? "none"
                        : "block"
                    }
                  >
                    {t("change_password_content_confirm_new_password_message")}
                  </Text>
                  <br hidden={valuePasswordNewConfirm === valuePasswordNew} />

                  <CustomButton
                    backgroundColor="isepBrick.500"
                    borderColor="isepGreen.500"
                    buttonColor="isepGrey.600"
                    hoverColor="isepBrick.400"
                    text={t("save_changes")}
                    textColor="#FFFFFF"
                    width="280px"
                    isLoading={isLoadingButton}
                    handleButtonClick={() =>
                      handleChangePasswordConfirm(
                        valuePasswordOld,
                        valuePasswordNew
                      )
                    }
                    disabledCondition={
                      valuePasswordNewConfirm != valuePasswordNew ||
                      valuePasswordNewConfirm === "" ||
                      valuePasswordNew === "" ||
                      valuePasswordOld === "" ||
                      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}$/.test(
                        valuePasswordNew
                      ) ||
                      valuePasswordOld !== currentUser.password
                    }
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
            <Text fontSize="large">{t("aboutUsText_1")}</Text>
            <br></br>
            <Text fontSize="md">
              {t("aboutUsText_2")}
              {t("aboutUsText_3")}
            </Text>
          </>
        );
        break;
      case t("contact_us"): //t("contact_us")
        return (
          <>
            <Box>
              <Heading color="#575757" pl="16px" mb="2rem">
                {t("contact_us")}
              </Heading>{" "}
              <Text fontFamily={"Montserrat-Medium"} margin={"10px"}>
                {t("contacts_text")}
              </Text>
              <Container maxW="750px" color="#575757" mt="1rem">
                <Text fontFamily={"Montserrat-Medium"}>
                  André Gonçalves: 1191660@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  André Morais: 1210626@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  Cárina Alas: 1181695@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  Daniel Dias: 1181488@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  Duarte Marques: 1170467@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  Francisco Dias: 1180615@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  Miguel Cabeleira: 1210632@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  Narciso Correia: 1200174@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  Rui Afonso: 1181056@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  Sofia Canelas: 1200185@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  Vítor Neto: 1210130@isep.ipp.pt
                </Text>
              </Container>
            </Box>
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
            <Text fontSize="md">{t("termsAndConditionsPart1")}</Text>
            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart2")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart3")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart4")}</Text>

            <br></br>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("termsAndConditionsPart5")}
            </Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart6")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart7")}</Text>

            <br></br>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("termsAndConditionsPart8")}
            </Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart9")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart10")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart11")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart12")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart13")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart14")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart15")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart16")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart17")}</Text>
            <Text fontSize="md">{t("termsAndConditionsPart18")}</Text>
            <Text fontSize="md">{t("termsAndConditionsPart19")}</Text>
            <Text fontSize="md">{t("termsAndConditionsPart20")}</Text>
            <Text fontSize="md">{t("termsAndConditionsPart21")}</Text>
            <Text fontSize="md">{t("termsAndConditionsPart22")}</Text>

            <br></br>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("termsAndConditionsPart23")}
            </Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart24")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart25")}</Text>
            <Text fontSize="md">{t("termsAndConditionsPart26")}</Text>
            <Text fontSize="md">{t("termsAndConditionsPart27")}</Text>
            <Text fontSize="md">{t("termsAndConditionsPart28")}</Text>
            <Text fontSize="md">{t("termsAndConditionsPart29")}</Text>
            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart30")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart31")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart32")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart33")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart34")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart35")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart36")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart37")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart38")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart39")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart40")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart41")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart42")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart43")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart44")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart45")}</Text>

            <br></br>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("termsAndConditionsPart46")}
            </Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart47")}</Text>

            <br></br>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("termsAndConditionsPart48")}
            </Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart49")}</Text>

            <br></br>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("termsAndConditionsPart50")}
            </Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart51")}</Text>

            <br></br>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("termsAndConditionsPart52")}
            </Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart53")}</Text>

            <br></br>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("termsAndConditionsPart54")}
            </Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart55")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart56")}</Text>

            <br></br>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("termsAndConditionsPart57")}
            </Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart58")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart59")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart60")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart61")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart62")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart63")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart64")}</Text>
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
            <Text fontSize="md">{t("patch_notes_content_1")}</Text>
          </>
        );
        break;
      default:
        break;
    }
  }

  function getSettingContentMobile(settingName: string): ReactNode {
    switch (settingName) {
      case "logout":
        return (
          <>
            <Text fontSize="md">{t("logoutConfirmation")}</Text>
            <br></br>
            <CustomButton
              backgroundColor="isepBrick.500"
              borderColor="isepGreen.500"
              buttonColor="isepGrey.600"
              hoverColor="isepBrick.400"
              text="CONFIRM"
              textColor="#FFFFFF"
              width="280px"
              isLoading={isLoadingButton}
              handleButtonClick={() => handleLogoutConfirm()}
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

      case t("language"):
        return (
          <>
            <Text fontSize="md">{t("choose_language")}</Text>
            <Box margin={"10px"}></Box>
            <div className="lang_options_wrapper">
              <span
                onClick={() => {
                  setLangCode("PT");
                  onClose();
                }}
                style={{
                  fontWeight: langCod === "PT" ? "700" : "300",
                  cursor: "pointer",
                }}
              >
                PT |
              </span>
              <span></span>
              <span
                onClick={() => {
                  setLangCode("EN");
                  onClose();
                }}
                style={{
                  fontWeight: langCod === "EN" ? "700" : "300",
                  cursor: "pointer",
                }}
              >
                | EN
              </span>
            </div>
            <Box margin={"10px"}></Box>
          </>
        );
        break;

      case t("themes"):
        return (
          <>
            <Text fontSize="large">{t("themes_content_1")}</Text>
            <ThemeToggle></ThemeToggle>
          </>
        );

        break;
      case t("sounds"): //t("sounds")
        return (
          <>
            <Text fontSize="md">{t("sounds_content_1")}</Text>
          </>
        );
        break;
      case t("delete_account"): //t("delete_account")
        return (
          <>
            <Text fontSize="md">{t("delete_account_content_4")}</Text>
            <br></br>
            <CustomButton
              backgroundColor="isepBrick.500"
              borderColor="isepGreen.500"
              buttonColor="isepGrey.600"
              hoverColor="isepBrick.400"
              text="CONFIRM"
              textColor="#FFFFFF"
              width="280px"
              isLoading={isLoadingButton}
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
            <InputGroup size="md">
              {/* <Text mb='8px'>Value: {valuePasswordOld}</Text> */}
              <Input
                variant="flushed"
                placeholder={t("old_password")}
                marginBottom={"20px"}
                pr="4.5rem"
                type={show ? "text" : "password"}
                onChange={handleChangeOld}
                value={valuePasswordOld}
                isInvalid={valuePasswordOld !== currentUser.password}
                errorBorderColor="red.300"
                onInvalid={handleVerifyOld}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClickShowButton}>
                  {show ? t("hide_password") : t("show_password")}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text
              size="xs"
              color="red.300"
              display={
                valuePasswordOld === currentUser.password ? "none" : "block"
              }
            >
              {t("change_password_content_old_password_message")}
            </Text>
            <br hidden={valuePasswordOld === currentUser.password} />
            <InputGroup size="md">
              {/* <Text mb='8px'>Value: {valuePasswordNew}</Text> */}
              <Input
                variant="flushed"
                placeholder={t("new_password")}
                marginBottom={"20px"}
                pr="4.5rem"
                type={show ? "text" : "password"}
                onChange={handleChangeNew}
                isInvalid={
                  !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}$/.test(
                    valuePasswordNew
                  )
                }
                errorBorderColor="red.300"
                value={valuePasswordNew}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClickShowButton}>
                  {show ? t("hide_password") : t("show_password")}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text
              size="xs"
              color="red.300"
              display={
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}$/.test(
                  valuePasswordNew
                )
                  ? "none"
                  : "block"
              }
            >
              {t("change_password_content_new_password_message")}
            </Text>
            <br
              hidden={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}$/.test(
                valuePasswordNew
              )}
            />
            <InputGroup size="md">
              {/* <Text mb='8px'>Value: {valuePasswordNewConfirm}</Text> */}
              <Input
                variant="flushed"
                placeholder={t("confirm_password")}
                marginBottom={"20px"}
                pr="4.5rem"
                type={show ? "text" : "password"}
                onChange={handleChangeNewConfirm}
                value={valuePasswordNewConfirm}
                isInvalid={valuePasswordNewConfirm != valuePasswordNew}
                errorBorderColor="red.300"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClickShowButton}>
                  {show ? t("hide_password") : t("show_password")}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text
              size="xs"
              color="red.300"
              display={
                valuePasswordNewConfirm === valuePasswordNew ? "none" : "block"
              }
            >
              {t("change_password_content_confirm_new_password_message")}
            </Text>
            <br hidden={valuePasswordNewConfirm === valuePasswordNew} />

            <CustomButton
              backgroundColor="isepBrick.500"
              borderColor="isepGreen.500"
              buttonColor="isepGrey.600"
              hoverColor="isepBrick.400"
              text={t("save_changes")}
              textColor="#FFFFFF"
              width="280px"
              isLoading={isLoadingButton}
              handleButtonClick={() =>
                handleChangePasswordConfirm(valuePasswordOld, valuePasswordNew)
              }
              disabledCondition={
                valuePasswordNewConfirm != valuePasswordNew ||
                valuePasswordNewConfirm === "" ||
                valuePasswordNew === "" ||
                valuePasswordOld === "" ||
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}$/.test(
                  valuePasswordNew
                ) ||
                valuePasswordOld !== currentUser.password
              }
            />
            <br></br>
          </>
        );
        break;
      case t("about_app"): //t("about_app")
        return (
          <>
            <Text fontSize="large">{t("aboutUsText_1")}</Text>
            <br></br>
            <Text fontSize="md">
              {t("aboutUsText_2")}
              {t("aboutUsText_3")}
            </Text>
          </>
        );
        break;
      case t("contact_us"): //t("contact_us")
        return (
          <>
            <Box>
              <Heading color="#575757" pl="16px" mb="2rem">
                {t("contact_us")}
              </Heading>{" "}
              <Text fontFamily={"Montserrat-Medium"} margin={"10px"}>
                {t("contacts_text")}
              </Text>
              <Container maxW="750px" color="#575757" mt="1rem">
                <Text fontFamily={"Montserrat-Medium"}>
                  André Gonçalves: 1191660@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  André Morais: 1210626@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  Cárina Alas: 1181695@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  Daniel Dias: 1181488@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  Duarte Marques: 1170467@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  Francisco Dias: 1180615@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  Miguel Cabeleira: 1210632@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  Narciso Correia: 1200174@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  Rui Afonso: 1181056@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  Sofia Canelas: 1200185@isep.ipp.pt
                </Text>
                <Text fontFamily={"Montserrat-Medium"}>
                  Vítor Neto: 1210130@isep.ipp.pt
                </Text>
              </Container>
            </Box>
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
            <Text fontSize="md">{t("termsAndConditionsPart1")}</Text>
            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart2")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart3")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart4")}</Text>

            <br></br>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("termsAndConditionsPart5")}
            </Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart6")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart7")}</Text>

            <br></br>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("termsAndConditionsPart8")}
            </Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart9")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart10")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart11")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart12")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart13")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart14")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart15")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart16")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart17")}</Text>
            <Text fontSize="md">{t("termsAndConditionsPart18")}</Text>
            <Text fontSize="md">{t("termsAndConditionsPart19")}</Text>
            <Text fontSize="md">{t("termsAndConditionsPart20")}</Text>
            <Text fontSize="md">{t("termsAndConditionsPart21")}</Text>
            <Text fontSize="md">{t("termsAndConditionsPart22")}</Text>

            <br></br>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("termsAndConditionsPart23")}
            </Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart24")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart25")}</Text>
            <Text fontSize="md">{t("termsAndConditionsPart26")}</Text>
            <Text fontSize="md">{t("termsAndConditionsPart27")}</Text>
            <Text fontSize="md">{t("termsAndConditionsPart28")}</Text>
            <Text fontSize="md">{t("termsAndConditionsPart29")}</Text>
            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart30")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart31")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart32")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart33")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart34")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart35")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart36")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart37")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart38")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart39")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart40")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart41")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart42")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart43")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart44")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart45")}</Text>

            <br></br>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("termsAndConditionsPart46")}
            </Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart47")}</Text>

            <br></br>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("termsAndConditionsPart48")}
            </Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart49")}</Text>

            <br></br>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("termsAndConditionsPart50")}
            </Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart51")}</Text>

            <br></br>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("termsAndConditionsPart52")}
            </Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart53")}</Text>

            <br></br>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("termsAndConditionsPart54")}
            </Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart55")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart56")}</Text>

            <br></br>
            <Text fontSize="xx-large" textColor={"isepBrick.500"}>
              {t("termsAndConditionsPart57")}
            </Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart58")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart59")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart60")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart61")}</Text>

            <Text fontSize="md">{t("termsAndConditionsPart62")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart63")}</Text>

            <br></br>
            <Text fontSize="md">{t("termsAndConditionsPart64")}</Text>
          </>
        );
        break;
      case t("patch_notes"): //t("patch_notes")
        return (
          <>
            <Text fontSize="md">{t("patch_notes_content_1")}</Text>
          </>
        );
        break;
      case t("admin_feedback"):
        return <>{dispatch(goToAdminFeedbackPage())}</>;
        break;
      case t("admin_beacons"):
        if (currentUser.isAdmin) {
          return <>{dispatch(goToBeaconsPage())}</>;
        }
        break;
      default:
        break;
    }
  }

  return (
    <>
      <MobileView>
        {settingsForMobile.map(({ settingName }) => (
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

            <Button
              variant="link"
              onClick={() => handleClick(settingName)}
              color={"isep.brick.500"}
              marginBottom="5"
              marginLeft={"7"}
              __css={{
                "justify-content": "left",
              }}
              textAlign="left"
              width="100%"
              justify-content="center !important"
              key={stateSettingName}
            >
              {settingName}
              <ChevronRightIcon
                __css={{
                  "justify-content": "right",
                }}
              ></ChevronRightIcon>
            </Button>
          </>
        ))}
        <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{stateSettingName}</DrawerHeader>
            <DrawerBody>{getSettingContentMobile(stateSettingName)}</DrawerBody>
          </DrawerContent>
        </Drawer>
      </MobileView>

      <BrowserView>
        <SimpleGrid columns={[1, 2]} minChildWidth={"200px"}>
          <Box width={"200px"}>
            {settingsForWeb.map(({ settingName }) => (
              <Button
                variant="link"
                __css={{
                  "justify-content": "left",
                  "padding-left": "30px",
                }}
                width="100%"
                marginBottom="5"
                _hover={{ bg: "isepBrick.300", textColor: "black" }}
                _focus={{
                  boxShadow: "none",
                }}
                textAlign="left"
                onClick={() => setStates(settingName)}
              >
                {settingName}
                <ChevronRightIcon
                  __css={{
                    "justify-content": "right",
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
                  <Box height={"100px"}></Box>
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
