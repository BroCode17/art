import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const imageApi = createApi({
  reducerPath: 'imageApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_NGROK_URL}/api/v1/layout`}), // Adjust the base URL as per your backend
  tagTypes: ['Image'],
  endpoints: (builder) => ({
    getImages: builder.query({
      query: () => '/images',
      providesTags: ['Image'],
    }),
    addImage: builder.mutation<any, any>({
        query: (newImage) => ({
            url: '/images',
            method: 'POST',
            body: newImage,
          }
      ),
      invalidatesTags: ['Image'],
    }),
    updateImage: builder.mutation({
      query: (updatedImage) => ({
        url: `/images`,
        method: 'PUT',
        body: updatedImage,
      }),
      invalidatesTags: ['Image'],
    }),
    deleteImage: builder.mutation<{}, string>({
      query: (id) => ({
        url: `/images/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Image'],
    }),
  }),
});

export const { useGetImagesQuery, useAddImageMutation, useUpdateImageMutation, useDeleteImageMutation } = imageApi;
