import React from "react";
import { Page } from "./types/pages";
import { Text, Box } from '@chakra-ui/react'
import useTranslation from "./i18n/use-translation";

import { useStoreSelector, useStoreDispatch } from "./store";
import { selectedPage, goToLoginPage } from "./store/navigation-reducer";
import { AdminFeedback } from "./app/pages/admin/feedback";
import { AppBar, Toolbar } from "@material-ui/core";

import CustomButton from "./components/buttons";
import AdminBeacons from "./app/pages/admin/beacons";

function App() {
  const { t } = useTranslation();
  const page = useStoreSelector(selectedPage);
  const dispatch = useStoreDispatch();

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(goToLoginPage());
  //   }, 1000);
  // });

  if (page === Page.Login) {
    return <>Login Page</>;
  }

  if (page === Page.FeedBack) {
    //FeedBack
    return <>FeedBack Page</>;
  }

  if (page === Page.Settings) {
    //Setting
    return <>Setting</>;
  }
  if (page === Page.AdminFeedback) {
    return (
      <div className="App">
        <header className="App-header">
          <Box height={'110px'}></Box>
          <Text fontSize='3xl' margin='7'>{t("feedback_admin_page")}</Text>
          <AdminFeedback></AdminFeedback>
        </header>
       </div>
       );
  }
  if (page === Page.Beacons) {
    return (
      <div className="App">
        <header className="App-header">
          <Box height={'110px'}></Box>
          <Text fontFamily={"Montserrat-SemiBold"} fontSize='3xl' margin='7'>{t("admin_beacons")}</Text>
          <AdminBeacons></AdminBeacons>
        </header>
       </div>
       );
  }
  return (
    <CustomButton
      backgroundColor="isepBrick.300"
      borderColor="isepGreen.500"
      buttonColor="isepGrey.600"
      hoverColor="isepBrick.400"
      text="Hello There"
      handleButtonClick={() => [alert("You Clicked with Button😂😂😂😂😂😂")]}
    />
  );
}

export default App;
