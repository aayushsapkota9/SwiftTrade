import { createSlice } from "@reduxjs/toolkit";

export const initialState = {

    token: '',
    userDetails: {},
    isLoggedIn: false

};
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUserDetails(state, actions) {
            const { token, userDetails } = actions.payload;
            return {
                ...state,
                token,
                userDetails,
                isLoggedIn: true
            }

        },
    },
})

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;