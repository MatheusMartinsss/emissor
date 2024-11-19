import { Autocomplete, Box, Button, Container, FormControl, FormHelperText, FormLabel, Grid2, MenuItem, Select, Stack, styled, Switch, TextField } from "@mui/material"
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { CNPJMaskCustom, CPFMaskCustom } from "./MaskInput";
import Search from '@mui/icons-material/Search';

const schema = yup.object({
    cnpj: yup.string().required('Campo obrigatório'),
    ieEstadual: yup.string(),
    ieMunicipal: yup.string(),
    razaoSocial: yup.string().required('Campo obrigatório').min(12, 'Minimo 12 caracteres').max(128),
    nomeFantasia: yup.string().required('Campo obrigatório').min(12, 'Minimo 12 caracteres').max(128),
    email: yup.string().email().required('Campo obrigatório'),
    telefone: yup.string(),
    indicadorIE: yup.number().required('Campo obrigatório').oneOf([1, 2, 3, 4]),
    cep: yup.string().required('Campo obrigatório'),
    logradouro: yup.string().required('Campo obrigatório'),
    complemento: yup.string(),
    numero: yup.string(),
    bairro: yup.string(),
    estado: yup.string().required('Campo obrigatório'),
    cidade: yup.string().required('Campo obrigatório'),
})



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
enum IndicadorIE {
    contribuente = 1,
    nContribuente = 2,
    isento = 3
}

const DestinatarioForm = () => {
    const [tipoChecked, setTipoChecked] = useState<boolean>(true)
    const { handleSubmit, control, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            cnpj: '',
            email: '',
            ieEstadual: '',
            ieMunicipal: '',
            nomeFantasia: '',
            razaoSocial: '',
            telefone: '',
            indicadorIE: 1,
            numero: '',
            cep: '',
            logradouro: '',
            complemento: '',
            bairro: '',
            estado: '',
            cidade: ''
        }
    })
    const onSubmit = (data) => {
        console.log(data)
    }
    const handleSwitch = () => {
        setTipoChecked((state) => !state)
    }

    const estadoMockup = ["São Paulo", 'Rio de Janeiro', 'Rio Grande do Sul', 'BH'];
    const cidadesMockup = ["Santa Catarina", 'Osasco', 'ES'];

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2 container spacing={2}>
                    <Grid2 size={12}>
                        <FormControl fullWidth>
                            <Box display='flex' justifyContent='' gap={1}>
                                <FormLabel>Pessoa Fisica</FormLabel>
                                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                    <AntSwitch checked={tipoChecked} onChange={handleSwitch} inputProps={{ 'aria-label': 'ant design' }} />
                                </Stack>
                            </Box>


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
                                    <Box gap={1} display={"flex"} alignItems={"center"} justifyContent={"start"}>
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
                                        <Button variant="contained" sx={{
                                            fontSize: "10px",
                                            display: "flex",
                                            alignItems: "center", // Alinha o ícone e o texto verticalmente
                                            gap: 1 // Adiciona um espaço entre o texto e o ícone
                                        }}>Buscar <Search />
                                        </Button>
                                    </Box>
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </Grid2>
                    <Grid2 size={8}>
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


                    <Grid2 size={4}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            name="indicadorIE"
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Indicador IE</FormLabel>
                                    <Select onChange={onChange} value={value} error={!!error} >
                                        <MenuItem value={IndicadorIE.contribuente}>Contribuinte</MenuItem>
                                        <MenuItem value={IndicadorIE.isento}>Contribuinte Insento</MenuItem>
                                        <MenuItem value={IndicadorIE.nContribuente}>Não Contribuinte</MenuItem>
                                    </Select>
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </Grid2>
                    <Grid2 size={8}></Grid2>
                    <Grid2 size={6}>
                        <Controller
                            control={control}
                            rules={{
                                required: getValues('indicadorIE') === IndicadorIE.contribuente
                            }}
                            name="ieEstadual"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {

                                return (
                                    <FormControl fullWidth size="small">
                                        <FormLabel>Inscrição Estadual*</FormLabel>
                                        <TextField
                                            disabled={getValues('indicadorIE') == IndicadorIE.nContribuente}
                                            size="small" onChange={onChange} onBlur={onBlur}
                                            value={getValues('indicadorIE') == IndicadorIE.isento ? "INSENTO" : value} error={!!error} />
                                        {getValues('indicadorIE') == IndicadorIE.contribuente && <FormHelperText >Campo obrigatório</FormHelperText>}
                                    </FormControl>
                                )
                            }}
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
                    <Grid2 size={4}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            name="cep"
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <FormControl fullWidth>
                                    <FormLabel>CEP</FormLabel>
                                    <Box gap={1} display={"flex"} alignItems={"center"} justifyContent={"start"}>
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
                                        <Button variant="contained" sx={{
                                            fontSize: "10px",
                                            display: "flex",
                                            alignItems: "center", // Alinha o ícone e o texto verticalmente
                                            gap: 1 // Adiciona um espaço entre o texto e o ícone
                                        }}>Buscar<Search />
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
                            name="logradouro"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Logradouro*</FormLabel>
                                    <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} error={!!error} />
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </Grid2>
                    <Grid2 size={2}>
                        <Controller
                            control={control}
                            name="numero"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Numero*</FormLabel>
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
                            name="bairro"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Bairro</FormLabel>
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
                            name="complemento"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Complemennto</FormLabel>
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
                            name="estado"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Estado</FormLabel>
                                    <Autocomplete
                                        onChange={(event, value) => onChange(value)}
                                        value={value}

                                        options={estadoMockup} // Lista de opções
                                        renderInput={(params) => <TextField {...params} size="small" label="" />} // Renderiza o TextField com label
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
                            name="cidade"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <FormControl fullWidth >
                                    <FormLabel>Cidade</FormLabel>
                                    <Autocomplete
                                        onChange={(event, value) => onChange(value)}
                                        value={value}
                                        disablePortal
                                        options={cidadesMockup} // Lista de opções
                                        renderInput={(params) => <TextField {...params} size="small" label="" />} // Renderiza o TextField com label
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
        </Container>
    )
}

export default DestinatarioForm