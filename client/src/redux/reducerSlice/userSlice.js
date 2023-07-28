import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    fullName: 'Ram',
    companyName: '',
    email: '',
    isLoggedIn: false,
    token: '',

};
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUserDetails(state) {
            //code here
        },
    },
})

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;