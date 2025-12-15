import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// const {stateStore, auth} = useSelector((state) => state)
// const {user} = auth
// console.log('auth', auth)
export const productApi = createApi(
    {
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

        reducerPath: "product",
        tagTypes: ["product"],


        endpoints: (build) => ({
            // getAllProduct: build.query({
            //     query: ({ currentPage, keyword='', price, rating=0}) => {
            //         // const { currentPage, keyword } = reqParams
            //         let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`
            //         // if(selectedCategory){
            //         //     link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${selectedCategory}&ratings[gte]=${rating}`
            //         // }
            //     return {
            //         // headers: 'headers',
            //         url: link,
            //         method: 'GET'
            //     }
            // },
            //     providesTags: ['product']
            // }),
            getAllProducts: build.query({
                query: () => ({
                    url: '/api/v1/allProducts',
                    method: 'GET'
                }),
                providesTags: ['product']
            }),
            getSingleProduct: build.query({
                query: (params) => (
                    {
                        // headers: 'headers',
                        url: `/api/v1/product/${params}`,
                        method: 'GET'
                    }),
                providesTags: ['product']
            }),
            getProductBySeller: build.query({
                query: (params) => (
                    {
                        // headers: 'headers',
                        url: `/api/v1/admin/product/seller/${params}`,
                        method: 'GET'
                    }),
                providesTags: ['product']
            }),
            createProduct: build.mutation({
                query: (body) => (
                    {
                        url: '/api/v1/admin/product/new',
                        method: 'POST',
                        body: body
                    }
                )
            }),
            updateProduct: build.mutation({
                query: (body) => (
                    {
                        url: `/api/v1/admin/product/${body?._id}`,
                        method: 'PUT',
                        body: body
                    }
                )
            }),
            deleteProduct: build.mutation({
                query: (id) => (
                    {    
                        url: `/api/v1/admin/product/${id}`,
                        method: 'DELETE'
                    }
                )
            })

        })

    })

export const { 
    useGetAllProductsQuery, 
    useGetSingleProductQuery, 
    useCreateProductMutation,
    useGetProductBySellerQuery,
    useUpdateProductMutation,
    useDeleteProductMutation
 } = productApi;