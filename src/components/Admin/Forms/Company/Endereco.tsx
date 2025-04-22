import { IMaskInput } from 'react-imask';
import { Controller, useFormContext } from "react-hook-form";
import { Box, Button, FormControl, FormHelperText, FormLabel, Grid2, MenuItem, Select, TextField } from "@mui/material"
import React, { useEffect } from 'react';
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';

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
    const { control, setValue, watch } = useFormContext()
    const selectedState = watch('address.uf')
    const codigoMun = watch('address.codigo_municipio')

    const fetchStates = async () => {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
        return response.data
    }
    const fetchCities = async (uf: string) => {
        if (!uf) return
        const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
        return response.data
    }
    const { data: states = [], isLoading: isLoadingStates } = useQuery({
        queryKey: ['state'],
        queryFn: fetchStates,
        select: (data) => data.map((state: any) => ({
            sigla: state.sigla,
            nome: state.nome
        }))
    })

    const { data: cities = [], isLoading: isLoadingCities } = useQuery({
        queryKey: ['cities', selectedState],
        queryFn: () => fetchCities(selectedState),
        enabled: !!selectedState,
        select: (data) => data.map((city: any) => ({
            id: city.id,
            nome: city.nome
        }))
    })

    useEffect(() => {
        if (codigoMun) {
            const citie = cities.find((citie: any) => citie.id == codigoMun)
            if (citie) {
                setValue('address.cidade', citie.nome)
                setValue('address.municipio', citie.nome)
            }
        }
    }, [codigoMun])

    return (
        <Box sx={{ width: '100%' }}>
            <Grid2 container spacing={2}>
                <Grid2 size={2}>
                    <Controller
                        control={control}
                        rules={{
                            required: true
                        }}
                        name="address.cep"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <FormControl fullWidth size="small">
                                <FormLabel>CEP</FormLabel>
                                <TextField
                                    size="small"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    error={!!error}
                                    value={value}
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
                <Grid2 size={6}>
                    <Controller
                        control={control}
                        rules={{
                            required: true
                        }}
                        name="address.logradouro"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <FormControl fullWidth>
                                <FormLabel>Logradouro*</FormLabel>
                                <TextField
                                    size='small'
                                    error={!!error}
                                    onChange={onChange} value={value}

                                />
                                {error && <FormHelperText >{error.message}</FormHelperText>}
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
                        name="address.numero"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <FormControl fullWidth size="small">
                                <FormLabel>Numero*</FormLabel>
                                <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} />
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
                        name="address.complemento"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <FormControl fullWidth size="small">
                                <FormLabel>Complemento*</FormLabel>
                                <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} />
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
                        name="address.bairro"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <FormControl fullWidth size="small">
                                <FormLabel>Bairro*</FormLabel>
                                <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} />
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
                        name="address.uf"
                        render={({ field, fieldState: { error } }) => (
                            <FormControl fullWidth size="small">
                                <FormLabel>Estado*</FormLabel>
                                <Select
                                    {...field}
                                    error={!!error}
                                    disabled={isLoadingStates}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setValue('address.cidade', '');
                                    }}
                                    value={field.value || ''}
                                >
                                    {isLoadingStates && <MenuItem>Carregando estados...</MenuItem>}
                                    {states.map((state: { sigla: string; nome: string }) => (
                                        <MenuItem key={state.sigla} value={state.sigla}>
                                            {state.nome}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {error && <FormHelperText >{error.message}</FormHelperText>}
                            </FormControl>
                        )}
                    />
                </Grid2>
                <Grid2 size={4}>
                    <Controller
                        control={control}
                        name="address.codigo_municipio"
                        rules={{ required: true }}
                        render={({ field, fieldState: { error } },) => (
                            <FormControl error={!!error} fullWidth size="small">
                                <FormLabel>Cidade*</FormLabel>
                                <Select
                                    {...field}
                                    value={field.value || ''}
                                    disabled={!selectedState || isLoadingCities || isLoadingStates}
                                    error={!!error}
                                >

                                    {cities.map((city: { id: number; nome: string }) => (
                                        <MenuItem key={city.id} value={city.id}>
                                            {city.nome}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {error && <FormHelperText >{error.message}</FormHelperText>}
                            </FormControl>
                        )}
                    />
                </Grid2>
            </Grid2>
        </Box>
    )
}

export default EnderecoForm