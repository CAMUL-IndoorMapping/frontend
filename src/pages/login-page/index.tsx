/* eslint-disable jsx-a11y/anchor-is-valid */
import "./index.scss";
import { ReactComponent as Logo } from "../../assets/svg/logo_large.svg";
import { ReactComponent as Circles } from "../../assets/svg/circles.svg";
import { Input, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import CustomButton from "../../components/buttons";
import { useState } from "react";
import useTranslation from "../../i18n/use-translation";
import { useStoreDispatch } from "../../store";
import { goToHomePage } from "../../store/navigation-reducer";

function LoginPage() {
  const [formType, setFormType] = useState<"longIn" | "singIn">("longIn");
  const [mobilityDisability, setMobilityDisability] = useState("No");
  const [termsCheck, setTermsChecked] = useState(false);

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

  const LogIn = () => {
    if (loginUser.mail === "" && loginUser.password === "") {
      setShowError(true);
    } else {
      setShowError(false);
      dispatch(goToHomePage());

      // TODO --> Get user from the BFF and validate if it existes, if not show error again.
    }
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
      dispatch(goToHomePage());

      // TODO --> Set User to BackEnd
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <div className="wrapper">
          <Logo />
          <span>Where to go next?</span>
        </div>
      </div>
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
                onClick={() => {
                  setShowError(false);
                  setFormType("singIn");
                }}
              >
                {t("register")}
              </a>
            </span>
            <span className="forgot-password">{t("forgot_password")}</span>
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

            <RadioGroup display="flex" flexDirection="column" width="100%">
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
      </div>
      <Circles className="circles_svg" />
    </div>
  );
}

export default LoginPage;
