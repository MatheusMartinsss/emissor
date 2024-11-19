import { Button, Container, FormControl, FormHelperText, FormLabel, Grid2, MenuItem, Select, Stack, styled, Switch, SwitchProps, TextField, Typography } from "@mui/material"
import React, { ChangeEvent, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}
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
const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#1890ff',
                ...theme.applyStyles('dark', {
                    backgroundColor: '#177ddc',
                }),
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
        ...theme.applyStyles('dark', {
            backgroundColor: 'rgba(255,255,255,.35)',
        }),
    },
}));

const DestinatarioForm = () => {
    const [tipoChecked, setTipoChecked] = useState<boolean>(true)
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
    const handleSwitch = () => {
        setTipoChecked((state) => !state)
    }
    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2 container spacing={2}>
                    <Grid2 size={12}>
                        <FormControl fullWidth>
                            <FormLabel>Tipo</FormLabel>
                            <Controller
                                control={control}
                                name='tipo'
                                render={({ field: { onChange, value }, fieldState: { error } }) =>(
                                    
                                )}
                            />
                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                <AntSwitch checked={tipoChecked} onChange={handleSwitch} inputProps={{ 'aria-label': 'ant design' }} />
                                <Typography>Fisica</Typography>
                            </Stack>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={4}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            name="cnpj"
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <FormControl fullWidth>
                                    <FormLabel>CNPJ/CPF*</FormLabel>
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
        </Container>
    )
}

export default DestinatarioForm