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
                url: '/api/v1/register',
                method: 'POST',
                body: reqBody
            }
        },
            providesTags: ['product']
        }),
        loginUser: build.mutation({
            query: (reqBody) => {
                console.log(reqBody)
                // const { currentPage, keyword } = reqParams
            return {
                // headers: 'headers',
                url: '/api/v1/login',
                method: 'POST',
                body: reqBody
            }
        },
            providesTags: ['login']
        }),
        logoutUser: build.query({
            query: () =>(
                {
                url: `/api/v1/logout`,
                method: 'GET'
            }),
            providesTags: ['logOut']
     
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

export const {useCreateUserMutation, useLoginUserMutation ,useGetUserQuery, useLogoutUserQuery} = userApi;