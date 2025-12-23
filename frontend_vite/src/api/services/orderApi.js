import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { getApiUrl } from "../getApiUrl";
export const orderApi = createApi({
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

    reducerPath: "order",
    tagTypes: ["order"],
    endpoints: (build) => ({
        myOrders: build.query({
            query: (param) => ({
                url: `/myOrders/${param}`,
                method: 'GET',
            }),
            providesTags: ['order']
        }),
        getSingleOrder: build.query({
            query: (param) => ({
                url: `/order/${param}`,
                method: 'GET'
            }),
            providesTags: ['order']
        }),
        allOrders: build.query({
            query: () => ({
                url: `/admin/orders`,
                method: 'GET',
            }),
            providesTags: ['order']
        }),
        cancelOrder: build.mutation({
             query: (reqBody) => ({
                url: '/cancelOrder',
                method: 'PUT',
                body: reqBody
            }),
            providesTags: ['cancel-order']
        }),
        createPendingOrder: build.mutation({
            query: (reqBody) => ({
                url: '/create-pending-order',
                method: 'POST',
                body: reqBody
            }),
            providesTags: ['create-pending-order']

        }),
        updateOrder: build.mutation({
             query: (reqBody) => ({
                url: `admin/update/${reqBody._id}`,
                method: 'PUT',
                body: reqBody
            }),
            providesTags: ['cancel-order']
        }),
    })

})

export const { useMyOrdersQuery, useCancelOrderMutation, useCreatePendingOrderMutation, useGetSingleOrderQuery, useAllOrdersQuery, useUpdateOrderMutation } = orderApi;