import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
};
const billsSlice = createSlice({
    name: 'bills',
    initialState,
    reducers: {
        setBillItems(state, actions) {
            const { customerDetails, billDetails, tabKey } = actions.payload;
            const allBills = {}
            allBills[tabKey] = {
                customerDetails,
                billDetails
            }
            return {
                ...state,
                tabKey: {
                    customerDetails,
                    billDetails
                }

            }

        },
    },
})

export const { setBillItems } = billsSlice.actions;
export default billsSlice.reducer;