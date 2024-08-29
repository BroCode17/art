import { createSlice } from "@reduxjs/toolkit";

const countDownSlice = createSlice({
    name: 'countdown',
    initialState: {
       showPage: false
    },
    reducers: {
        setShowPage: (state, action) => {
            state.showPage = action.payload
        },
     

    }

})

export const {setShowPage} =  countDownSlice.actions;

export default countDownSlice.reducer;