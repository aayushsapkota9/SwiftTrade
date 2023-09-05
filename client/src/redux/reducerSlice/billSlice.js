import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    allBills: {}
};
const billsSlice = createSlice({
    name: 'bills',
    initialState,
    reducers: {
        setBillItems(state, actions) {
            const bill = actions.payload.bill;

            return {
                ...state,
                bill
            }

        },
    },
})

export const { setBillItems } = billsSlice.actions;
export default billsSlice.reducer;