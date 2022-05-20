import React from "react";
import { Page } from "./types/pages";
import { Text, Box } from "@chakra-ui/react";
import useTranslation from "./i18n/use-translation";

import { useStoreSelector } from "./store";
import { selectedPage } from "./store/navigation-reducer";
import AdminFeedback from "./app/pages/admin/feedback";
import Home from "./app/pages/home";
import AdminBeacons from "./app/pages/admin/beacons";
import { BrowserView, MobileView } from "react-device-detect";
import Feedback from "./app/pages/feedback";
import UserSettings from "./app/pages/settings";

import LoginPage from "../src/app/pages/login";

function App() {
  const { t } = useTranslation();
  const page = useStoreSelector(selectedPage);

  if (page === Page.HomePage) {
    // Home Page
    return <Home />;
  }

  if (page === Page.Login) {
    // Login Screen
    return <LoginPage />;
  }

  if (page === Page.FeedBack) {
    //FeedBack
    return (
      <div className="App">
        <header className="App-header">
          <BrowserView>
            <Box height={"110px"}></Box>
          </BrowserView>
          <MobileView>
            <Box height={"5px"}></Box>
          </MobileView>
          <Text fontSize="3xl" margin="7" fontFamily={"Montserrat-Medium"}>
            {t("feedback")}
          </Text>
          <Text fontSize="md" margin="7" marginTop="-20px">
            {t("daily_entries")}
          </Text>
          <Feedback></Feedback>
        </header>
      </div>
    );
  }

  if (page === Page.Settings) {
    return (
      <div className="App">
        <header className="App-header">
          <Box height={"110px"}></Box>
          <Text fontSize="3xl" margin="7">
            {t("settings")}
          </Text>
          <UserSettings></UserSettings>
        </header>
      </div>
    );
  }
  if (page === Page.AdminFeedback) {
    return (
      <div className="App">
        <header className="App-header">
          <BrowserView>
            <Box height={"110px"}></Box>
          </BrowserView>
          <MobileView>
            <Box height={"5px"}></Box>
          </MobileView>
          <AdminFeedback></AdminFeedback>
        </header>
      </div>
    );
  }
  if (page === Page.Beacons) {
    return (
      <div className="App">
        <header className="App-header">
          <BrowserView>
            <Box height={"110px"}></Box>
          </BrowserView>
          <MobileView>
            <Box height={"5px"}></Box>
          </MobileView>
          <AdminBeacons></AdminBeacons>
        </header>
      </div>
    );
  }
  return <></>

}

export default App;
