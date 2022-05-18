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
        userId: '',
        isAdmin: false,
        password:'',
        authToken: ''
    }
};

// ************ SLICE ************
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, {payload}) => {
            state.user = {
                userId: payload.username,
                isAdmin: payload.isAdmin,
                password: payload.password,
                authToken: payload.authToken
            }
        },
        logout: (state) => {
            state.user = {
                userId: '',
                isAdmin: false,
                password: '',
                authToken: ''
            }
        }
    }
})

// ************ ACTIONS ************
export const {login, logout} = userSlice.actions

// ************ SELECTORS ************
export const userData = (state: StoreState): User => state.user.user

export default userSlice.reducer