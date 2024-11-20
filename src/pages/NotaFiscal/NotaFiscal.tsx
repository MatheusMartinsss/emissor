import DestinatarioForm from "@/components/Forms/NotaFiscal/Destinatario";
import ProductForm from "@/components/Forms/NotaFiscal/Products";
import { Box, Container, Tab, Tabs } from "@mui/material"
import React from "react";

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

const NotaFiscal = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Destinatario" {...a11yProps(0)} />
                        <Tab label="Produtos" {...a11yProps(1)} />
                        <Tab label="Outros" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <DestinatarioForm />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <ProductForm />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>

                </CustomTabPanel>
            </Box>
        </Container>
    )
}

export default NotaFiscal