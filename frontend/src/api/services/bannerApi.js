import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const bannerApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:4000"
    }),

    reducerPath: "advert",
    tagTypes: ["advert"],
    endpoints: (build) => ({
        getAllBanner: build.query({
            query: () => ({
                url: '/api/v1/adverts',
                method: 'GET'
            }),
            providesTags: ['advert']
        })
    })

})

export const {useGetAllBannerQuery} = bannerApi;