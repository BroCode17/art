import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UpdateOrderProps {
  ref: string, 
  trackingId?: string,
  shipState: string
}

export const orderApi = createApi({
  reducerPath: "orderApi",
  tagTypes:['Data'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_NGROK_URL}/api/v1/orders`,
  }),
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: () => "/",
      providesTags: ['Data']
    }),
    getOrderByRef: builder.query<any, string>({
      query: (ref) => `/${ref}`,
  }),
    deleteOrderByRef: builder.mutation<any, string>({
      query: (ref) => ({
        url: `/${ref}`,
        method: 'DELETE',
        invalidatesTags: ['Data'],
    })
  }),
    updateOrderTrackingId: builder.mutation<any, UpdateOrderProps>({
      query: ({ref, trackingId,shipState}) => ({
        url: `/${ref}`,
        method: 'PUT',
        body: {data: {trackingId, shipState}},
        invalidatesTags: ['Data'],
    })
  }),
  }),
});

export const { useGetAllOrderQuery, useGetOrderByRefQuery, useDeleteOrderByRefMutation, useUpdateOrderTrackingIdMutation } = orderApi;
