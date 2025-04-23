import { IMaskInput } from 'react-imask';
import { Controller, useFormContext } from "react-hook-form";
import { Box, Button, FormControl, FormHelperText, FormLabel, Grid2, MenuItem, Select, TextField } from "@mui/material"
import React from 'react';
import { useLazyGetEmpresaQuery } from '@/features/nuvem/nuvemApiSlice';
import Search from '@mui/icons-material/Search';

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
    const { control, getValues, setError, setValue } = useFormContext()
    const [triggerGetEmpresa, { isLoading }] = useLazyGetEmpresaQuery();

    const handleSearchCompany = async () => {
        const cnpj = getValues('cnpj').replace(/\D/g, '')
        try {
            const response = await triggerGetEmpresa(cnpj).unwrap()
            if (response) {
                const phoneFormated = `(${response.telefones[0].ddd}) ${response.telefones[0].numero}`
                setValue('nomePopular', response.nome_fantasia)
                setValue('razaoSocial', response.razao_social)
                setValue('email', response.email)
                setValue('telefone', phoneFormated)
                setValue('cnaePrincipal', response.atividade_principal.codigo)
                setValue('regimeTributario', response.simples.optante ? 1 : 3)
                setValue('ambiente', 'producao')
                if (response.endereco) {
                    setValue('address.logradouro', response.endereco.logradouro)
                    setValue('address.numero', response.endereco.numero)
                    setValue('address.bairro', response.endereco.bairro)
                    setValue('address.uf', response.endereco.uf)
                    setValue('address.municipio', response.endereco.descricao)
                    setValue('address.cep', response.endereco.cep)
                    setValue('address.codigo_municipio', response.endereco.municipio.codigo_ibge)

                }
            }
        } catch (ex: any) {
            if (ex.status == 400) {
                setError('info.cnpj', { message: 'CNPJ Invalido!.', type: 'onBlur' })
                return
            }
            setError('info.cnpj', { message: 'Erro desconhecido. Verifique os dados e tente novamente.', type: 'onBlur' })
            return

        }
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Grid2 container spacing={2}>
                <Grid2 size={6}>
                    <Controller
                        control={control}
                        name="cnpj"
                        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                            <FormControl fullWidth sx={{ display: 'flex', justifyContent: 'center' }} error={!!error}>
                                <FormLabel component="legend" >
                                    CNPJ*
                                </FormLabel>
                                <Box display="flex" gap={2} alignItems="flex-start">
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        value={value || ""}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        error={!!error}
                                        placeholder="00.000.000/0000-00"
                                        InputProps={{
                                            inputComponent: TextMaskCustom as any,
                                            inputProps: {
                                                'aria-label': 'Insira o CNPJ da empresa',
                                                autoComplete: 'off'
                                            }
                                        }}

                                    />

                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSearchCompany}
                                        disabled={!value || !!error || isLoading}
                                        startIcon={<Search />}
                                        sx={{
                                            minWidth: 120,
                                            height: 40,
                                            alignSelf: 'flex-end'
                                        }}
                                    >
                                        Buscar
                                    </Button>
                                </Box>
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
                        name="nomePopular"
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
                <Grid2 size={6}>
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
                        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                            <FormControl fullWidth size="small">
                                <FormLabel>CNAE Principal*</FormLabel>
                                <TextField
                                    size="small"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={!!error}
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
            </Grid2>
        </Box>
    )
}

export default DadosForm