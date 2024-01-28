import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const productApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:4000"
    }),

    reducerPath: "product",
    tagTypes: ["product"],
    endpoints: (build) => ({
        getAllProduct: build.query({
            query: ({ currentPage, keyword='', price }) => {
                // const { currentPage, keyword } = reqParams
            return {
                // headers: 'headers',
                url: `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`,
                method: 'GET'
            }
        },
            providesTags: ['product']
        }),
        getSingleProduct: build.query({
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

export const {useGetAllProductQuery, useGetSingleProductQuery} = productApi;