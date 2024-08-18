import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        productData: {
            data: undefined,
            leading: false,
            error: false,
        },
     
    },
    reducers: {
        updateUserData: (state, action) => {
            state.productData = action.payload
        },
      

    }

})




export const {updateUserData} =  productSlice.actions;

const fetchProduct = async () => {
  
}

export default productSlice.reducer;