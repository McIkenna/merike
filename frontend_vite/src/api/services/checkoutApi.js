import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { getApiUrl } from "../getApiUrl";
export const checkoutApi = createApi({
    baseQuery: fetchBaseQuery({
         baseUrl: getApiUrl(),
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