import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "../../common/apis/axios";

export const transactionQuery = createApi({
  reducerPath: "transactionQuery",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Transaction"],
  endpoints: (builder) => ({
    topup: builder.mutation({
      query: ({ token, data }) => ({
        url: "/topup",
        method: "POST",
        data,
        accessToken: token,
      }),
      invalidatesTags: [{ type: "Home", id: "Balance" }],
    }),
    getHistory: builder.query({
      query: ({ token, offset, limit }) => ({
        url: "/transaction/history",
        method: "GET",
        accessToken: token,
        params: { offset, limit },
      }),
      transformResponse: (response) => ({
        data: response.data,
      }),
      invalidatesTags: [{ type: "Home", id: "Balance" }],
    }),
  }),
});

export const { useTopupMutation, useGetHistoryQuery } = transactionQuery;
