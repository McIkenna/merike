import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const userApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
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
                method: 'POST',
                body: reqBody
            }
        },
            providesTags: ['product']
        }),
        loginUser: build.mutation({
            query: (reqBody) => {
                // console.log(reqBody)
                // const { currentPage, keyword } = reqParams
            return {
                // headers: 'headers',
                url: '/login',
                method: 'POST',
                body: reqBody
            }
        },
            providesTags: ['login']
        }),
        logoutUser: build.mutation({
            query: () => ({
                url: `/logout`,
                method: 'POST'
            }),
            invalidatesTags: ['logOut']
        }),
        getUser: build.query({
            query: (params) => (
                {
                // headers: 'headers',
                url: `/product/${params}`,
                method: 'GET'
            }),
            providesTags: ['product']
        })
    })

})

export const {useCreateUserMutation, useLoginUserMutation ,useGetUserQuery, useLogoutUserMutation} = userApi;