import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const promoCodeApi = createApi({
    reducerPath: 'promoCodeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (build) => ({
        validatePromoCode: build.mutation({
            query: (data) => ({
                url: '/validate',
                method: 'POST',
                body: data,
            }),
        }),
        applyPromoCode: build.mutation({
            query: (data) => ({
                url: '/apply',
                method: 'POST',
                body: data,
            }),
        }),
        getActivePromoCodes: build.query({
            query: () => '/active',
        }),
        createPromoCode: build.mutation({
            query: (body) => (
                {
                    url: '/admin/create',
                    method: 'POST',
                    body: body
                }
            )
        }),
        updatePromoCode: build.mutation({
            query: (body) => (
                {
                    url: `/admin/update/${body?._id}`,
                    method: 'PUT',
                    body: body
                }
            )
        }),
        deletePromoCode: build.mutation({
            query: (body) => (
                {
                    url: `/admin/delete/${body?._id}`,
                    method: 'DELETE',
                    body: body
                }
            )
        }),
        getAllPromo: build.query({
                query: () => ({
                    url: 'admin/allPromo',
                    method: 'GET'
                }),
                providesTags: ['product']
            })
    }),
});

export const {
    useValidatePromoCodeMutation,
    useApplyPromoCodeMutation,
    useGetActivePromoCodesQuery,
    useCreatePromoCodeMutation,
    useUpdatePromoCodeMutation,
    useDeletePromoCodeMutation,
    useGetAllPromoQuery
} = promoCodeApi;
