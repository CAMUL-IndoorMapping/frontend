/* eslint-disable jsx-a11y/anchor-is-valid */
import "./index.scss";
import { ReactComponent as Logo } from "../../../assets/svg/logo_large.svg";
import { ReactComponent as Circles } from "../../../assets/svg/circles.svg";
import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Center,
  Button,
} from "@chakra-ui/react";
import CustomButton from "../../../components/buttons";
import React, { useState } from "react";
import useTranslation from "../../../i18n/use-translation";
import { useStoreDispatch, useStoreSelector } from "../../../store";
import {
  goToHomePage,
  aboutUsState,
  contactUsState,
  leaveAboutUs,
  goToContactUs,
  goToAboutUs,
  goToFAQs,
  faqsState,
} from "../../../store/navigation-reducer";
import { text } from "./settings";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { userLogin } from "../../services/user";
import CustomToast from "../../../components/customToast";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";

function LoginPage() {
  const [formType, setFormType] = useState<
    "longIn" | "singIn" | "recoverAccount" | "resetPassword"
  >("longIn");
  const [mobilityDisability, setMobilityDisability] = useState("No");
  const [termsCheck, setTermsChecked] = useState(false);

  const urlAPi: string = "https://camul2022.pythonanywhere.com/";

  const dispatch = useStoreDispatch();

  const [loginUser, setLoginUser] = useState<{
    mail: string;
    password: string;
  }>({ mail: "", password: "" });

  const [sigInUser, setSigInUser] = useState<{
    user: string;
    password: string;
    confirmPassword: string;
    mail: string;
  }>({
    user: "",
    password: "",
    confirmPassword: "",
    mail: "",
  });

  const [showError, setShowError] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState("");
  const [newPassword, setNewPassword] = useState<{
    new: string;
    confirm: string;
  }>({
    new: "",
    confirm: "",
  });
  const [newToken, setNewToken] = useState("");

  const isAboutUs = useStoreSelector(aboutUsState);
  const isContactUs = useStoreSelector(contactUsState);
  const isFAQs = useStoreSelector(faqsState);

  const { t } = useTranslation();

  const handleLogInInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = event.target;

    setLoginUser({
      ...loginUser,
      [name]: value,
    });
  };

  const handleSigInInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = event.target;

    setSigInUser({
      ...sigInUser,
      [name]: value,
    });
  };

  const LogIn = async () => {
    if (loginUser.mail === "" && loginUser.password === "") {
      setShowError(true);
    } else {
      setShowError(false);

      //userLogin(loginUser.mail, loginUser.password)
      console.log(
        "user: " +
          JSON.stringify(loginUser.mail) +
          ", " +
          JSON.stringify(loginUser.password)
      );

      const params: any = JSON.stringify({
        email: loginUser.mail,
        password: loginUser.password,
      });

      console.log("params: " + params);

      axios
        .get(
          "https://camul2022.pythonanywhere.com/account/login?email=" +
            loginUser.mail +
            "&password=" +
            loginUser.password
        )
        .then(
          (response) => {
            console.log("response:" + response.data["status"]);
            if (
              response.data["status"] &&
              response.data["status"].includes("unauthorized")
            ) {
              alert("Invalid credentials");
            } else {
              console.log("login");
              dispatch(goToHomePage());
            }
          },
          (error) => {
            console.log("erro:" + error);
          }
        );
    }
  };

  const handleRecoverAccountInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setRecoverEmail(value);
  };

  const handleRecoverAccount = () => {
    axios
      .get(
        "https://camul2022.pythonanywhere.com/account/forgot?email=" +
          recoverEmail
      )
      .then(
        (response) => {
          console.log("response:" + response);
          console.log("Recover Email: ", recoverEmail);
          setFormType("resetPassword");
        },
        (error) => {
          console.log("erro:" + error);
        }
      );
  };

  const handleResetPassword = () => {
    const params = JSON.stringify({
      email: urlAPi + "account/forgot",
      password: newPassword.new,
    });

    axios
      .post(urlAPi + "account/forgot/" + newToken, params, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(
        (response) => {
          console.log("response:" + response);
          console.log("New Password: ", newPassword.new);
          console.log("Confirm Password: ", newPassword.confirm);
          setFormType("longIn");
        },
        (error) => {
          console.log("erro:" + error);
        }
      );
  };

  const Register = () => {
    if (
      sigInUser.user === "" &&
      sigInUser.password === "" &&
      sigInUser.confirmPassword === "" &&
      sigInUser.password === sigInUser.confirmPassword &&
      sigInUser.mail === "" &&
      !termsCheck
    ) {
      setShowError(true);
    } else {
      setShowError(false);

      const params = JSON.stringify({
        name: sigInUser.user,
        email: sigInUser.mail,
        password: sigInUser.password,
      });

      axios
        .post(urlAPi + "account/signup", params, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then(
          (response) => {
            console.log("response:" + response);
            dispatch(goToHomePage());
          },
          (error) => {
            console.log("erro:" + error);
          }
        );

      // TODO --> Set User to BackEnd
    }
  };

  return (
    <>
      <BrowserView>
        <div className="container">
          <div className="logo-container">
            <div className="wrapper">
              {(isAboutUs ||
                formType === "recoverAccount" ||
                formType === "resetPassword") && (
                <Flex position="fixed" top="200px" left="300px">
                  <IconButton
                    aria-label="back"
                    variant="ghost"
                    rounded="100"
                    size="sm"
                    icon={
                      <ChevronLeftIcon
                        w="30px"
                        h="30px"
                        color="isepBrick.500"
                      />
                    }
                    onClick={() => {
                      dispatch(leaveAboutUs());
                      setFormType("longIn");
                    }}
                  />
                  <Center>
                    <Text color="isepBrick.500">{t("back")}</Text>
                  </Center>
                </Flex>
              )}
              <Logo />
              <span>
                <Text fontFamily={"Montserrat-Medium"}>Where to go next?</Text>
              </span>
            </div>
          </div>

          {!isAboutUs && !isContactUs && !isFAQs && (
            <div className="form-container">
              {formType === "longIn" && (
                <div className="form-wrapper">
                  <Input
                    isInvalid={showError && loginUser.mail === ""}
                    errorBorderColor="crimson"
                    name="mail"
                    onChange={handleLogInInputChange}
                    variant="flushed"
                    focusBorderColor="isepBrick.500"
                    placeholder={t("e-mail")}
                    _placeholder={{
                      color: "isepBrick.500",
                      fontFamily: "Montserrat-SemiBold",
                    }}
                    borderColor="isepBrick.500"
                  />
                  <Input
                    name="password"
                    type="password"
                    isInvalid={showError && loginUser.password === ""}
                    errorBorderColor="crimson"
                    onChange={handleLogInInputChange}
                    variant="flushed"
                    focusBorderColor="isepBrick.500"
                    placeholder={t("password")}
                    _placeholder={{
                      color: "isepBrick.500",
                      fontFamily: "Montserrat-SemiBold",
                    }}
                    borderColor="isepBrick.500"
                  />

                  <CustomButton
                    backgroundColor="isepBrick.500"
                    borderColor="isepGreen.500"
                    buttonColor="isepGrey.500"
                    hoverColor="isepBrick.500"
                    text="LOGIN"
                    width="476px"
                    height="54px"
                    handleButtonClick={LogIn}
                  />
                  <span>
                    {t("do_you_have_an_account")}
                    <a
                      style={{
                        marginLeft: ".5rem",
                      }}
                      onClick={() => {
                        setShowError(false);
                        setFormType("singIn");
                      }}
                    >
                      {t("register")}
                    </a>
                  </span>
                  <span
                    className="forgot-password"
                    onClick={() => {
                      setFormType("recoverAccount");
                    }}
                  >
                    {t("forgot_password")}
                  </span>
                </div>
              )}

              {formType === "singIn" && (
                <div className="form-wrapper_extended">
                  <Input
                    isInvalid={showError && sigInUser.user === ""}
                    errorBorderColor="crimson"
                    name="user"
                    onChange={handleSigInInputChange}
                    variant="flushed"
                    placeholder={`${t("name")}*`}
                    focusBorderColor="isepBrick.500"
                    _placeholder={{
                      color: "isepBrick.500",
                      fontFamily: "Montserrat-SemiBold",
                    }}
                    borderColor="isepBrick.500"
                  />
                  <Input
                    isInvalid={showError && sigInUser.mail === ""}
                    errorBorderColor="crimson"
                    name="mail"
                    onChange={handleSigInInputChange}
                    variant="flushed"
                    placeholder={`${t("e-mail")}*`}
                    focusBorderColor="isepBrick.500"
                    _placeholder={{
                      color: "isepBrick.500",
                      fontFamily: "Montserrat-SemiBold",
                    }}
                    borderColor="isepBrick.500"
                  />
                  <Input
                    isInvalid={showError && sigInUser.password === ""}
                    errorBorderColor="crimson"
                    name="password"
                    type="password"
                    onChange={handleSigInInputChange}
                    variant="flushed"
                    placeholder={`${t("password")}*`}
                    focusBorderColor="isepBrick.500"
                    _placeholder={{
                      color: "isepBrick.500",
                      fontFamily: "Montserrat-SemiBold",
                    }}
                    borderColor="isepBrick.500"
                  />
                  <Input
                    isInvalid={showError && sigInUser.confirmPassword === ""}
                    errorBorderColor="crimson"
                    name="confirmPassword"
                    onChange={handleSigInInputChange}
                    variant="flushed"
                    placeholder={`${t("confirm_password")}*`}
                    focusBorderColor="isepBrick.500"
                    _placeholder={{
                      color: "isepBrick.500",
                      fontFamily: "Montserrat-SemiBold",
                    }}
                    borderColor="isepBrick.500"
                  />

                  <RadioGroup
                    onChange={setMobilityDisability}
                    value={mobilityDisability}
                    display="flex"
                    flexDirection="column"
                    width="100%"
                  >
                    <span className="mobility_disability_span">
                      {t("mobility_disability")}
                    </span>
                    <Stack spacing={5} direction="row" marginTop="24px">
                      <Radio
                        borderColor="#a2543d"
                        _checked={{
                          bg: "#a2543d",
                          borderColor: "#a2543d",
                        }}
                        size="lg"
                        value={t("yes")}
                      >
                        {t("yes")}
                      </Radio>
                      <Radio
                        borderColor="#a2543d"
                        _checked={{
                          bg: "#a2543d",
                          borderColor: "#a2543d",
                        }}
                        size="lg"
                        value={t("no")}
                      >
                        {t("no")}
                      </Radio>
                    </Stack>
                  </RadioGroup>

                  <RadioGroup
                    display="flex"
                    flexDirection="column"
                    width="100%"
                  >
                    <Radio
                      borderColor="#a2543d"
                      _checked={{
                        bg: "#a2543d",
                        borderColor: "#a2543d",
                      }}
                      size="lg"
                      checked={termsCheck}
                      onClick={() => setTermsChecked(!termsCheck)}
                    >
                      <span className="mobility_disability_span">
                        {t("confirm_read_terms")}
                        <br></br>
                        <a> {`${t("terms")}*`}</a>
                      </span>
                    </Radio>
                  </RadioGroup>

                  <CustomButton
                    backgroundColor="isepBrick.500"
                    borderColor="isepGreen.500"
                    buttonColor="isepGrey.500"
                    hoverColor="isepBrick.500"
                    text="REGISTER"
                    width="476px"
                    height="54px"
                    handleButtonClick={Register}
                  />
                  <span>
                    Already have an account?{" "}
                    <a
                      onClick={() => {
                        setShowError(false);
                        setFormType("longIn");
                      }}
                    >
                      Login
                    </a>
                  </span>
                </div>
              )}

              {formType === "recoverAccount" && (
                <Box w="600px" h="580px" bg="white">
                  <Center w="600px" h="140px" bg="isepBrick.400">
                    <Heading fontSize="40px" color="white">
                      {t("recover_account")}
                    </Heading>
                  </Center>

                  <div className="form-wrapper">
                    <Input
                      isInvalid={showError && loginUser.mail === ""}
                      errorBorderColor="crimson"
                      name="mail"
                      onChange={handleRecoverAccountInputChange}
                      variant="flushed"
                      focusBorderColor="isepBrick.500"
                      placeholder={t("associated_email")}
                      _placeholder={{
                        color: "isepBrick.500",
                        fontFamily: "Montserrat-SemiBold",
                      }}
                      borderColor="isepBrick.500"
                    />

                    <CustomButton
                      backgroundColor="isepBrick.500"
                      borderColor="isepGreen.500"
                      buttonColor="isepGrey.500"
                      hoverColor="isepBrick.500"
                      text={t("send_email")}
                      width="476px"
                      height="54px"
                      handleButtonClick={handleRecoverAccount}
                    />

                    <Container w="476px" color="#636363" opacity=".6">
                      {t("check_email")}
                    </Container>
                  </div>
                </Box>
              )}

              {formType === "resetPassword" && (
                <Box w="600px" h="580px" bg="white">
                  <Center w="600px" h="140px" bg="isepBrick.400">
                    <Heading fontSize="40px" color="white">
                      {t("reset_password")}
                    </Heading>
                  </Center>

                  <div className="form-wrapper">
                    <Input
                      isInvalid={showError && loginUser.mail === ""}
                      errorBorderColor="crimson"
                      name="mail"
                      onChange={(e) => {
                        setNewPassword({
                          new: e.target.value,
                          confirm: newPassword.confirm,
                        });
                      }}
                      variant="flushed"
                      focusBorderColor="isepBrick.500"
                      placeholder={t("new_password")}
                      _placeholder={{
                        color: "isepBrick.500",
                        fontFamily: "Montserrat-SemiBold",
                      }}
                      borderColor="isepBrick.500"
                    />

                    <Input
                      isInvalid={showError && loginUser.mail === ""}
                      errorBorderColor="crimson"
                      name="mail"
                      onChange={(e) => {
                        setNewPassword({
                          new: newPassword.new,
                          confirm: e.target.value,
                        });
                      }}
                      variant="flushed"
                      focusBorderColor="isepBrick.500"
                      placeholder={t("confirm_password")}
                      _placeholder={{
                        color: "isepBrick.500",
                        fontFamily: "Montserrat-SemiBold",
                      }}
                      borderColor="isepBrick.500"
                    />

                    <Input
                      errorBorderColor="crimson"
                      name="token"
                      onChange={(e) => {
                        setNewToken(e.target.value);
                      }}
                      variant="flushed"
                      focusBorderColor="isepBrick.500"
                      placeholder="Confirm token"
                      _placeholder={{
                        color: "isepBrick.500",
                        fontFamily: "Montserrat-SemiBold",
                      }}
                      borderColor="isepBrick.500"
                    />

                    <CustomButton
                      backgroundColor="isepBrick.500"
                      borderColor="isepGreen.500"
                      buttonColor="isepGrey.500"
                      hoverColor="isepBrick.500"
                      text={t("reset")}
                      width="476px"
                      height="54px"
                      handleButtonClick={handleResetPassword}
                    />
                  </div>
                </Box>
              )}
            </div>
          )}
          {isAboutUs && !isContactUs && (
            <Flex h="100%" direction="column" justifyContent="center">
              <Box>
                <Heading color="#575757" pl="16px" mb="2rem">
                  {t("about_us")}
                </Heading>

                <Container maxW="750px" color="#575757">
                  {text.aboutUsText_1}
                </Container>

                <Container maxW="750px" color="#575757" mt="1rem">
                  {text.aboutUsText_2}
                </Container>

                <Container maxW="750px" color="#575757" mt="1rem">
                  {text.aboutUsText_3}
                </Container>
                <Button
                  backgroundColor={"transparent"}
                  textColor={"#a2543d"}
                  onClick={() => dispatch(goToContactUs())}
                >
                  {t("contact_us")}
                </Button>
                <Button
                  backgroundColor={"transparent"}
                  textColor={"#a2543d"}
                  onClick={() => dispatch(goToFAQs())}
                >
                  FAQs
                </Button>
                <Button backgroundColor={"transparent"} textColor={"#a2543d"}>
                  RGPD
                </Button>
              </Box>
            </Flex>
          )}
          {isContactUs && !isAboutUs && (
            <Flex h="100%" direction="column" justifyContent="center">
              <Box>
                <Flex position="fixed" top="200px" left="300px">
                  <IconButton
                    aria-label="back"
                    variant="ghost"
                    rounded="100"
                    size="sm"
                    icon={
                      <ChevronLeftIcon
                        w="30px"
                        h="30px"
                        color="isepBrick.500"
                      />
                    }
                    onClick={() => {
                      dispatch(goToAboutUs());
                    }}
                  />
                  <Center>
                    <Text color="isepBrick.500">{t("back")}</Text>
                  </Center>
                </Flex>
                <Heading color="#575757" pl="16px" mb="2rem">
                  {t("contact_us")}
                </Heading>
                
                  {" "}
                  <Text fontFamily={"Montserrat-Medium"}>
                    {t("contacts_text")}
                  </Text>
                <Container maxW="750px" color="#575757" mt="1rem">
                  <Text fontFamily={"Montserrat-Medium"}>André Gonçalves: 1191660@isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>André Morais:    1210626@isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>Cárina Alas:     1181695@isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>Daniel Dias:     1181488@isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>Duarte:          1170467@isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>Francisco:       1180615@isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>Miguel:          1210632@isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>Narciso:         @isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>Rui:             1181056@isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>Sofia:           1200185@isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>Vítor Neto:      1210130@isep.ipp.pt</Text>
                </Container>
              </Box>
            </Flex>
          )}
          {isFAQs && !isAboutUs && (
            <Flex h="100%" direction="column" justifyContent="center">
              <Box>
                <Flex position="fixed" top="200px" left="300px">
                  <IconButton
                    aria-label="back"
                    variant="ghost"
                    rounded="100"
                    size="sm"
                    icon={
                      <ChevronLeftIcon
                        w="30px"
                        h="30px"
                        color="isepBrick.500"
                      />
                    }
                    onClick={() => {
                      dispatch(goToAboutUs());
                    }}
                  />
                  <Center>
                    <Text color="isepBrick.500">{t("back")}</Text>
                  </Center>
                </Flex>
                <Heading
                  color="#575757"
                  pl="16px"
                  mb="2rem"
                  fontFamily={"Montserrat-Medium"}
                >
                  Frequently Asked Questions
                </Heading>

                <Text fontFamily={"Montserrat-Medium"}>
                  Is this app functional?
                </Text>
                <Container maxW="750px" color="#575757" mt="1rem">
                <Text fontFamily={"Montserrat-Medium"}> This app is merely a prototype and will not work in a real life scenario. </Text></Container>
              </Box>
            </Flex>
          )}
          <Circles className="circles_svg" />
        </div>
      </BrowserView>
      <MobileView>
        {/* 
        ESCREVER CÓDIGO PARA MOBILE
        */}
        <Text>FALTA FAZER MOBILE LOGIN</Text>
      </MobileView>
    </>
  );
}

export default LoginPage;
