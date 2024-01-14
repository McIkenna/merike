import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const categoryApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000"
    }),

    reducerPath: "category",
    tagTypes: ["category"],
    endpoints: (build) => ({
        getAllCategory: build.query({
            query: () => ({
                headers: 'headers',
                url: '',
                method: 'GET'
            }),
            providesTags: ['category']
        })
    })

})

export const {useGetAllCategoryQuery} = categoryApi;