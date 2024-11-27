import { Box, Button, Container, Grid2, TextField, Typography } from "@mui/material"
import { useState } from "react";

import ModalCadastroModal from "./ModalCadastroProduto";
import TableProdut from "./Table";
const ProductForm = () => {

    const [openModal, setOpenModal] = useState(false)
    const [quantidade, setQuantidade] = useState("")
    function handleClickOpenModal() {
        setOpenModal(true)
    }
    function handleClickCloseModal() {
        setOpenModal(false)
    }
    return (
        <Container>
            <Grid2 spacing={6} container >
                <Grid2 size={8} sx={{ display: "grid", gridColumn: 1 }} >
                    <Typography color="textSecondary" fontWeight={"700"} variant="body2" >Buscar Produto</Typography>
                    <Box sx={{ display: "flex", alignItems: "flex-start", justifyItems: "center", gap: 1 }}>
                        <TextField
                            placeholder="DIGITE O NOME OU CÓDIGO DO PRODUTO"
                            sx={{ flexGrow: 1 }}
                            size="small"
                        />
                        <Button onClick={() => handleClickOpenModal()} sx={{ bgcolor: "green", color: "white", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", gap: 1 }}><span>+</span><span>Novo</span></Button>
                        <ModalCadastroModal open={openModal} handleClose={handleClickCloseModal} />
                    </Box>
                </Grid2>
                <Grid2 size={3}>
                    <Typography variant="body2" >Quantidade</Typography>
                    <TextField
                        type="number"
                        size="small"
                        required
                        value={quantidade}
                        onChange={({ target }) => setQuantidade(target.value)}
                    />
                </Grid2>
            </Grid2>
            <Grid2 sx={{ mt: 4 }}>
                <TableProdut />
            </Grid2>
        </Container>
    )
}

export default ProductForm