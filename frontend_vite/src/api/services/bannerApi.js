import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const bannerApi = createApi({
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

    reducerPath: "advert",
    tagTypes: ["advert"],
    endpoints: (build) => ({
        getAllBanner: build.query({
            query: () => ({
                url: '/adverts',
                method: 'GET'
            }),
            providesTags: ['advert']
        }),
        getSingleBanner: build.mutation({
            query: (body) => (
                {
                    url: `/advert/${body?._id}`,
                    method: 'GET',
                    body: body
                }
            )
        }),
        deleteBanner: build.mutation({
            query: (id) => (
                {
                    url: `/admin/advert/${id}`,
                    method: 'DELETE'
                }
            )
        }),
        createBanner: build.mutation({
            query: (body) => (
                {
                    url: '/admin/advert/new',
                    method: 'POST',
                    body: body
                }
            )
        }),
        updateBanner: build.mutation({
            query: (body) => (
                {
                    url: `/admin/advert/${body?._id}`,
                    method: 'PUT',
                    body: body
                }
            )
        })
    })

})

export const {useGetAllBannerQuery, useCreateBannerMutation, useDeleteBannerMutation, useGetSingleBannerMutation, useUpdateBannerMutation} = bannerApi;