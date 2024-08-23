import { ActiveType, EditProductProps } from '@/types'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: 'productApi',
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({
        // baseUrl: `https://amo-art-backend.onrender.com/api/v1/products/`
        baseUrl: `${process.env.NEXT_PUBLIC_NGROK_URL}/api/v1/products/`
    }),
    endpoints: builder => ({
        getAllProduct: builder.query({
            query: () => `all`,
            providesTags: ['Product']
        }),
        getActiveProduct: builder.query({
            query: () => `active`,
            providesTags: ['Product']
        }),
        getInActiveProduct: builder.query({
            query: () => `inactive`,
            providesTags: ['Product']
        }),
        getProductById: builder.query<any ,string>({
            query: (id) => `product/${id}`,
            providesTags: ['Product']
        }),
        
        updateActiveProduct: builder.mutation<{}, ActiveType>({
            query: ({id, isActive}) =>({
                url: `activate/${id}`,
                method: "PUT",
                body: {isActive},
                invalidatesTags:  ['Product']
            })
        }),
        editProduct: builder.mutation<{}, EditProductProps>({
            query: (id, ...rest) =>({
                url: `product/${id}`,
                method: "PUT",
                body: {rest},
                invalidatesTags:  ['Product']
            })
        }),

        deleteProduct: builder.mutation<{}, string>({
            query: (id) =>({
                url: `delete/${id}`,
                method: "Delete",
                invalidatesTags:  ['Product']
            })
        })
    })
})

export const {useGetAllProductQuery, useGetActiveProductQuery, useGetInActiveProductQuery, useUpdateActiveProductMutation, useDeleteProductMutation, useEditProductMutation, useGetProductByIdQuery} = productApi