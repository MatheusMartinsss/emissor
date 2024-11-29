import { useState } from "react";
import ModalCadastroModal from "../Product/ModalCadastroProduto";
import { Box, Button, Container, Divider, FormControl, FormHelperText, FormLabel, Grid2, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Search, Shuffle } from "@mui/icons-material";
import ModalCadastroEmpresa from "./ModalCadastroEmpresa";
const modalidade: Array<{ id: number, nome: string }> = [
    { id: 1, nome: 'Sem Ocorrência de Transporte', },
    { id: 2, nome: 'Contratação do Frete por conta do Remetente (CIF)', },
    { id: 3, nome: 'Contratação do Frete por conta de Terceiros', },
    { id: 4, nome: 'Tranporte Próprio por conta do Remetente', },
    { id: 5, nome: 'Transporte Próprio por conta do Destinatário', },
]

const ufs: Array<{ id: string, nome: string }> = [
    { id: "SP", nome: 'São paulo', },
    { id: "RJ", nome: 'Rio de Janeiro', },
]

const transporteSchema = yup.object().shape({
    modalidadeFrete: yup
        .string()
        .required("A modalidade de frete é obrigatória."),
    nomeRazaoSocial: yup
        .string()
        .required("O campo Nome/Razão Social é obrigatório."),
    inscricaoEstadual: yup
        .string()
        .required("Campo obrigatório"), // Caso seja opcional
    enderecoCompleto: yup
        .string()
        .required("O endereço completo é obrigatório."),
    municipio: yup
        .string()
        .required("O município é obrigatório."),
    uf: yup
        .string()
        .required("UF é obrigatório."),
    quantidade: yup
        .string().transform(Number)
        .required("Quantidade é obrigatória."),
    especie: yup
        .string()
        .required("Espécie é obrigatória."),
    marca: yup
        .string(),
    numeracao: yup
        .string(),
    pesoLiquido: yup
        .string()
        .required("Peso Líquido é obrigatório."),
    pesoBruto: yup
        .string()
        .required("Peso Bruto é obrigatório."),
    cpf: yup.string().required("Campo obrigatório")
})


const TransportForm = () => {
    const { handleSubmit, control, formState: { errors }, watch } = useForm({
        resolver: yupResolver(transporteSchema),
    })
 
    const [openModalEmpresa, setOpenModalEmpresa] = useState(false)
    function handleCloseModalEmpresa() {
        setOpenModalEmpresa(false)
    }
    function handleOpenModalEmpresa() {
        setOpenModalEmpresa(true)
    }
    console.log(watch())
    return (
        <Container>
              {/*dados do Tranporte*/}
            <Box sx={{ bgcolor: "#cecece", padding: "6px", display: "flex", alignItems: "center", gap: 1 }}>
                <Typography color="textSecondary" fontWeight={"700"} variant="body2" >DADOS DO TRANSPORTE</Typography>
            </Box>
            <Grid2 container>
                <Grid2 size={4}>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="modalidadeFrete"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {

                            return (
                                <FormControl fullWidth size="small">
                                    <Typography color="textSecondary" mt={1} mb={1} fontWeight={"700"} variant="body2" >Modalidade de Transporte</Typography>
                                    <Select
                                        sx={{ mt: 1, mb: 1 }}
                                        error={!!error}
                                        autoFocus
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        inputProps={{
                                            name: 'modalidadeFrete',
                                        }}>
                                        {modalidade.map((origem) => (
                                            <MenuItem key={origem.id} value={origem.id}>{origem.nome}</MenuItem>
                                        ))}
                                    </Select>
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )
                        }}
                    />
                </Grid2>
            </Grid2>

            {/*Tranporte*/}
            <Box sx={{ bgcolor: "#cecece", padding: "6px", display: "flex", alignItems: "center", gap: 1 }}>
                <Typography color="textSecondary" fontWeight={"700"} variant="body2" >TRANSPORTADOR <Button sx={{ paddingY: "5px" }} disableElevation variant="contained">Selecionar</Button></Typography>
            </Box>

            <Grid2 container sx={{ mt: 1 }} justifyContent={"space-between"} >
                <Grid2 size={4}>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="cpf"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                            return (
                                <FormControl fullWidth size="small" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Typography color="textSecondary" fontWeight={"700"} variant="body2" >CNPJ/CPF</Typography>
                                    <Stack direction="row" spacing={1} alignItems={"center"} justifyContent={"space-between"}>
                                        <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} error={!!error} />
                                        <Button variant="contained" onClick={() => handleOpenModalEmpresa()}><Search /> Buscar</Button>
                                    </Stack>
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )
                        }}
                    />
                </Grid2>
                <Grid2 size={5}>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="nomeRazaoSocial"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                            return (
                                <FormControl fullWidth size="small" sx={{ display: "flex", flexDirection: "column", gap: 1, padding: 0 }}>
                                    <Typography color="textSecondary" fontWeight={"700"} variant="body2" >Nome / Razão Social</Typography>
                                    <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} error={!!error} />
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )
                        }}
                    />
                </Grid2>

                <Grid2 size={2}>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="inscricaoEstadual"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                            return (
                                <FormControl fullWidth size="small" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Typography color="textSecondary" fontWeight={"700"} variant="body2" >Inscrição Estadual</Typography>
                                    <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} error={!!error} />

                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )
                        }}
                    />
                </Grid2>

            </Grid2>
            <Grid2 alignItems={"center"} justifyContent={"space-between"} container sx={{ mt: 1, mb: 1 }} gap={1}>
                <Grid2 size={6}>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="enderecoCompleto"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                            return (
                                <FormControl fullWidth size="small" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Typography color="textSecondary" fontWeight={"700"} variant="body2">Endereço Completo</Typography>
                                    <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} error={!!error} />
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )
                        }}
                    />
                </Grid2>
                <Grid2 size={3}>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="municipio"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                            return (
                                <FormControl fullWidth size="small" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Typography color="textSecondary" fontWeight={"700"} variant="body2" >Municipio</Typography>
                                    <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} error={!!error} />
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )
                        }}
                    />
                </Grid2>
                <Grid2 size={2} >
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="uf"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                            return (
                                <FormControl fullWidth size="small" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Typography color="textSecondary" fontWeight={"700"} variant="body2">UF</Typography>
                                    <Select

                                        error={!!error}
                                        autoFocus
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        inputProps={{
                                            name: 'modalidadeFrete',
                                        }}>
                                        {ufs.map((uf) => (
                                            <MenuItem key={uf.id} value={uf.id}>{uf.nome}</MenuItem>
                                        ))}
                                    </Select>
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )
                        }}
                    />
                </Grid2>

            </Grid2>

            {/*Volumes*/}
            <Box bgcolor={grey[300]}sx={{padding: "6px", display: "flex", alignItems: "center", gap: 1 }}>
                <Typography color="textSecondary" fontWeight={"700"} variant="body2" >VOLUMES</Typography>
            </Box>
            <Grid2 container sx={{ mt: 1 }} gap={1} justifyContent={"space-between"}>
                <Grid2 size={1}>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="quantidade"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                            return (
                                <FormControl fullWidth size="small" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Typography color="textSecondary" fontWeight={"700"} variant="body2" >Quantidade</Typography>
                                    <TextField type="number" size="small" onChange={onChange} onBlur={onBlur} value={value} error={!!error} />
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )
                        }}
                    />
                </Grid2>
                <Grid2 size={2}>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="especie"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                            return (
                                <FormControl fullWidth size="small" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Typography color="textSecondary" fontWeight={"700"} variant="body2" >Espécie</Typography>
                                    <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} error={!!error} />
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )
                        }}
                    />
                </Grid2>
                <Grid2 size={2}>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="marca"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                            return (
                                <FormControl fullWidth size="small" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Typography color="textSecondary" fontWeight={"700"} variant="body2" >Marca</Typography>
                                    <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} error={!!error} />
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )
                        }}
                    />
                </Grid2>
                <Grid2 size={2}>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="numeracao"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                            return (
                                <FormControl fullWidth size="small" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Typography color="textSecondary" fontWeight={"700"} variant="body2" >Numeração</Typography>
                                    <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} error={!!error} />
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )
                        }}
                    />
                </Grid2>
                <Grid2 size={2}>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="pesoLiquido"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                            return (
                                <FormControl fullWidth size="small" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Typography color="textSecondary" fontWeight={"700"} variant="body2" >Peso Líquido</Typography>
                                    <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} error={!!error} />
                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )
                        }}
                    />
                </Grid2>
                <Grid2 size={2}>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="pesoBruto"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                            return (
                                <FormControl fullWidth size="small" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Typography color="textSecondary" fontWeight={"700"} variant="body2" >Peso Bruto</Typography>
                                    <TextField size="small" onChange={onChange} onBlur={onBlur} value={value} error={!!error} />

                                    {error && <FormHelperText >{error.message}</FormHelperText>}
                                </FormControl>
                            )
                        }}
                    />
                </Grid2>
            </Grid2>

        <ModalCadastroEmpresa open={openModalEmpresa} handleClose={handleCloseModalEmpresa} />
        </Container>
    )
}

export default TransportForm