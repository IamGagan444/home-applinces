import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddToCartResponse, Product, ProductResponse } from "../types";

const BASE_URL = "http://localhost:4000/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["USER", "Cart", "Offer"],
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
      query: () => "/get-all-product",
      transformResponse: (response: ProductResponse) => response.data,
    }),
    addToCart: builder.mutation<
      AddToCartResponse,
      { productId: string; userId: string }
    >({
      query: (body) => ({
        url: "/add-to-cart",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    getAllCartProduct: builder.query({
      query: (userId) => ({
        url: `/get-all-cartproduct/${userId}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    removeCartProduct: builder.mutation({
      query: (body) => ({
        url: "/remove-cart-product",
        method: "post",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `/get-productby-id/${productId}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    makeOffer: builder.mutation({
      query: (body) => ({
        url: "/make-offer",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Offer"],
    }),
    getOffer: builder.query({
      query: (userId) => ({
        url: `/get-offer/${userId}`,
        method: "get",
       
      }),
      providesTags: ["Offer"],
    }),
    viewOffer: builder.mutation({
      query: (body) => ({
        url: "/view-offer",
        method: "post",
        body,
      }),
      invalidatesTags: ["Offer"],
    })

  }),
});

export const {
  useLoginUserMutation,
  usePostNewUserMutation,
  useAllProductQuery,
  useAddToCartMutation,
  useGetAllCartProductQuery,
  useRemoveCartProductMutation,
  useGetProductByIdQuery,
  useMakeOfferMutation,
  useGetOfferQuery,
  useViewOfferMutation,
} = api;
