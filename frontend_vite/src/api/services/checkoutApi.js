import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const checkoutApi = createApi({
    baseQuery: fetchBaseQuery({
         baseUrl: "http://127.0.0.1:4000/api/v1",
            prepareHeaders: (headers, { getState }) => {
                const token = getState().auth.token;
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`);
                }
                return headers;
            },
    }),

    reducerPath: "checkout",
    tagTypes: ["checkout"],
    endpoints: (build) => ({
        checkoutOrder: build.mutation({
            query: (reqBody) => ({
                url: '/create-checkout-session',
                method: 'POST',
                body: reqBody
            }),
            providesTags: ['checkout']
        })
    })

})

export const { useCheckoutOrderMutation } = checkoutApi;