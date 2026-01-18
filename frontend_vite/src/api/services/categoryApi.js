import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { getApiUrl } from "../getApiUrl";
export const categoryApi = createApi({
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

    reducerPath: "category",
    tagTypes: ["category"],
    endpoints: (build) => ({
        getAllCategory: build.query({
            query: () => ({
                url: '/categories',
                method: 'GET'
            }),
            providesTags: ['category']
        })
    })

})

export const {useGetAllCategoryQuery} = categoryApi;
export default categoryApi;