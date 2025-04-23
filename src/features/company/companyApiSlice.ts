import { apiSlice } from '@/app/api/apiSlice';

export const companyApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCompany: builder.query({
            query: (cnpj) => ({
                url: `/company/${cnpj}`,
                method: 'GET',
            }),
            providesTags: ['Company']
        }),
        getCompanies: builder.query({
            query: (params) => ({
                url: `/company`,
                method: 'GET',
                params // Parâmetros de filtro/ordenação
            }),
            providesTags: ['Company']
        }),
        createCompany: builder.mutation({
            query: (body) => ({
                url: `/company`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Company']
        })
    }),
});

// Exportar os hooks gerados automaticamente
export const {
    useGetCompanyQuery,
    useGetCompaniesQuery,
    useCreateCompanyMutation
} = companyApiSlice;