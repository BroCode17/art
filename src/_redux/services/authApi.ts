// import {createApi, fetchBaseQuery, RootState} from '@reduxjs/toolkit/query/react'


// export const authApi = createApi({
//     reducerPath: 'authApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: `${process.env.NEXT_PUBLIC_NGROK_URL}/api/v1/user/`,
//         prepareHeaders: (headers, { getState }) => {
//             const token = (getState() as RootState).user.token;
//             if (token) {
//               headers.set('authorization', `Bearer ${token}`);
//             }
//             return headers;
//           },
//         credentials: 'include'
//     }),
//     endpoints: builder => ({
//         loginUser: builder.mutation({
//             query: (data) => ({
//                 url: '/login',
//                 method: 'POST',
//                 body: {data},
//             })
//         }),
//         validateUser: builder.query({
//             query: (data) => '/update-token'
//         }),
//         // validateUser: builder.mutation({
//         //     query: (data) => ({
//         //         url: '/update-token',
//         //         method: 'POST',
//         //         body: {data},
//         //     })
//         // }),

//         sendUserInquaries: builder.mutation({
//             query: (data:any) => ({
//                 url: '/user-request',
//                 method: 'POST',
//                 body: {data},
//                 credentials: 'same-origin'
//             })
//         })
      
//     })
// })
