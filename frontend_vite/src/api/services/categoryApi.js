import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { getApiUrl } from "../getApiUrl";
export const categoryApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl(),
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