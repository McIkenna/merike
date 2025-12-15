import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const orderApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:4000",
        prepareHeaders: (headers, { getState }) => {
                const token = getState().auth.token;
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`);
                }
                return headers;
            },
    }),

    reducerPath: "order",
    tagTypes: ["order"],
    endpoints: (build) => ({
        myOrders: build.query({
            query: (reqBody) => ({
                url: '/api/v1/orders/me',
                method: 'GET',
                body: reqBody
            }),
            providesTags: ['order']
        })
    })

})

export const { useMyOrdersQuery } = orderApi;