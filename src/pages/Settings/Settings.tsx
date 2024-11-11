import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DadosForm from '@/components/Forms/Empresa/Dados';
import EnderecoForm from '@/components/Forms/Empresa/Endereco';
import NfeForm from '@/components/Forms/Empresa/Nfe';

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

export default function Settings() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Dados da Empresa" {...a11yProps(0)} />
                    <Tab label="Endereço" {...a11yProps(1)} />
                    <Tab label="NFE" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <DadosForm />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <EnderecoForm />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <NfeForm />
            </CustomTabPanel>
        </Box>
    );
}