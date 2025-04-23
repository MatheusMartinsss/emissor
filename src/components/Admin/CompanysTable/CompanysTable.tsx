import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TextField,
    Skeleton
} from '@mui/material';
import { Edit, Visibility, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { format, parseISO } from 'date-fns';
import { debounce } from 'lodash';
import { useGetCompaniesQuery } from '@/features/company/companyApiSlice';

interface Company {
    cnpj: string;
    razaoSocial: string;
    createdAt: string;
}

interface QueryParams {
    cnpj?: string;
    razaoSocial?: string;
    createdAt?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

const CompanysTable = () => {
    const [queryParams, setQueryParams] = useState<QueryParams>({
        sortBy: 'cnpj',
        sortOrder: 'asc'
    });

    const [tempFilters, setTempFilters] = useState<Omit<QueryParams, 'sortBy' | 'sortOrder'>>({});

    // Usar o hook do RTK Query corretamente
    const { data: companies = [], isLoading, isError } = useGetCompaniesQuery({
        ...queryParams,
        ...tempFilters
    });

    const handleSort = (field: string) => {
        setQueryParams(prev => ({
            ...prev,
            sortBy: field,
            sortOrder: prev.sortBy === field && prev.sortOrder === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleFilterChange = debounce((field: keyof QueryParams, value: string) => {
        setTempFilters(prev => ({
            ...prev,
            [field]: value || undefined
        }));
    }, 500);

    if (isError) return <div>Erro ao carregar dados</div>;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        {['cnpj', 'razaoSocial', 'createdAt'].map((field) => (
                            <TableCell key={field}>
                                <div
                                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                    onClick={() => handleSort(field)}
                                >
                                    {{
                                        cnpj: 'CNPJ',
                                        razaoSocial: 'Razão Social',
                                        createdAt: 'Data de Criação'
                                    }[field]}

                                    {queryParams.sortBy === field && (
                                        queryParams.sortOrder === 'asc' ?
                                            <ArrowUpward fontSize="small" /> :
                                            <ArrowDownward fontSize="small" />
                                    )}
                                </div>
                            </TableCell>
                        ))}
                        <TableCell align="right">Ações</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <TextField
                                variant="standard"
                                placeholder="Filtrar CNPJ"
                                onChange={(e) => handleFilterChange('cnpj', e.target.value)}
                                fullWidth
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                variant="standard"
                                placeholder="Filtrar Razão Social"
                                onChange={(e) => handleFilterChange('razaoSocial', e.target.value)}
                                fullWidth
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                type="date"
                                variant="standard"
                                onChange={(e) => handleFilterChange('createdAt', e.target.value)}
                                InputProps={{
                                    inputProps: { max: format(new Date(), 'yyyy-MM-dd') }
                                }}
                                fullWidth
                            />
                        </TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>

                <TableBody>
                    {isLoading ? (
                        Array(5).fill(0).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell><Skeleton variant="text" /></TableCell>
                                <TableCell><Skeleton variant="text" /></TableCell>
                                <TableCell><Skeleton variant="text" /></TableCell>
                                <TableCell><Skeleton variant="text" /></TableCell>
                            </TableRow>
                        ))
                    ) : (
                        companies.map((company: Company) => (
                            <TableRow key={company.cnpj}>
                                <TableCell>{company.cnpj}</TableCell>
                                <TableCell>{company.razaoSocial}</TableCell>
                                <TableCell>
                                    {format(parseISO(company.createdAt), 'dd/MM/yyyy HH:mm')}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton>
                                        <Edit />
                                    </IconButton>
                                    <IconButton>
                                        <Visibility />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CompanysTable;