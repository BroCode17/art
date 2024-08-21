import { ActiveType, EditProductProps } from '@/types'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: 'productApi',
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_NGROK_URL}/api/v1/products/`
    }),
    endpoints: builder => ({
        getAllProduct: builder.query({
            query: () => `all`,
            // transformResponse: (response: any) => {
            //     // Handle the response manually if necessary
            //     if (typeof response === 'string') {
            //       try {
            //         return JSON.parse(response);
            //       } catch (e) {
            //         console.error('Failed to parse response:', e);
            //         return response;
            //       }
            //     }
            //     return response;
            //   },
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