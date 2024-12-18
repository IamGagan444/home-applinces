import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:4000/api";

export interface Product {
  _id: string
  title: string
  image: string
  price: string
  createdAt: string
  updatedAt: string
  __v: number
}

interface ProductResponse {
  statusCode: number
  message: string
  data: Product[]
  success: boolean
}


export const ProductApis = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["USER", "POST"],
  endpoints: (builder) => ({
    postNewUser: builder.mutation({
      query: (credentials) => ({
        url: "/user-registration",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: credentials,
      }),
      invalidatesTags: ["USER"],
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/user-login",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: credentials,
      }),
      invalidatesTags: ["USER"],
    }),
    allProduct: builder.query<Product[], void>({
      query: () => 'get-all-product',
      transformResponse: (response: ProductResponse) => response.data,
    }),
  }),
});

export const { useLoginUserMutation, usePostNewUserMutation, useAllProductQuery } = ProductApis;

