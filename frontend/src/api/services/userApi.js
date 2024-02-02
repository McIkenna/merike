import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const userApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:4000"
    }),

    reducerPath: "user",
    tagTypes: ["user"],
    endpoints: (build) => ({
        createUser: build.mutation({
            query: (reqBody) => {
                // const { currentPage, keyword } = reqParams
            return {
                // headers: 'headers',
                url: '/register',
                method: 'POST'
            }
        },
            providesTags: ['product']
        }),
        loginUser: build.mutation({
            query: (reqBody) => {
                // const { currentPage, keyword } = reqParams
            return {
                // headers: 'headers',
                url: '/login',
                method: 'POST'
            }
        },
            providesTags: ['product']
        }),
        getUser: build.query({
            query: (params) => (
                {
                // headers: 'headers',
                url: `/api/v1/product/${params}`,
                method: 'GET'
            }),
            providesTags: ['product']
        })
    })

})

export const {useCreateUserMutation, useLoginUserMutation ,useGetUserQuery} = userApi;