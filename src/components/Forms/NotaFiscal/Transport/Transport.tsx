import { useState } from "react";
import ModalCadastroModal from "../Product/ModalCadastroProduto";
import { Box, Button, Container, Divider, FormControl, FormHelperText, FormLabel, Grid2, MenuItem, Select, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
const modalidade: Array<{ id: number, nome: string }> = [
    { id: 1, nome: 'Sem Ocorrência de Transporte', },
    { id: 2, nome: 'Contratação do Frete por conta do Remetente (CIF)', },
    { id: 3, nome: 'Contratação do Frete por conta de Terceiros', },
    { id: 4, nome: 'Tranporte Próprio por conta do Remetente', },
    { id: 5, nome: 'Transporte Próprio por conta do Destinatário', },
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
        .required("Peso Bruto é obrigatório.")
})


const TransportForm = () => {
    const { handleSubmit, control, formState: { errors }, watch } = useForm({
        resolver: yupResolver(transporteSchema),
    })

    const [openModal, setOpenModal] = useState(false)
    const [quantidade, setQuantidade] = useState("")
    function handleClickOpenModal() {
        setOpenModal(true)
    }
    function handleClickCloseModal() {
        setOpenModal(false)
    }
    console.log(watch("modalidadeFrete"))
    return (
        <Container>
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
                                 <Divider/>
                                <Select
                                    sx={{ mt:1, mb:1 }}
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
                <Divider/>
            </Grid2>
            <Box sx={{ bgcolor: "#cecece", padding: "6px", display: "flex", alignItems: "center", gap: 1 }}>
                <Typography color="textSecondary" fontWeight={"700"} variant="body2" >TRANSPORTADOR <Button sx={{paddingY:"5px"}} disableElevation variant="contained">Selecionar</Button></Typography>
            </Box>
{/*             Tranporte*/}
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
                                 <Divider/>
                                <Select
                                    sx={{ mt:1, mb:1 }}
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
                <Divider/>
            </Grid2>
           
        </Container>
    )
}

export default TransportForm