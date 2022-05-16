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
        isAdmin: false
    }
};

// ************ SLICE ************
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state) => {
            state.user = {
                userId: 'joao',
                isAdmin: true
            }
        },
        logout: (state) => {
            state.user = {
                userId: '',
                isAdmin: false
            }
        }
    }
})

// ************ ACTIONS ************
export const {login, logout} = userSlice.actions

// ************ SELECTORS ************
export const userData = (state: StoreState): User => state.user.user

export default userSlice.reducer