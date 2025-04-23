import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DadosForm from '@/components/Admin/Forms/Company/Dados';
import EnderecoForm from '@/components/Admin/Forms/Company/Endereco';
import NfeForm from '@/components/Admin/Forms/Company/Nfe';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { useCreateCompanyMutation } from '@/features/company/companyApiSlice'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


const schema = yup.object({
    cnpj: yup.string().required('Campo obrigatório'),
    ieEstadual: yup.string().required('Campo obrigatório'),
    ieMunicipal: yup.string(),
    razaoSocial: yup.string().required('Campo obrigatório').min(6, 'Minimo 12 caracteres').max(128),
    nomePopular: yup.string().required('Campo obrigatório').min(6, 'Minimo 12 caracteres').max(128),
    cnaePrincipal: yup.string().required('Campo obrigatório'),
    regimeTributario: yup.number().required('Campo obrigatório').oneOf([1, 2, 3, 4]),
    ambiente: yup.string().required().oneOf(['producao', 'homologacao']),
    email: yup.string().email().required('Campo obrigatório'),
    telefone: yup.string().required('Campo obrigatório'),
    address: yup.object({
        logradouro: yup.string().required(),
        numero: yup.string().required(),
        complemento: yup.string(),
        bairro: yup.string().required().min(4).max(30),
        codigo_municipio: yup.string(),
        cidade: yup.string().required(),
        uf: yup.string().required(),
        codigo_pais: yup.string().required(),
        pais: yup.string(),
        cep: yup.string().required()
    }),
    nfe: yup.object({
        serie: yup.number().required(),
        sequencia: yup.number().required(),
    })
})

const defaultValues = {

    ambiente: '',
    cnaePrincipal: '',
    cnpj: '',
    email: '',
    ieEstadual: '',
    ieMunicipal: '',
    nomePopular: '',
    razaoSocial: '',
    regimeTributario: 1,
    telefone: '',

    address: {
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        codigo_municipio: '',
        cidade: '',
        uf: '',
        codigo_pais: '1058',
        pais: 'Brasil',
        cep: ''
    },
    nfe: {
        serie: 0,
        sequencia: 1
    }
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const Company = () => {
    const [value, setValue] = React.useState(0);
    const [createCompany, { isError }] = useCreateCompanyMutation()
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues
    })
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const tabFields = [
        ['ambiente', 'cnpj', 'razaoSocial', 'email', 'ieEstadual',
            'ieMunicipal', 'nomePopular', 'regimeTributario', 'telefone',
            'cnaePrincipal'],
        ['address.uf', 'address.cidade', 'address.logradouro', 'address.bairro', 'address.cep'],
        ['nfe.serie', 'nfe.sequencia']
    ];


    const focusOnErrorTab = async () => {
        const errors = methods.formState.errors;

        const findErrorField = (obj: any, path: string[] = []): string | null => {
            for (const key in obj) {
                const newPath = [...path, key];
                if (obj[key]?.message) return newPath.join('.');
                if (typeof obj[key] === 'object') {
                    const result = findErrorField(obj[key], newPath);
                    if (result) return result;
                }
            }
            return null;
        };

        const errorField = findErrorField(errors);

        if (errorField) {
            for (let tabIndex = 0; tabIndex < tabFields.length; tabIndex++) {
                if (tabFields[tabIndex].some(field => errorField.startsWith(field))) {
                    setValue(tabIndex);
                    return;
                }
            }
        }
    };

    const handleNext = async () => {
        const isValid = await methods.trigger(tabFields[value] as any);
        if (isValid && value < 2) {
            setValue((prev) => prev + 1);
        } else {
            await focusOnErrorTab();
        }
    };


    const onSubmit = async (data: any) => {
        const isValid = await methods.trigger();
        if (!isValid) {
            await focusOnErrorTab();
            return;
        }
        try {
            await createCompany(data).unwrap()
            methods.clearErrors()
            methods.reset()
        } catch (error) {
            console.error('Erro ao salvar:', error);
        }
    };

    const hasTabError = (tabIndex: number) => {
        return tabFields[tabIndex].some((field) => {
            const parts = field.split('.');
            let errorObj: any = methods.formState.errors;

            for (const part of parts) {
                errorObj = errorObj?.[part];
                if (!errorObj) break;
            }

            return !!errorObj;
        });
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab
                        label={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                Dados da Empresa
                                {hasTabError(0) && <ErrorIcon color="error" sx={{ ml: 1 }} />}
                            </div>
                        }
                        {...a11yProps(0)}
                    />
                    <Tab
                        label={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                Endereço
                                {hasTabError(1) && <ErrorIcon color="error" sx={{ ml: 1 }} />}
                            </div>
                        }
                        {...a11yProps(1)}
                    />
                    <Tab
                        label={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                NFE
                                {hasTabError(2) && <ErrorIcon color="error" sx={{ ml: 1 }} />}
                            </div>
                        }
                        {...a11yProps(2)}
                    />
                </Tabs>
            </Box>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <CustomTabPanel value={value} index={0}>
                        <DadosForm />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <EnderecoForm />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <NfeForm />
                    </CustomTabPanel>
                    <Box display='flex' justifyContent='flex-end' gap={2}>
                        <Button
                            onClick={handleNext}
                            variant="contained"
                            type="button"
                            color="success"
                        >
                            Avançar
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                        >
                            Salvar
                        </Button>
                    </Box>
                </form>
            </FormProvider>
        </Box>
    );
};

export default Company;
