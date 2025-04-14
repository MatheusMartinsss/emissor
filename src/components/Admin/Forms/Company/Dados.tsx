import { IMaskInput } from 'react-imask';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, Button, FormControl, FormHelperText, FormLabel, Grid2, MenuItem, Select, TextField } from "@mui/material"
import React from 'react';


const schema = yup.object({
    cnpj: yup.string().required('Campo obrigatório'),
    ieEstadual: yup.string().required('Campo obrigatório'),
    ieMunicipal: yup.string(),
    razaoSocial: yup.string().required('Campo obrigatório').min(12, 'Minimo 12 caracteres').max(128),
    nomeFantasia: yup.string().required('Campo obrigatório').min(12, 'Minimo 12 caracteres').max(128),
    cnaePrincipal: yup.string().required('Campo obrigatório'),
    regimeTributario: yup.number().required('Campo obrigatório').oneOf([1, 2, 3, 4]),
    ambiente: yup.string().required().oneOf(['producao', 'homologacao']),
    email: yup.string().email().required('Campo obrigatório'),
    telefone: yup.string().required('Campo obrigatório')
})

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="##.###.###/####-##"
                definitions={{
                    '#': /[0-9]/,
                }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);
const TextMaskPhone = React.forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="(##)####-####"
                definitions={{
                    '#': /[0-9]/,
                }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

const DadosForm = () => {
    const { handleSubmit, control } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            ambiente: '',
            cnaePrincipal: '',
            cnpj: '',
            email: '',
            ieEstadual: '',
            ieMunicipal: '',
            nomeFantasia: '',
            razaoSocial: '',
            regimeTributario: 1,
            telefone: ''
        }
    })
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <Box sx={{ width: '100%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2 container spacing={2}>
                    <Grid2 size={4}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            name="cnpj"
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <FormControl fullWidth>
                                    <FormLabel>CNPJ*</FormLabel>
                                    <TextField
                                        size='small'
                                        onChange={onChange} value={value}
                                        error={!!error}
                                        slotProps={{
                                            input: {
                                                inputComponent: TextMaskCustom as any
                                            }
                                        }}
                                    />
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </Grid2>
                    <Grid2 size={4}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            name="ieEstadual"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Inscrição Estadual*</FormLabel>
                                    <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} error={!!error} />
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </Grid2>
                    <Grid2 size={4}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            name="ieMunicipal"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Inscrição Municipal</FormLabel>
                                    <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} error={!!error} />
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            name="razaoSocial"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Razão Social*</FormLabel>
                                    <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} error={!!error} />
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            name="nomeFantasia"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Nome Fantasia*</FormLabel>
                                    <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} error={!!error} />
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            name="email"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Email*</FormLabel>
                                    <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} error={!!error} />
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            name="telefone"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Telefone*</FormLabel>
                                    <TextField
                                        size="small"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        error={!!error}
                                        slotProps={{
                                            input: {
                                                inputComponent: TextMaskPhone as any
                                            }
                                        }}
                                    />
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </Grid2>
                    <Grid2 size={4}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            name="cnaePrincipal"
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>CNAE Principal*</FormLabel>
                                    <Select onChange={onChange} value={value} >
                                        <MenuItem value='producao'>Produção</MenuItem>
                                        <MenuItem value='homologacao'>Homologação</MenuItem>
                                    </Select>
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </Grid2>
                    <Grid2 size={4}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            name="regimeTributario"
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Regime Tributário</FormLabel>
                                    <Select onChange={onChange} value={value} >
                                        <MenuItem value={1}>Simples Nacional</MenuItem>
                                        <MenuItem value={2}>Simples Nacional – excesso de sublimite de receita bruta</MenuItem>
                                        <MenuItem value={3}>Regime Normal</MenuItem>
                                        <MenuItem value={4}>Simples Nacional - Microempreendedor individual (MEI)</MenuItem>
                                    </Select>
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </Grid2>
                    <Grid2 size={4}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            name="ambiente"
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Ambiente</FormLabel>
                                    <Select onChange={onChange} value={value} >
                                        <MenuItem value='producao'>Produção</MenuItem>
                                        <MenuItem value='homologacao'>Homologação</MenuItem>
                                    </Select>
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </Grid2>
                    <Grid2 size={12} display='flex' flexDirection='row' justifyContent='flex-end'>
                        <Button variant="contained" type="submit" color="success">Salvar</Button>
                    </Grid2>
                </Grid2>
            </form>
        </Box>
    )
}

export default DadosForm