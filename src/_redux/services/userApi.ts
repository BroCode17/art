import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5050/api/v1/user/'
    }),
    endpoints: builder => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: {data}
            })
        }),
        validateUser: builder.mutation({
            query: (data) => ({
                url: '/update-token',
                method: 'POST',
                body: {data},
                credentials: 'same-origin'
            })
        }),

        sendUserInquaries: builder.mutation({
            query: (data:any) => ({
                url: '/user-request',
                method: 'POST',
                body: {data},
                credentials: 'same-origin'
            })
        })
      
    })
})


export const {useLoginUserMutation, useValidateUserMutation, useSendUserInquariesMutation} = userApi
