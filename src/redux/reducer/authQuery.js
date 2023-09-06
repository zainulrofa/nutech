import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "../../common/apis/axios";

export const authQuery = createApi({
    reducerPath: "authQuery",
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: ({ ...data }) => ({
                url: "/registration",
                method: "POST",
                data
            })
        })
    })
}
)

export const {useRegisterMutation} = authQuery