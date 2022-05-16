/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import Page from "../types/pages";

import { StoreState } from ".";

type navigationState = {
  page: Page
  aboutUs: boolean
  contactUs: boolean
  faqs: boolean
};

// ************ INITIAL STATE ************
const initialState: navigationState = {
  page: 0,
  aboutUs: false,
  contactUs: false,
  faqs: false
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
    goToAboutUs: (state) => {
      state.aboutUs = true
      state.contactUs = false
      state.faqs = false
    },
    leaveAboutUs: (state) => {
      state.aboutUs = false
    },
    goToContactUs: (state)=>{
      state.contactUs = true
      state.aboutUs = false
    },
    goToFAQs:(state)=>{
      state.faqs = true
      state.aboutUs = false
    },
  },
});

// ************ ACTIONS ************
export const { goToLoginPage, goToHomePage, goToFeedBackPage, goSettingsPage, goToAdminFeedbackPage, goToBeaconsPage, goToAboutUs, leaveAboutUs, goToContactUs, goToFAQs } = navigationSlice.actions

// ************ SELECTORS ************
export const selectedPage = (state: StoreState): Page => state.navigation.page;
export const aboutUsState = (state: StoreState): boolean => state.navigation.aboutUs;
export const contactUsState = (state: StoreState): boolean => state.navigation.contactUs;
export const faqsState = (state: StoreState): boolean => state.navigation.faqs;

export default navigationSlice.reducer;
