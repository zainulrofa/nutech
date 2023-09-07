import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "../../common/apis/axios";


export const profileQuery = createApi({
    reducerPath: "profileQuery",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["Profile"],
    endpoints: (builder) => ({
        editImage: builder.mutation({
            query: ({ token, data, formData}) => ({
                url: "/profile/image",
                method: "PUT",
                data,
                formData,
                accessToken: token
            }),
            providesTags: [{ type: "Home", id: "Profile" }],
        }),
        editProfile: builder.mutation({
            query: ({ token, data}) => ({
                url: "/profile/update",
                method: "PUT",
                data,
                accessToken: token
            }),
            providesTags: [{ type: "Home", id: "Profile" }],
        })
    })
})

export const { useEditImageMutation, useEditProfileMutation } = profileQuery;