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
    getOrderByRef: builder.query<any, string>({
      query: (ref) => `/${ref}`
  }),
  }),
});

export const { useGetAllOrderQuery, useGetOrderByRefQuery } = orderApi;
