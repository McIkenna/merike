import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const carouselApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:4000"
    }),

    reducerPath: "carousel",
    tagTypes: ["carousel"],
    endpoints: (build) => ({
        getAllCarousel: build.query({
            query: () => ({
                url: '/api/v1/carousels',
                method: 'GET'
            }),
            providesTags: ['category']
        })
    })

})

export const {useGetAllCarouselQuery} = carouselApi;
export default carouselApi;