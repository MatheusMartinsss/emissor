import { Controller, useFormContext } from "react-hook-form";
import { Box, FormControl, FormLabel, Grid2, TextField } from "@mui/material"


const NfeForm = () => {
    const { control } = useFormContext()

    return (
        <Box sx={{ width: '100%' }}>
            <Grid2 container spacing={2}>
                <Grid2 size={3}>
                    <Controller
                        control={control}
                        rules={{
                            required: true
                        }}
                        name="nfe.serie"
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
                        name="nfe.sequencia"
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
            </Grid2>
        </Box>
    )
}

export default NfeForm