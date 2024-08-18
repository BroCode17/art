import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: undefined,
        accessToken: ""
    },
    reducers: {
        updateUserData: (state, action) => {
            state.userData = action.payload
        },
        updateUserToken: (state, action) => {
            state.accessToken = action.payload
        }

    }

})

export const {updateUserData, updateUserToken} =  userSlice.actions;

export default userSlice.reducer;