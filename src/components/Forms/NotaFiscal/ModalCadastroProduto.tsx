import { Box, Modal } from "@mui/material"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
const ModalCadastroModal = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {

    return <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
    >
        <Box sx={{ ...style, width: 1000 }}>
            <h2 id="parent-modal-title">Cadastrar produto</h2>
        </Box>
    </Modal>
}

export default ModalCadastroModal