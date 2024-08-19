import { createSlice } from "@reduxjs/toolkit";


const headerSlice = createSlice({
    name: 'header',
    initialState: {
        showMobileNav: false
    },
    reducers: {
        setShowMobileNav(state){
            state.showMobileNav  = !state.showMobileNav
            console.log(state.showMobileNav)
        }
    }
})

export const {setShowMobileNav} = headerSlice.actions

export default headerSlice.reducer