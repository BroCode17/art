import { createSlice } from "@reduxjs/toolkit";



const orderSlice = createSlice({
    name:'order',
    initialState: {
        showOrder: false,
        productId: "",
    },
    reducers: {
        setOpenClose: (state) => {
            state.showOrder = !state.showOrder
        },
        setProductId: (state, action) => {
            state.productId = action.payload
        }
    }
})

export const {setOpenClose, setProductId} = orderSlice.actions

export default orderSlice.reducer