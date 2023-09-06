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
        invalidatesTags: [{type:"Home", id:"Balance"}]
    }),
  }),
});

export const {useTopupMutation} = transactionQuery
