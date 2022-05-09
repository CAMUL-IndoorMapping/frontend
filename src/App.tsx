import React from "react";
import { Page } from "./types/pages";
import { Text } from '@chakra-ui/react'
import useTranslation from "./i18n/use-translation";

import { useStoreSelector, useStoreDispatch } from "./store";
import { selectedPage, goToLoginPage } from "./store/navigation-reducer";
import { AdminFeedback } from "./app/pages/admin";
import CustomButton from "./components/buttons";

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
    //AdminFeedBack
    return (
      <div className="App">
        <header className="App-header">
          <Text fontSize='3xl'>{t("feedback_admin_page")}</Text>
          <AdminFeedback></AdminFeedback>
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
