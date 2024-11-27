import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, FormLabel, Grid2, MenuItem, Select, TextField } from "@mui/material"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { ArrowBack } from "@mui/icons-material";

const schema = yup.object({

    cod_barra: yup.string().required('Campo obrigatório'),
    cod_produto: yup.string().required('Campo obrigatório'),
    nome: yup.string().required('Campo obrigatório'),
    unidade: yup.string().required('Campo obrigatório'),

    origem: yup.string().required('Campo obrigatório'),
    ncm: yup.string().required('Campo obrigatório'),
    cod_combustivel: yup.string().required('Campo obrigatório'),
    peso: yup.string().required('Campo obrigatório'),
    preco: yup.string().required('Campo obrigatório'),

    cest: yup.string().required('Campo obrigatório'),
    tributos: yup.string().required('Campo obrigatório'),
    cfop_interno: yup.string().required('Campo obrigatório'),
    cfop_externo: yup.string().required('Campo obrigatório'),
    cod_beneficio: yup.string().required('Campo obrigatório'),
    observacao: yup.string().default("")

})


// dados mockados
const origens: Array<{ id: number, nome: string }> = [{
    id: 0, nome: '0 - Nacional exceto as indicadas nos códigos 3 a 5',
}, {
    id: 1,
    nome: "1 - Estrangeira - Importação direta",
}, { id: 2, nome: "2 - Estrangeira - Adquirida no mercado interno", }
]
const codCombustivel: Array<{ id: number, nome: string }> = [{
    id: 0, nome: 'Comb 1',
}
]

const unidades: Array<{ id: string, nome: string }> = [{
    id: "UN", nome: 'UN - UNIDADE'
}, { id: "GM", nome: "GM - GRAMAS" }
]

const cests: Array<{ id: string, nome: string }> = [{
    id: "UN", nome: 'UN - UNIDADE'
}, { id: "GM", nome: "GM - GRAMAS" }
]

const tributos: Array<{ id: string, nome: string }> = [{
    id: "UN", nome: 'UN - UNIDADE'
}, { id: "GM", nome: "GM - GRAMAS" }
]

const cfopsInternos: Array<{ id: string, nome: string }> = [{
    id: "UN", nome: 'UN - UNIDADE'
}, { id: "GM", nome: "GM - GRAMAS" }
]

const cfopsExternos: Array<{ id: string, nome: string }> = [{
    id: "UN", nome: 'UN - UNIDADE'
}, { id: "GM", nome: "GM - GRAMAS" }
]

const ModalCadastroModal = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {

    const { handleSubmit, control, formState: { errors }, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            cod_barra: '',
            origem: '',
            ncm: '',
            cod_combustivel: '',
            peso: "",
            cod_produto: "",
            nome: '',
            unidade: '',
            preco: '',
        }
    })
    function onSubmit(data: any) {
        console.log(data)
    }
    watch()
    console.log(errors)
    return <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
    >
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle sx={{ fontWeight: 700 }}>Cadastrar produtos</DialogTitle>
            <Box sx={{ width: "100%", height: "4px", bgcolor: "blue" }} />
            <DialogContent>
                <Grid2 container spacing={2}>
                    <Grid2 size={2}>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name="cod_barra"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {

                                return (
                                    <FormControl fullWidth size="small">
                                        <FormLabel>Codigo de Barra</FormLabel>
                                        <TextField
                                            value={value}
                                            error={!!error}
                                            size="small" onChange={onChange} onBlur={onBlur}
                                        />
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
                            name="cod_produto"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {

                                return (
                                    <FormControl fullWidth size="small">
                                        <FormLabel>Cd. Produto na Nota</FormLabel>
                                        <TextField
                                            value={value} error={!!error}
                                            size="small" onChange={onChange} onBlur={onBlur}
                                        />
                                        {error && <FormHelperText >{error.message}</FormHelperText>}
                                    </FormControl>
                                )
                            }}
                        />
                    </Grid2>

                    <Grid2 size={4}>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name="nome"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {

                                return (
                                    <FormControl fullWidth size="small">
                                        <FormLabel>Nome do produto*</FormLabel>
                                        <TextField
                                            value={value} error={!!error}
                                            size="small" onChange={onChange} onBlur={onBlur}
                                        />
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
                            name="unidade"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {

                                return (
                                    <FormControl fullWidth size="small">
                                        <FormLabel>Unidade</FormLabel>
                                        <Select
                                            error={!!error}
                                            autoFocus
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            inputProps={{
                                                name: 'unidade',
                                            }}>
                                            {unidades.map((unidade) => (
                                                <MenuItem key={unidade.id} value={unidade.id}>{unidade.nome}</MenuItem>
                                            ))}
                                        </Select>
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
                            name="preco"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {

                                return (
                                    <FormControl fullWidth size="small">
                                        <FormLabel>Preco</FormLabel>
                                        <TextField
                                            value={value} error={!!error}
                                            type="number"
                                            size="small" onChange={onChange} onBlur={onBlur}
                                        />
                                        {error && <FormHelperText >{error.message}</FormHelperText>}
                                    </FormControl>
                                )
                            }}
                        />
                    </Grid2>

                </Grid2>

                {/* segunda linha */}
                <Grid2 container spacing={2}>
                    <Grid2 size={4}>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name="origem"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {

                                return (
                                    <FormControl fullWidth size="small">
                                        <FormLabel>Origem</FormLabel>
                                        <Select
                                            error={!!error}
                                            autoFocus
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            inputProps={{
                                                name: 'origem',
                                            }}>
                                            {origens.map((origem) => (
                                                <MenuItem key={origem.id} value={origem.id}>{origem.nome}</MenuItem>
                                            ))}
                                        </Select>
                                        {error && <FormHelperText >{error.message}</FormHelperText>}
                                    </FormControl>
                                )
                            }}
                        />
                    </Grid2>
                    <Grid2 size={4}>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name="ncm"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {

                                return (
                                    <FormControl fullWidth size="small">
                                        <FormLabel>NCM*</FormLabel>
                                        <TextField
                                            error={!!error}
                                            value={value}
                                            size="small" onChange={onChange} onBlur={onBlur}
                                        />
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
                            name="cod_combustivel"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {

                                return (
                                    <FormControl fullWidth size="small">
                                        <FormLabel>Cod. combustivel (ANP)</FormLabel>
                                        <Select
                                            error={!!error}
                                            autoFocus
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            inputProps={{
                                                name: 'cod_combustivel',
                                            }}>
                                            {codCombustivel.map((origem) => (
                                                <MenuItem key={origem.id} value={origem.id}>{origem.nome}</MenuItem>
                                            ))}
                                        </Select>
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
                            name="peso"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {

                                return (
                                    <FormControl fullWidth size="small">
                                        <FormLabel>Peso</FormLabel>
                                        <TextField
                                            value={value}
                                            size="small" onChange={onChange} onBlur={onBlur}
                                            error={!!error}
                                        />
                                        {error && <FormHelperText >{error.message}</FormHelperText>}
                                    </FormControl>
                                )
                            }}
                        />
                    </Grid2>


                </Grid2>


                {/* terceira linha */}
                <Grid2 container spacing={2}>
                    <Grid2 size={3}>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name="cest"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {

                                return (
                                    <FormControl fullWidth size="small">
                                        <FormLabel>CEST</FormLabel>
                                        <Select
                                            error={!!error}
                                            autoFocus
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            inputProps={{
                                                name: 'cest',
                                            }}>
                                            {cests.map((cest) => (
                                                <MenuItem key={cest.id} value={cest.id}>{cest.nome}</MenuItem>
                                            ))}
                                        </Select>
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
                            name="tributos"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {

                                return (
                                    <FormControl fullWidth size="small">
                                        <FormLabel>Grupo de Tributação</FormLabel>
                                        <Select
                                            error={!!error}
                                            autoFocus
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            inputProps={{
                                                name: 'tributos',
                                            }}>
                                            {tributos.map((tributo) => (
                                                <MenuItem key={tributo.id} value={tributo.id}>{tributo.nome}</MenuItem>
                                            ))}
                                        </Select>
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
                            name="cfop_interno"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {

                                return (
                                    <FormControl fullWidth size="small">
                                        <FormLabel>Grupo de Tributação</FormLabel>
                                        <Select
                                            error={!!error}
                                            autoFocus
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            inputProps={{
                                                name: 'cfop_interno',
                                            }}>
                                            {cfopsInternos.map((cfop) => (
                                                <MenuItem key={cfop.id} value={cfop.id}>{cfop.nome}</MenuItem>
                                            ))}
                                        </Select>
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
                            name="cfop_externo"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                                return (
                                    <FormControl fullWidth size="small">
                                        <FormLabel>Grupo de Tributação</FormLabel>
                                        <Select
                                            error={!!error}
                                            autoFocus
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            inputProps={{
                                                name: 'cfop_externo',

                                            }}>
                                            {cfopsExternos.map((cfop) => (
                                                <MenuItem key={cfop.id} value={cfop.id}>{cfop.nome}</MenuItem>
                                            ))}
                                        </Select>
                                        {error && <FormHelperText >{error.message}</FormHelperText>}
                                    </FormControl>
                                )
                            }}
                        />
                    </Grid2>
                    <Grid2 size={4}>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name="cod_beneficio"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                                return (
                                    <FormControl fullWidth size="small">
                                        <FormLabel>Código de Beneficio Fiscal na UF aplicado ao item</FormLabel>
                                        <TextField
                                            onBlur={onBlur} value={value} error={!!error}
                                            size="small" onChange={onChange}
                                        />
                                        {error && <FormHelperText >{error.message}</FormHelperText>}
                                    </FormControl>
                                )
                            }}
                        />
                    </Grid2>

                    <Grid2 size={12}>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name="observacao"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                                return (
                                    <FormControl fullWidth size="small">
                                        <FormLabel>Observação do produto</FormLabel>
                                        <TextField
                                            value={value}
                                            size="medium"
                                            onChange={onChange} onBlur={onBlur}
                                        />
                                        {error && <FormHelperText >{error.message}</FormHelperText>}
                                    </FormControl>
                                )
                            }}
                        />
                    </Grid2>

                </Grid2>

                <Box sx={{ width: "100%", height: "1px", mt: "18px", bgcolor: "#ccc" }} />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}><ArrowBack /> Voltar</Button>
                <Button type="submit" variant="contained">Cadastrar</Button>
            </DialogActions>
        </form>
    </Dialog>

}

export default ModalCadastroModal