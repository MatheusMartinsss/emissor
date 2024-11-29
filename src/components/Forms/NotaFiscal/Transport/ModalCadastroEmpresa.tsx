import { IMaskInput } from 'react-imask';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, FormLabel, Grid2, MenuItem, Select, TextField } from "@mui/material"
import React from 'react';
import { ArrowBack } from '@mui/icons-material';
import CadastroEmpresa from './CadastroEmpresa';


const schema = yup.object({
    cnpj: yup.string().required('Campo obrigatório'),
    ieEstadual: yup.string().required('Campo obrigatório'),
    ieMunicipal: yup.string(),
    razaoSocial: yup.string().required('Campo obrigatório').min(12, 'Minimo 12 caracteres').max(128),
    nomeFantasia: yup.string().required('Campo obrigatório').min(12, 'Minimo 12 caracteres').max(128),
    cnaePrincipal: yup.string().required('Campo obrigatório'),
    regimeTributario: yup.number().required('Campo obrigatório').oneOf([1, 2, 3, 4]),
    ambiente: yup.string().required().oneOf(['producao', 'homologacao']),
    email: yup.string().email().required('Campo obrigatório'),
    telefone: yup.string().required('Campo obrigatório')
})

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="##.###.###/####-##"
                definitions={{
                    '#': /[0-9]/,
                }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);
const TextMaskPhone = React.forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="(##)####-####"
                definitions={{
                    '#': /[0-9]/,
                }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

const ModalCadastroEmpresa =  ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
    const { handleSubmit, control } = useForm({
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
            telefone: ''
        }
    })
    const onSubmit = (data:any) => {
        console.log(data)
    }
    return (
        <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
    >
       <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Cadastrar Empresa</DialogTitle>
        <DialogContent>
              <CadastroEmpresa />
        </DialogContent>   
        </form>
    </Dialog>
    )
}
 
export default ModalCadastroEmpresa