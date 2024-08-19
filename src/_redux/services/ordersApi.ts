import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5050/api/v1/orders",
  }),
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: () => "/",
    }),
    createOrder: builder.mutation<{}, any>({
      query: (data) =>({
          url: `/create-order`,
          method: "POST",
          body: {data}
      })
  }),
  }),
});

export const { useGetAllOrderQuery } = orderApi;
