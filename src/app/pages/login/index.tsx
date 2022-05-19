/* eslint-disable jsx-a11y/anchor-is-valid */
import "./index.scss";
import { ReactComponent as Logo } from "../../../assets/svg/logo_large.svg";
import { ReactComponent as Circles } from "../../../assets/svg/circles.svg";
import { Box, Container, Flex, Heading, IconButton, Input, Radio, RadioGroup, Stack, Text, Center, FormControl, textDecoration, Button, useDisclosure, useToast } from "@chakra-ui/react";
import CustomButton from '../../../components/buttons';
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
  goToRGPD,
  rgpdState,
  goToLoginPage,
} from "../../../store/navigation-reducer";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { userLogin } from "../../services/user";
import CustomToast from "../../../components/customToast";
import axios from 'axios';
import { BrowserView, MobileView } from 'react-device-detect';
import { login } from "../../../store/user-reducer";
import { stringify } from "querystring";

function LoginPage() {
  const [formType, setFormType] = useState<
    "longIn" | "singIn" | "recoverAccount" | "resetPassword"
  >("longIn");
  const [mobilityDisability, setMobilityDisability] = useState("No");
  const [termsCheck, setTermsChecked] = useState(false);

  const urlAPi: string = "https://camul2022.pythonanywhere.com/";

  const dispatch = useStoreDispatch();
  const toast = useToast();

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
  const [isLoadingButton, setIsLoading] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState('')
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
  const isRGPD = useStoreSelector(rgpdState);

  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

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


      console.log("params: " + params)


      setIsLoading(true);
      axios.get('https://camul2022.pythonanywhere.com/account/login?email=' + loginUser.mail + '&password=' + loginUser.password)
        .then((response) => {

          console.log("response:" + response.data["status"]);
          if (response.data["status"] && response.data["status"].includes("unauthorized")) {
            //alert("Invalid credentials");
            /**
            toast({
              title: t("change_password_general_error"),
              status: "error",
              isClosable: true,
          });
          onClose()
          throw new Error("Error" + response.status);
           */
            console.log("aqui")
          }
          else {
            toast({
              title: "Login",
              status: "success",
              isClosable: true,
            });
            var updateUserData = {
              username: response.data.username,
              isAdmin: response.data.userRole === 'admin' ? true : false,
              password: loginUser.password,
              authToken: response.data.authToken,
              userID: response.data.userID
            }

            console.log("login")
            dispatch(login(updateUserData));
            dispatch(goToHomePage());
            setIsLoading(false)
            onClose()
          }
        }, (error) => {
          console.log("erro:" + error);
          setIsLoading(false);
          console.log()
          toast({
            title: t("rightPassword"),
            status: "error",
            isClosable: true,
          });
          onClose()
        });
    }
  };

  const handleRecoverAccountInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setRecoverEmail(value);
  };

  const handleRecoverAccount = () => {
    if (recoverEmail === "") {
      toast({
        title: t("fillFields"),
        status: "error",
        isClosable: true,
      });
      onClose()
    }
    else {
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
    }
  };

  const handleResetPassword = () => {
    if (newPassword.new === "" || newPassword.confirm === "" || newToken === "") {
      toast({
        title: t("fillFields"),
        status: "error",
        isClosable: true,
      });
      onClose()
    }
    else if (newPassword.new === newPassword.confirm) {
      console.log("pass iguais")

      const params = JSON.stringify({
        "email": urlAPi + 'account/forgot',
        "password": newPassword.new
      });

      axios.post(urlAPi + 'account/forgot/' + newToken, params, {

        "headers": {
          "content-type": "application/json",
        },

      }).then((response) => {
        console.log("response:" + response);
        console.log('New Password: ', newPassword.new)
        console.log('Confirm Password: ', newPassword.confirm)

        if (response.data["status"] && response.data["status"].includes("bad request")) {
          alert(response.data["status"]);
        }
        else {
          setFormType('longIn')
          alert(response.data["status"]);
        }
      }, (error) => {
        console.log("erro:" + error);
        toast({
          title: t("passAndToken"),
          status: "error",
          isClosable: true,
        });
        onClose()
      });
    }
    else {
      toast({
        title: t("samePasswords"),
        status: "error",
        isClosable: true,
      });
      onClose()
    }
  };

  const Register = () => {
    setIsLoading(false);
    if (
      sigInUser.user === "" ||
      sigInUser.password === "" ||
      sigInUser.confirmPassword === "" ||
      sigInUser.mail === ""
    ) {
      setShowError(true);
      toast({
        title: t("fillFields"),
        status: "error",
        isClosable: true,
      });
      onClose()
    } else {
      if (termsCheck) {
        if (sigInUser.password != sigInUser.confirmPassword) {
          toast({
            title: t("samePasswords"),
            status: "error",
            isClosable: true,
          });
          onClose()
          setIsLoading(false);
        }
        else {
          setShowError(false);
          const params = JSON.stringify({
            "name": sigInUser.user,
            "email": sigInUser.mail,
            "password": sigInUser.password
          });

          setIsLoading(true);
          axios.post(urlAPi + 'account/signup', params, {

            "headers": {
              "content-type": "application/json",
            },

          }).then((response) => {
            console.log("response:" + response.data["status"]);
            if (response.data["status"] && response.data["status"].includes("bad request")) {
              alert(response.data["status"]);
            }
            else {
              var updateUserData = {
                username: response.data.username,
                isAdmin: response.data.userRole === 'admin' ? true : false,
                authToken: response.data.authToken,
                userID: response.data.userID
              }
              console.log("login")
              dispatch(login(updateUserData));
              dispatch(goToHomePage());
              setIsLoading(false);
            }
          }, (error) => {
            console.log("erro:" + error);
            toast({
              title: t("rightPassword"),
              status: "error",
              isClosable: true,
            });
            onClose()
            setIsLoading(false);
          });
        }
      }
      else {
        toast({
          title: t("fillTerms"),
          status: "error",
          isClosable: true,
        });
        onClose()
      }
    }
  };

  return (
    <>
      <MobileView>
        {!isAboutUs && !isContactUs && !isFAQs && !isRGPD && (
          <div className="container">
            <Box>

              {formType === "longIn" && (

                <FormControl isRequired>
                  <Center marginTop='40%' marginBottom='10%'>
                    <img width='35%' src="https://s3-alpha-sig.figma.com/img/b938/b663/821798adfdcd9a1accf9c42db95871f5?Expires=1653868800&Signature=BTxgYgGKYLaBFW0MF~Vcx8lC2~jpj9gekjTFJSwvnbPtE2LRcSopHUoujRTAOS~pmshzMQHqd14M161YGaBrlfmr8Fl6nR8OJ-NSCjU3N-imjsNaS1MalSmxcBhqVe2puGNwiSXhCP8I56WGjuiVp4UhA~gULoB3zUURp6dsVKCHqTQhUXkhThOXa~Xf9pc2BC7kDIIQXb6RvSWwm-0WRluwKgpkB-E4tXwgA15S2~7gti6ACSsniCX1FqLbRCCp~HBze0N2VCn7EwmhOxFQ1dGmwHVaA2UekWDTRPQJtSVbEayx1~F6f87IUM8y-eil5b2R1YVofRKxKfR4GgFGxw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"></img>
                  </Center>
                  <Center>
                    <Input
                      width='70%'
                      marginTop='5%'
                      marginBottom='5%'
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
                  </Center>
                  <Center marginBottom='20%'>
                    <Input
                      width='70%'
                      name="password"
                      type='password'
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
                  </Center>
                  <Center marginBottom='5%'>
                    <CustomButton
                      backgroundColor="isepBrick.500"
                      borderColor="isepGreen.500"
                      buttonColor="isepGrey.500"
                      hoverColor="isepBrick.500"
                      text="LOGIN"
                      width="206px"
                      height="47px"
                      isLoading={isLoadingButton}
                      handleButtonClick={LogIn}
                    />
                  </Center>
                  <Center marginBottom='5%'>
                    <CustomButton
                      backgroundColor="isepBrick.500"
                      borderColor="isepGreen.500"
                      buttonColor="isepGrey.500"
                      hoverColor="isepBrick.500"
                      text={t("about_us").toUpperCase()}
                      width="206px"
                      height="47px"
                      handleButtonClick={() => dispatch(goToAboutUs())}
                    />
                  </Center>
                  <Center>
                    <div>
                      <div className="form-wrapper">
                        <Center marginBottom='5%'>
                          <span>
                            {t("do_you_have_an_account")}
                            <a
                              style={{
                                marginLeft: '.5rem',
                                textDecoration: 'underline'
                              }}
                              onClick={() => {
                                console.log("registar")
                                setShowError(false);
                                setFormType("singIn");
                              }}
                            >
                              {t("register")}
                            </a>
                          </span>
                        </Center>
                        <Center>
                          <span className="forgot-password">
                            <a
                              style={{
                                marginLeft: '.5rem',
                                textDecoration: 'underline'
                              }}
                              onClick={() => {
                                console.log("forgot")
                                setFormType('recoverAccount')
                              }}
                            >
                              {t("forgot_password")}
                            </a>
                          </span>

                        </Center>
                      </div>
                    </div>
                  </Center>

                </FormControl>
              )}

              {formType === "singIn" && (
                <FormControl isRequired>
                  <Center marginTop='20%' marginBottom='10%'>
                    <img width='35%' src="https://s3-alpha-sig.figma.com/img/b938/b663/821798adfdcd9a1accf9c42db95871f5?Expires=1653868800&Signature=BTxgYgGKYLaBFW0MF~Vcx8lC2~jpj9gekjTFJSwvnbPtE2LRcSopHUoujRTAOS~pmshzMQHqd14M161YGaBrlfmr8Fl6nR8OJ-NSCjU3N-imjsNaS1MalSmxcBhqVe2puGNwiSXhCP8I56WGjuiVp4UhA~gULoB3zUURp6dsVKCHqTQhUXkhThOXa~Xf9pc2BC7kDIIQXb6RvSWwm-0WRluwKgpkB-E4tXwgA15S2~7gti6ACSsniCX1FqLbRCCp~HBze0N2VCn7EwmhOxFQ1dGmwHVaA2UekWDTRPQJtSVbEayx1~F6f87IUM8y-eil5b2R1YVofRKxKfR4GgFGxw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"></img>
                  </Center>
                  <Center>
                    <Input marginTop='5%'
                      width='70%'
                      marginBottom='5%'
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
                  </Center>
                  <Center>
                    <Input
                      width='70%'
                      marginBottom='5%'
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
                  </Center>

                  <Center>
                    <Input
                      width='70%'
                      marginBottom='5%'
                      isInvalid={showError && sigInUser.password === ""}
                      errorBorderColor="crimson"
                      name="password"
                      type='password'
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
                  </Center>

                  <Center>
                    <Input
                      width='70%'
                      marginBottom='5%'
                      isInvalid={showError && sigInUser.confirmPassword === ""}
                      type='password'
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
                  </Center>

                  <RadioGroup marginBottom='10%'
                    onChange={setMobilityDisability}
                    value={mobilityDisability}
                    display="flex"
                    flexDirection="column"
                    width="100%"
                  >
                    <Center>
                      <span className="mobility_disability_span">
                        {t("mobility_disability")}
                      </span>
                    </Center>

                    <Center>
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
                    </Center>
                  </RadioGroup>

                  <RadioGroup marginBottom='10%' display="flex" flexDirection="column" width="100%">
                    <Center>
                      <Radio style={{ backgroundColor: termsCheck ? '#a2543d' : 'white' }}

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
                    </Center>
                  </RadioGroup>

                  <Center marginBottom='5%'>
                    <CustomButton
                      backgroundColor="isepBrick.500"
                      borderColor="isepGreen.500"
                      buttonColor="isepGrey.500"
                      hoverColor="isepBrick.500"
                      text={t("register")}
                      width="206px"
                      height="47px"
                      isLoading={isLoadingButton}
                      handleButtonClick={Register}
                    />
                  </Center>
                  <Center>
                    <span>
                      {t("haveAccount")}{" "}
                      <a
                        style={{
                          textDecoration: 'underline'
                        }}
                        onClick={() => {
                          setShowError(false);
                          setFormType("longIn");
                        }}
                      >
                        Login
                      </a>
                    </span>
                  </Center>
                </FormControl>
              )}

              {formType === 'recoverAccount' && (
                <Box marginTop='20%' bg='white'>
                  <Center marginBottom='20%'>
                    <Heading fontSize='40px' color='black'>
                      {t("recover_account")}
                    </Heading>
                  </Center>

                  <div>
                    <Center>
                      <Input marginBottom='20%'
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
                    </Center>
                    <Center marginBottom='20%'>
                      <CustomButton
                        backgroundColor="isepBrick.500"
                        borderColor="isepGreen.500"
                        buttonColor="isepGrey.500"
                        hoverColor="isepBrick.500"
                        text={t("send_email")}
                        width="206px"
                        height="47px"
                        isLoading={isLoadingButton}
                        handleButtonClick={handleRecoverAccount}
                      />
                    </Center>

                    <Container height='200px' color='#636363' opacity='.6'>
                      {t("check_email")}
                    </Container>

                  </div>

                </Box>
              )}

              {formType === 'resetPassword' && (
                <Box h='580px' bg='white'>

                  <Center h='140px' bg='isepBrick.400'>
                    <Heading fontSize='30px' color='black'>
                      {t("reset_password")}
                    </Heading>
                  </Center>

                  <div>

                    <Input marginTop='10%' marginBottom='10%'
                      isInvalid={showError && loginUser.mail === ""}
                      errorBorderColor="crimson"
                      name="mail"
                      type='password'
                      onChange={(e) => {
                        setNewPassword({ new: e.target.value, confirm: newPassword.confirm })
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

                    <Input marginBottom='10%'
                      type='password'
                      isInvalid={showError && loginUser.mail === ""}
                      errorBorderColor="crimson"
                      name="mail"
                      onChange={(e) => {
                        setNewPassword({ new: newPassword.new, confirm: e.target.value })
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

                    <Input marginBottom='10%'
                      errorBorderColor="crimson"
                      name="token"
                      onChange={(e) => {
                        setNewToken(e.target.value)
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
                      width="206px"
                      height="47px"
                      isLoading={isLoadingButton}
                      handleButtonClick={handleResetPassword}
                    />

                  </div>
                </Box>
              )}

            </Box>
          </div>)}
        {isAboutUs && !isContactUs && (
          <Flex h="100%" direction="column" justifyContent="left">
            <Box alignContent={"left"} marginBottom={"15px"}><IconButton
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
            /></Box>

            <Box>
              <Heading color="#575757" pl="16px" mb="2rem">
                {t("about_us")}
              </Heading>

              <Container maxW="750px" color="#575757">
                {t("aboutUsText_1")}
              </Container>

              <Container maxW="750px" color="#575757" mt="1rem">
                {t("aboutUsText_2")}
              </Container>

              <Container maxW="750px" color="#575757" mt="1rem">
                {t("aboutUsText_3")}
              </Container>
              <Box margin={"20px"}></Box>
              <CustomButton
                backgroundColor="isepBrick.500"
                borderColor="isepGreen.500"
                buttonColor="isepGrey.500"
                hoverColor="isepBrick.500"
                text={t("contact_us")}
                width="206px"
                height="47px"
                isLoading={isLoadingButton}
                handleButtonClick={() => dispatch(goToContactUs())}
              />
              <Box margin={"20px"}></Box>
              <CustomButton
                backgroundColor="isepBrick.500"
                borderColor="isepGreen.500"
                buttonColor="isepGrey.500"
                hoverColor="isepBrick.500"
                text={"FAQs"}
                width="206px"
                height="47px"
                isLoading={isLoadingButton}
                handleButtonClick={() => dispatch(goToFAQs())}
              />
              <Box margin={"20px"}></Box>
              <CustomButton
                backgroundColor="isepBrick.500"
                borderColor="isepGreen.500"
                buttonColor="isepGrey.500"
                hoverColor="isepBrick.500"
                text={t("rgpd")}
                width="206px"
                height="47px"
                isLoading={isLoadingButton}
                handleButtonClick={() => dispatch(goToRGPD())}
              />
              <Box margin={"20px"}></Box>
            </Box>
          </Flex>
        )}
        {isContactUs && !isAboutUs && (
          <Flex h="100%" direction="column" justifyContent="center">
            <Box alignContent={"left"} marginBottom={"15px"}><IconButton
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
            /></Box>
            <Box>
              <Heading color="#575757" pl="16px" mb="2rem">
                {t("contact_us")}
              </Heading>

              {" "}
              <Text fontFamily={"Montserrat-Medium"} margin={"10px"}>
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
                <Text fontFamily={"Montserrat-Medium"}>Narciso Correia:  @isep.ipp.pt</Text>
                <Text fontFamily={"Montserrat-Medium"}>Rui:             1181056@isep.ipp.pt</Text>
                <Text fontFamily={"Montserrat-Medium"}>Sofia:           1200185@isep.ipp.pt</Text>
                <Text fontFamily={"Montserrat-Medium"}>Vítor Neto:      1210130@isep.ipp.pt</Text>
              </Container>
            </Box>
          </Flex>
        )}
        {isFAQs && !isAboutUs && (
          <Flex h="100%" direction="column" justifyContent="center">
            <Box alignContent={"left"} marginBottom={"15px"}><IconButton
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
            /></Box>
            <Box>

              <Heading
                color="#575757"
                pl="16px"
                mb="2rem"
                fontFamily={"Montserrat-Medium"}
              >
                {t("faqs")}
              </Heading>

              <Text fontFamily={"Montserrat-Medium"} margin={"10px"}>
                {t("question")}
              </Text>
              <Container maxW="750px" color="#575757" mt="1rem">
                <Text fontFamily={"Montserrat-Medium"}> {t("answer")} </Text></Container>
            </Box>
          </Flex>
        )}
        {isRGPD && !isAboutUs && !isFAQs && !isContactUs && (
          <Flex h="100%" direction="column" justifyContent="center">
            <Box alignContent={"left"} marginBottom={"15px"}><IconButton
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
            /></Box>
            <Box>

              <Heading
                color="#575757"
                pl="16px"
                mb="2rem"
                fontFamily={"Montserrat-Medium"}
              >
                {t("rgpd")}
              </Heading>

              <Text fontFamily={"Montserrat-Medium"} margin={"10px"}>
                {t("information_RGPD")}
              </Text>
              <Container maxW="750px" color="#575757" mt="1rem">
                <Text fontFamily={"Montserrat-Medium"}> {t("answer_RGPD")}</Text></Container>
            </Box>
          </Flex>
        )}
      </MobileView>
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

          {!isAboutUs && !isContactUs && !isFAQs && !isRGPD && (
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
                    isLoading={isLoadingButton}
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
                  <Input marginTop='100px'
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
                    type='password'
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

                  <RadioGroup display="flex" flexDirection="column" width="100%">
                    <Radio style={{ backgroundColor: termsCheck ? '#a2543d' : 'white' }}

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
                    text={t("register")}
                    width="476px"
                    height="54px"
                    isLoading={isLoadingButton}
                    handleButtonClick={Register}
                  />
                  <span>
                    {t("haveAccount")}{" "}
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
                      type='password'
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
                      type='password'
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
                  {t("aboutUsText_1")}
                </Container>

                <Container maxW="750px" color="#575757" mt="1rem">
                  {t("aboutUsText_2")}
                </Container>

                <Container maxW="750px" color="#575757" mt="1rem">
                  {t("aboutUsText_3")}
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
                <Button backgroundColor={"transparent"} textColor={"#a2543d"} onClick={() => dispatch(goToRGPD())}>
                  {t("rgpd")}
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

                <Text fontFamily={"Montserrat-Medium"} maxW="750px">
                  {t("contacts_text")}
                </Text>
                <Container maxW="750px" color="#575757" mt="1rem">
                  <Text fontFamily={"Montserrat-Medium"}>André Gonçalves: 1191660@isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>André Morais:    1210626@isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>Cárina Alas:     1181695@isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>Daniel Dias:     1181488@isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>Duarte Marques:          1170467@isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>Francisco Dias:       1180615@isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>Miguel Cabeleira:          1210632@isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>Narciso Correia:  1200174@isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>Rui Afonso:             1181056@isep.ipp.pt</Text>
                  <Text fontFamily={"Montserrat-Medium"}>Sofia Canelas:           1200185@isep.ipp.pt</Text>
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
                  {t("faqs")}
                </Heading>                
                <Text fontFamily={"Montserrat-Medium"}>
                  {t("faqs_1")}
                </Text>
                <Container maxW="750px" color="#575757" marginBottom={"10px"}>
                  <Text fontFamily={"Montserrat-Medium"} fontSize={"12px"}> {t("faqs_1_answer")} </Text>
                </Container>
                <Text fontFamily={"Montserrat-Medium"}>
                  {t("faqs_2")}
                </Text>
                <Container maxW="750px" color="#575757"  marginBottom={"10px"}>
                  <Text fontFamily={"Montserrat-Medium"} fontSize={"12px"}> {t("faqs_2_answer")} </Text>
                </Container><Text fontFamily={"Montserrat-Medium"}>
                  {t("faqs_3")}
                </Text>
                <Container maxW="750px" color="#575757" marginBottom={"10px"}>
                  <Text fontFamily={"Montserrat-Medium"} fontSize={"12px"}> {t("faqs_3_answer")} </Text>
                </Container><Text fontFamily={"Montserrat-Medium"}>
                  {t("faqs_4")}
                </Text>
                <Container maxW="750px" color="#575757" marginBottom={"10px"}>
                  <Text fontFamily={"Montserrat-Medium"} fontSize={"12px"}> {t("faqs_4_answer")} </Text>
                </Container><Text fontFamily={"Montserrat-Medium"}>
                  {t("faqs_5")}
                </Text>
                <Container maxW="750px" color="#575757" marginBottom={"10px"}>
                  <Text fontFamily={"Montserrat-Medium"} fontSize={"12px"}> {t("faqs_5_answer")} </Text>
                </Container><Text fontFamily={"Montserrat-Medium"}>
                  {t("faqs_6")}
                </Text>
                <Container maxW="750px" color="#575757" marginBottom={"10px"}>
                  <Text fontFamily={"Montserrat-Medium"} fontSize={"12px"}> {t("faqs_6_answer")} </Text>
                </Container><Text fontFamily={"Montserrat-Medium"}>
                  {t("faqs_7")}
                </Text>
                <Container maxW="750px" color="#575757" marginBottom={"10px"}>
                  <Text fontFamily={"Montserrat-Medium"} fontSize={"12px"}> {t("faqs_7_answer")} </Text>
                </Container>
                
              </Box>
            </Flex>
          )}
          {isRGPD && !isAboutUs && !isFAQs && !isContactUs && (
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
                  {t("rgpd")}
                </Heading>

                <Text fontFamily={"Montserrat-Medium"}>
                  {t("information_RGPD")}
                </Text>
                <Container maxW="750px" color="#575757" mt="1rem">
                  <Text fontFamily={"Montserrat-Medium"}> {t("answer_RGPD")}</Text></Container>
              </Box>
            </Flex>
          )}
          <Circles className="circles_svg" />
        </div>
      </BrowserView>
    </>
  );
}

export default LoginPage;
