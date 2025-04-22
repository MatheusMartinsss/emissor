import { apiSlice } from '@/app/api/apiSlice';

export const companyApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCompany: builder.query({
            query: (cnpj) => ({
                url: `/company/${cnpj}`,
                method: 'GET',

            }),
        }),
        getCompanys: builder.query({
            query: () => ({
                url: `/company/`,
                method: 'GET',
            })
        })
    }),
});

export const { useGetCompanyQuery } = companyApiSlice;
