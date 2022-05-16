import React, { useState } from "react";
import "./index.scss";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";

import { ReactComponent as LogoNavBar } from "../../assets/svg/logo_small.svg";
import { ReactComponent as SingOut } from "../../assets/svg/signOut.svg";
import useTranslation from "../../i18n/use-translation";
import i18n from "../../i18n";
import { useStoreDispatch, useStoreSelector } from "../../store";
import {
  selectedPage,
  goToHomePage,
  goToFeedBackPage,
  goSettingsPage,
  goToLoginPage,
  goToAdminFeedbackPage,
  goToBeaconsPage,
  goToAboutUs,
  goToContactUs,
} from "../../store/navigation-reducer";
import Page from "../../types/pages";
import { BrowserView, MobileView } from 'react-device-detect';
import { MouseEvent } from "react";
import { Box, Center, Flex, Icon, IconButton } from "@chakra-ui/react";
import { BsFillChatFill, BsGearFill } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'


function Navigation() {
  const { t } = useTranslation();
  const [langCod, setLangCode] = useState<"PT" | "EN">("PT");
  const [user, setUser] = useState<"Admin" | "User">("Admin");

  const page = useStoreSelector(selectedPage);
  const dispatch = useStoreDispatch();

  React.useEffect(() => {
    if (langCod === "PT") {
      i18n.changeLanguage("pt-PT");
    } else {
      i18n.changeLanguage("en-GB");
    }
  }, [langCod]);

  const handleNavigationClick = (e: MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget;
    if (id === "homepage") dispatch(goToHomePage());
    if (id === "feedback") dispatch(goToFeedBackPage());
    if (id === "settings") dispatch(goSettingsPage());
    if (id === "adminBeacons") dispatch(goToBeaconsPage());
    if (id === "adminFeedback"){
      dispatch(goToAdminFeedbackPage());
    }
    if (id === "about_us") dispatch(goToAboutUs());
  };

  const handleNavigationClickMobile = (id: string) => {
    if (id === "homepage") dispatch(goToHomePage());
    if (id === "feedback") dispatch(goToFeedBackPage());
    if (id === "settings") dispatch(goSettingsPage());
  }

  const handleLogoutClick = () => {
    // TODO the Bloody Logout when user is ready

    dispatch(goToLoginPage());
  };

  const renderMobileNavItem = (pageId: number, icon: any, url: any) => {
    return (
      <>

        <IconButton
          aria-label={`navto${url}`}
          variant='ghost'
          rounded='100'
          _focus={{
            boxShadow: 'none'
          }}
          _hover={{
            backgroundColor: 'isepBrick.400'
          }}
          color={pageId === page ? 'isepBrick.300' : 'isepBrick.400'}
          icon={<Icon
            as={icon}
            w={6}
            h={6}
          />}
          onClick={() => handleNavigationClickMobile(url)}
        />

      </>
    )
  }

  return (
    <>
      <MobileView>
        <Center>
          <Box
            w="234px"
            h="52px"
            bg='isepBrick.500'
            rounded='100'
            position='fixed'
            bottom='30'
          >
            <Flex direction='row' justifyContent='space-around' py='7px' px='14px'>
              {renderMobileNavItem(2, BsFillChatFill, 'feedback')}
              {renderMobileNavItem(1, AiFillHome, 'homepage')}
              {renderMobileNavItem(3, BsGearFill, 'settings')}
            </Flex>
          </Box>
        </Center>
      </MobileView>

      <BrowserView>
        <div className="nav_container">
        {page !== Page.Login && (
        <div className="page_nav">
          <LogoNavBar className="app_logo" />
          <span
            id="homepage"
            onClick={handleNavigationClick}
            className="first_child"
            style={{
              fontWeight: page === 1 ? "700" : "400",
            }}
          >
            {t("homepage")}
          </span>
          <span
            id="feedback"
            onClick={handleNavigationClick}
            style={{
              fontWeight: page === 2 ? "700" : "400",
            }}
          >
            {t("feedback")}
          </span>
          <span
            id="settings"
            onClick={handleNavigationClick}
            style={{
              fontWeight: page === 3 ? "700" : "400",
            }}
          >
            {t("settings")}
          </span>

          {user === "Admin" && (
            <span
              id="adminFeedback"
              onClick={handleNavigationClick}
              style={{
                fontWeight: page === 3 ? "700" : "400",
              }}
            >
              {t("admin_feedback")}
            </span>
          )}

          {user === "Admin" && (
            <span
              id="adminBeacons"
              onClick={handleNavigationClick}
              style={{
                fontWeight: page === 3 ? "700" : "400",
              }}
            >
              {t("admin_beacons")}
            </span>
          )}
        </div>
      )}

      <div className="lang_options">
        {page === Page.Login && (
          <span
            id='about_us'
            className="about_us_copy"
            onClick={handleNavigationClick}
          >
            {t("about_us")}
          </span>
        )}

            <div className="lang_options_wrapper">
              <span
                onClick={() => {
                  setLangCode("PT");
                }}
                style={{
                  fontWeight: langCod === "PT" ? "700" : "300",
                }}
              >
                PT
              </span>
              <span
                onClick={() => {
                  setLangCode("EN");
                }}
                style={{
                  fontWeight: langCod === "EN" ? "700" : "300",
                }}
              >
                EN
              </span>
            </div>

            {page !== Page.Login && (
              <SingOut className="logout_icon" onClick={handleLogoutClick} />
            )}
          </div>
        </div>
      </BrowserView>

    </>
  );
}

export default Navigation;