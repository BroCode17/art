import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { RootState } from '../store/store';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_NGROK_URL}/api/v1/user/`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.accessToken;
            if (token) {
              headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
          },
        credentials: 'include'
    }),
    endpoints: builder => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: {data},
            })
        }),
        validateUser: builder.query({
            query: () => '/update-token'
        }),
        // validateUser: builder.mutation({
        //     query: (data) => ({
        //         url: '/update-token',
        //         method: 'POST',
        //         body: {data},
        //     })
        // }),

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


export const {useLoginUserMutation, useLazyValidateUserQuery, useSendUserInquariesMutation} = userApi
