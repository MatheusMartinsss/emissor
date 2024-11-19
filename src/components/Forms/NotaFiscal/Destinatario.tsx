import { Autocomplete, Box, Button, Container, FormControl, FormHelperText, FormLabel, Grid2, MenuItem, Select, Stack, styled, Switch, SwitchProps, TextField, Typography } from "@mui/material"
import React, { ChangeEvent, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { CEPMaskCustom, CNPJMaskCustom, CPFMaskCustom } from "./MaskInput";
import Search from '@mui/icons-material/Search';

const schema = yup.object({
    cnpj: yup.string().required('Campo obrigatório'),
    ieEstadual: yup.string(),
    ieMunicipal: yup.string(),
    razaoSocial: yup.string().required('Campo obrigatório').min(12, 'Minimo 12 caracteres').max(128),
    nomeFantasia: yup.string().required('Campo obrigatório').min(12, 'Minimo 12 caracteres').max(128),
    cnaePrincipal: yup.string().required('Campo obrigatório'),
    regimeTributario: yup.number().required('Campo obrigatório').oneOf([1, 2, 3, 4]),
    ambiente: yup.string().required().oneOf(['producao', 'homologacao'], 'Selecione uma opção'),
    email: yup.string().email().required('Campo obrigatório'),
    telefone: yup.string(),//required('Campo obrigatório'),
    indicadorIE: yup.string().required('Campo obrigatório'),
    cep: yup.string().required('Campo obrigatório'),
    logradouro: yup.string().required('Campo obrigatório'),
    complemento: yup.string(),
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

const DestinatarioForm = () => {
    const [tipoChecked, setTipoChecked] = useState<boolean>(true)
    const { handleSubmit, control,getValues,watch, formState:{errors} } = useForm({
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
            telefone: '',
            indicadorIE: '',
            cep: '',
            logradouro: '',
            complemento: '',
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
    
    console.log(getValues())
    console.log(watch("indicadorIE"))
    console.log(errors)
    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2 container spacing={2}>
                    <Grid2 size={12}>
                        <FormControl fullWidth>
                            <Box  display='flex' justifyContent='' gap={1}>
                                <FormLabel>Pessoa Fisica</FormLabel>
                                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                    <AntSwitch checked={tipoChecked} onChange={handleSwitch} inputProps={{ 'aria-label': 'ant design' }} />                       
                                </Stack>
                                </Box>
                            
                             
                            
                        </FormControl>
                    </Grid2>

                    <Grid2 size={6}>
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
                                                    inputComponent: tipoChecked ? CPFMaskCustom as any: CNPJMaskCustom as any
                                                }
                                            }}
                                        />
                                        <Button variant="contained"  sx={{ 
                                                                        fontSize: "10px", 
                                                                        display: "flex", 
                                                                        alignItems: "center", // Alinha o ícone e o texto verticalmente
                                                                        gap: 1 // Adiciona um espaço entre o texto e o ícone
                                                                    }}>Buscar <Search/>
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
                                                    inputComponent: tipoChecked ? CPFMaskCustom as any: CNPJMaskCustom as any
                                                }
                                            }}
                                        />
                                        <Button variant="contained"  sx={{ 
                                                                        fontSize: "10px", 
                                                                        display: "flex", 
                                                                        alignItems: "center", // Alinha o ícone e o texto verticalmente
                                                                        gap: 1 // Adiciona um espaço entre o texto e o ícone
                                                                    }}>Buscar<Search/>
                                        </Button>
                                    </Box>              
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
                                        <MenuItem value='Contribuinte'>Contribuinte</MenuItem>
                                        <MenuItem value='Contribuinte Insento'>Contribuinte Insento</MenuItem>
                                        <MenuItem value='Não Contribuinte'>Não Contribuinte</MenuItem>
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
                                required: getValues("indicadorIE") === 'Contribuinte'
                            }}
                            name="ieEstadual"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Inscrição Estadual*</FormLabel>
                                    <TextField   disabled={getValues("indicadorIE") === "Não Contribuinte" || getValues("indicadorIE") === "Contribuinte Insento"}  size="small" onChange={onChange} onBlur={onBlur} value={getValues("indicadorIE") === "Contribuinte Insento" ? "INSENTO" : value} error={!!error} />
                                    {getValues("indicadorIE") === 'Contribuinte'  && <FormHelperText >Campo obrigatório</FormHelperText>}
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
                            name="logradouro"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Logradouro*</FormLabel>
                                    <TextField     size="small" onChange={onChange} onBlur={onBlur} value={value} error={!!error} />
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
                    <Grid2 size={4}>
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
                                        renderInput={(params) => <TextField {...params} label="" />} // Renderiza o TextField com label
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
                            name="cidade"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Cidade</FormLabel>
                                    <Autocomplete
                                    onChange={(event, value) => onChange(value)}
                                    value={value}
                                        disablePortal
                                        options={cidadesMockup} // Lista de opções
                                        renderInput={(params) => <TextField {...params} label="" />} // Renderiza o TextField com label
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
                                    <Select onChange={onChange} value={value}  error={!!error} >
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
                                    <Select  error={!!error} onChange={onChange} value={value} >
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