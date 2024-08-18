import { ActiveType, EditProductProps } from '@/types'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5050/api/v1/products/'
    }),
    endpoints: builder => ({
        getAllProduct: builder.query({
            query: () => `all`,
        }),
        getActiveProduct: builder.query({
            query: () => `active`,
        }),
        getInActiveProduct: builder.query({
            query: () => `inactive`,
        }),
        getProductById: builder.query<any ,string>({
            query: (id) => `product/${id}`,
        }),
        
        updateActiveProduct: builder.mutation<{}, ActiveType>({
            query: ({id, isActive}) =>({
                url: `activate/${id}`,
                method: "PUT",
                body: {isActive}
            })
        }),
        editProduct: builder.mutation<{}, EditProductProps>({
            query: (id, ...rest) =>({
                url: `product/${id}`,
                method: "PUT",
                body: {rest}
            })
        }),

        deleteProduct: builder.mutation<{}, string>({
            query: (id) =>({
                url: `delete/${id}`,
                method: "Delete",
            })
        })
    })
})

export const {useGetAllProductQuery, useGetActiveProductQuery, useGetInActiveProductQuery, useUpdateActiveProductMutation, useDeleteProductMutation, useEditProductMutation, useGetProductByIdQuery} = productApi