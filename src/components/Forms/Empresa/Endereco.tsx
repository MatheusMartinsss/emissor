import { IMaskInput } from 'react-imask';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, Button, FormControl, FormLabel, Grid2, MenuItem, Select, TextField } from "@mui/material"
import React from 'react';


const schema = yup.object({
    logradouro: yup.string().required(),
    numero: yup.string().required(),
    complemento: yup.string(),
    bairro: yup.string().required().min(12).max(128),
    codigo_municipio: yup.string(),
    cidade: yup.string().required(),
    uf: yup.number().required(),
    codigo_pais: yup.string().required(),
    pais: yup.string().email(),
    cep: yup.string().required()
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
                mask="##.###-###"
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

const EnderecoForm = () => {
    const { handleSubmit, control } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <Box sx={{ width: '100%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2 container spacing={2}>
                    <Grid2 size={2}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            name="cep"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>CEP</FormLabel>
                                    <TextField
                                        size="small"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        slotProps={{
                                            input: {
                                                inputComponent: TextMaskCustom as any
                                            }
                                        }}
                                    />
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
                            name="logradouro"
                            render={({ field: { onChange,  value } }) => (
                                <FormControl fullWidth>
                                    <FormLabel>Logradouro*</FormLabel>
                                    <TextField
                                        size='small'
                                        onChange={onChange} value={value}

                                    />

                                </FormControl>
                            )}
                        />
                    </Grid2>
                    <Grid2 size={2}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            name="numero"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Numero*</FormLabel>
                                    <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} />
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
                            name="complemento"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Complemento*</FormLabel>
                                    <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} />
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
                            name="bairro"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Bairro*</FormLabel>
                                    <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} />
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
                            name="cidade"
                            render={({ field: { onChange, value } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Cidade*</FormLabel>
                                    <Select onChange={onChange} value={value} >
                                        <MenuItem value='producao'>Produção</MenuItem>
                                        <MenuItem value='homologacao'>Homologação</MenuItem>
                                    </Select>
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
                            name="uf"
                            render={({ field: { onChange, value } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Estado*</FormLabel>
                                    <Select onChange={onChange} value={value} >
                                        <MenuItem value='producao'>Produção</MenuItem>
                                        <MenuItem value='homologacao'>Homologação</MenuItem>
                                    </Select>
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
                            name="pais"
                            render={({ field: { onChange, value } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Pais</FormLabel>
                                    <Select onChange={onChange} value={value} >
                                        <MenuItem value={1}>Simples Nacional</MenuItem>
                                        <MenuItem value={2}>Simples Nacional – excesso de sublimite de receita bruta</MenuItem>
                                        <MenuItem value={3}>Regime Normal</MenuItem>
                                        <MenuItem value={4}>Simples Nacional - Microempreendedor individual (MEI)</MenuItem>
                                    </Select>
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

export default EnderecoForm