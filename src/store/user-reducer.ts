/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { StoreState } from ".";
import { User } from "../types/user";

type UserState = {
    user: User
}

// ************ INITIAL STATE ************
const initialState: UserState = {
    user: {
        username: '',
        isAdmin: false,
        password:'',
        authToken: '',
        userID: '',
    }
};

// ************ SLICE ************
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, {payload}) => {
            state.user = {
                username: payload.username,
                isAdmin: payload.isAdmin,
                password: payload.password,
                authToken: payload.authToken,
                userID: payload.userID
            }
        },
        logout: (state) => {
            state.user = {
                username: '',
                isAdmin: false,
                password: '',
                authToken: '',
                userID: ''
            }
        }
    }
})

// ************ ACTIONS ************
export const {login, logout} = userSlice.actions

// ************ SELECTORS ************
export const userData = (state: StoreState): User => state.user.user

export default userSlice.reducer