import { IMaskInput } from 'react-imask';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, Button, FormControl, FormHelperText, FormLabel, Grid2, MenuItem, Select, Stack, styled, Switch, TextField } from "@mui/material"
import React, { useState } from 'react';
import { CNPJMaskCustom, CPFMaskCustom } from '../NotaFiscal/MaskInput';


const schema = yup.object({
    cnpj: yup.string().required('Campo obrigatório'),
    ieEstadual: yup.string().required('Campo obrigatório'),
    ieMunicipal: yup.string(),
    razaoSocial: yup.string().required('Campo obrigatório').min(12, 'Minimo 12 caracteres').max(128),
    nomeFantasia: yup.string().required('Campo obrigatório').min(12, 'Minimo 12 caracteres').max(128),
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
            cnpj: '',
            email: '',
            ieEstadual: '',
            ieMunicipal: '',
            nomeFantasia: '',
            razaoSocial: '',
            telefone: ''
        }
    })
    const onSubmit = (data) => {
        console.log(data)
    }

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
    const [tipoChecked, setTipoChecked] = useState<boolean>(true)

    const handleSwitch = () => {
        setTipoChecked((state) => !state)
    }
    return (
        <Box sx={{ width: '100%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2 container spacing={2}>
                    <Grid2 size={12}>
                        <FormControl >
                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                <FormLabel>Pessoa Fisica</FormLabel>
                                <AntSwitch checked={tipoChecked} onChange={handleSwitch} inputProps={{ 'aria-label': 'ant design' }} />
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
                                    <FormLabel>CNPJ*</FormLabel>
                                    <TextField
                                        size='small'
                                        onChange={onChange} value={value}
                                        error={!!error}
                                        slotProps={{
                                            input: {
                                                inputComponent: tipoChecked ? CPFMaskCustom as any : CNPJMaskCustom as any
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

                    <Grid2 size={12} display='flex' flexDirection='row' justifyContent='flex-end'>
                        <Button variant="contained" type="submit" color="success">Salvar</Button>
                    </Grid2>
                </Grid2>
            </form>
        </Box>
    )
}

export default DadosForm