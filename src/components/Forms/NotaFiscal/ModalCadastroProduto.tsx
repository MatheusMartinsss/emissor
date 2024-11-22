import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Grid2, InputLabel, MenuItem, Modal, Select, Switch } from "@mui/material"

 
const ModalCadastroModal = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {

    return <Dialog
    fullWidth={true}
    maxWidth="lg"
    open={open}
    onClose={handleClose}
  >
    <DialogTitle sx={{fontWeight:700}}>Cadastrar produtos</DialogTitle>
    <Box sx={{width:"100%", height:"4px",bgcolor:"blue"}}/>
    <DialogContent>
        <Grid2 container>
            
        </Grid2>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Voltar</Button>
    </DialogActions>
  </Dialog>

}

export default ModalCadastroModal