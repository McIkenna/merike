import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const checkoutApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:4000"
    }),

    reducerPath: "checkout",
    tagTypes: ["checkout"],
    endpoints: (build) => ({
        checkoutOrder: build.mutation({
            query: (reqBody) => ({
                url: '/api/v1/create-checkout-session',
                method: 'POST',
                body: reqBody
            }),
            providesTags: ['checkout']
        })
    })

})

export const { useCheckoutOrderMutation } = checkoutApi;