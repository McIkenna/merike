import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const productApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:4000"
    }),

    reducerPath: "product",
    tagTypes: ["product"],
    endpoints: (build) => ({
        getAllProduct: build.query({
            query: () => ({
                // headers: 'headers',
                url: '/api/v1/products',
                method: 'GET'
            }),
            providesTags: ['product']
        })
    })

})

export const {useGetAllProductQuery} = productApi;