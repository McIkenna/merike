import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const categoryApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),

    reducerPath: "category",
    tagTypes: ["category"],
    endpoints: (build) => ({
        getAllCategory: build.query({
            query: () => ({
                url: '/categories',
                method: 'GET'
            }),
            providesTags: ['category']
        })
    })

})

export const {useGetAllCategoryQuery} = categoryApi;
export default categoryApi;