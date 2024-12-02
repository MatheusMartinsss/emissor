import { Box, Container, Tab, Tabs } from "@mui/material"
import React from "react";
import DadosForm from "../Empresa/Dados";
import EnderecoForm from "../Empresa/Endereco";
import NfeForm from "../Empresa/Nfe";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const CadastroEmpresa = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="DADOS DA EMPRESA" {...a11yProps(0)} />
                        <Tab label="ENDEREÇO" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <DadosForm />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <EnderecoForm />
                </CustomTabPanel>
            </Box>
        </Container>
    )
}

export default CadastroEmpresa