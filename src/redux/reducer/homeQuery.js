import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "../../common/apis/axios";


export const homeQuery = createApi({
    reducerPath: "homeQuery",
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Home'],
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: (token) => ({
                url: "/profile",
                method: "GET",
                accessToken: token
            }),
            transformResponse: (response) => ({
                data: response.data
            })
        }),
        getServices: builder.query({
            query: (token) => ({
                url: "/services",
                method: "GET",
                accessToken: token
            }),
            transformResponse: (response) => ({
                data: response.data
            })
        }),
        getBanner: builder.query({
            query: (token) => ({
                url: "/banner",
                method: "GET",
                accessToken: token
            }),
            transformResponse: (response) => ({
                data: response.data
            })
        }),
        getBalance: builder.query({
            query: (token) => ({
                url: "/balance",
                method: "GET",
                accessToken: token
            }),
            transformResponse: (response) => ({
                data: response.data
            })
        }),
    })
})

export const {useGetProfileQuery, useGetServicesQuery, useGetBannerQuery, useGetBalanceQuery} = homeQuery