import React from "react";
import { Page } from "./types/pages";

import { useStoreSelector } from "./store";
import { selectedPage } from "./store/navigation-reducer";

function App() {
  const page = useStoreSelector(selectedPage);

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

  return <>Home Page</>;
}

export default App;
