import { Box, Button, Container, Grid2, TextField, Typography } from "@mui/material"
import { useState } from "react";

import ModalCadastroModal from "./ModalCadastroProduto";
import { PlusOne } from "@mui/icons-material";
import LtePlusMobiledata from "@mui/icons-material/LtePlusMobiledata";
import Table from "./Table";


const ProductForm = () => {


    const [openModal, setOpenModal] = useState(false)

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
                        <Button onClick={() => handleClickOpenModal()} sx={{ bgcolor: "green", color: "white", fontWeight: "600", display:"flex", alignItems:"flex-start", justifyContent:"flex-start", gap:1}}><span>+</span> Novo</Button>
                        <ModalCadastroModal open={openModal} handleClose={handleClickCloseModal} />
                    </Box>
                </Grid2>

                <Grid2 size={3}>
                    <Typography variant="body2" >Quantidade</Typography>
                    <TextField
                        type="number"
                        size="small"
                    />
                </Grid2>
            </Grid2>

            <Grid2 sx={{ mt: 4 }}>
                <Table />
            </Grid2>
        </Container>
    )
}

export default ProductForm