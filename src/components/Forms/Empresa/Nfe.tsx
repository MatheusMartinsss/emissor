import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, Button, FormControl, FormLabel, Grid2, TextField } from "@mui/material"


const schema = yup.object({
    serie: yup.number().required(),
    sequencia: yup.number().required(),
})

const NfeForm = () => {
    const { handleSubmit, control } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <Box sx={{ width: '100%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2 container spacing={2}>
                    <Grid2 size={3}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            name="serie"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FormControl fullWidth size="small">
                                    <FormLabel>Serie</FormLabel>
                                    <TextField
                                        size="small"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                    />
                                </FormControl>
                            )}
                        />
                    </Grid2>
                    <Grid2 size={3}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            name="sequencia"
                            render={({ field: { onChange, value } }) => (
                                <FormControl fullWidth>
                                    <FormLabel>Sequencia</FormLabel>
                                    <TextField
                                        size='small'
                                        onChange={onChange} value={value}

                                    />

                                </FormControl>
                            )}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            name="sequencia"
                            render={({ field: { onChange, value } }) => (
                                <FormControl fullWidth>
                                    <FormLabel>Certificado Digital</FormLabel>
                                    <TextField
                                        size='small'
                                        type="file"
                                        onChange={onChange} value={value}

                                    />

                                </FormControl>
                            )}
                        />
                    </Grid2>
                    <Grid2 size={12} display='flex' flexDirection='row' justifyContent='flex-end'>
                        <Button variant="contained" type="submit" color="success">Salvar</Button>
                    </Grid2>
                </Grid2>
            </form>
        </Box>
    )
}

export default NfeForm