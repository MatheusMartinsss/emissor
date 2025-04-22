import { apiSlice } from '@/app/api/apiSlice';

export const nuvemApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEmpresa: builder.query({
            query: (cnpj) => ({
                url: `/nuvem/empresa/${cnpj}`,
                method: 'GET',

            }),
        }),
    }),
});

export const { useLazyGetEmpresaQuery } = nuvemApiSlice;
