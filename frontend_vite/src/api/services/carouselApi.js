import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getApiUrl } from "../getApiUrl";
export const carouselApi = createApi({
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

    reducerPath: "carousel",
    tagTypes: ["carousel"],
    endpoints: (build) => ({
        getAllCarousel: build.query({
            query: () => ({
                url: '/carousels',
                method: 'GET'
            }),
            providesTags: ['carousel']
        }),
        getSingleCarousel: build.mutation({
            query: (body) => (
                {
                    url: `/carousel/${body?._id}`,
                    method: 'GET',
                    body: body
                }
            )
        }),
        deleteCarousel: build.mutation({
            query: (id) => (
                {
                    url: `/admin/carousel/${id}`,
                    method: 'DELETE'
                }
            )
        }),
        createCarousel: build.mutation({
            query: (body) => (
                {
                    url: '/admin/carousel/new',
                    method: 'POST',
                    body: body
                }
            )
        }),
        updateCarousel: build.mutation({
            query: (body) => (
                {
                    url: `/admin/carousel/${body?._id}`,
                    method: 'PUT',
                    body: body
                }
            )
        }),
    })

})

export const { useGetAllCarouselQuery, useCreateCarouselMutation, useUpdateCarouselMutation, useGetSingleCarouselMutation, useDeleteCarouselMutation } = carouselApi;