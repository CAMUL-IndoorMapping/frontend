/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import Page from "../types/pages";

import { StoreState } from ".";

type navigationState = {
  page: Page;
};

// ************ INITIAL STATE ************
const initialState: navigationState = {
  page: 1,
};

// ************ SLICE ************
const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    goToLoginPage: (state) => {
      state.page = Page.Login;
    },
    goToHomePage: (state) => {
      state.page = Page.HomePage;
    },
    goToFeedBackPage: (state) => {
      state.page = Page.FeedBack;
    },
    goSettingsPage: (state) => {
      state.page = Page.Settings;
    },
    goToAdminFeedbackPage: (state) => {
      state.page = Page.AdminFeedback;
    },
    goToBeaconsPage: (state) => {
      state.page = Page.Beacons;
    },
  },
});

// ************ ACTIONS ************
export const { goToLoginPage, goToHomePage, goToFeedBackPage, goSettingsPage, goToAdminFeedbackPage, goToBeaconsPage } =
  navigationSlice.actions;

// ************ SELECTORS ************
export const selectedPage = (state: StoreState): Page => state.navigation.page;

export default navigationSlice.reducer;
