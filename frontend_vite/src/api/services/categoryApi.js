import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const categoryApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:4000"
    }),

    reducerPath: "category",
    tagTypes: ["category"],
    endpoints: (build) => ({
        getAllCategory: build.query({
            query: () => ({
                url: '/api/v1/categories',
                method: 'GET'
            }),
            providesTags: ['category']
        })
    })

})

export const {useGetAllCategoryQuery} = categoryApi;
export default categoryApi;