
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';;
import { Outlet } from 'react-router-dom';


const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Principal',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'notas',
        title: 'Notas',
        icon: <ShoppingCartIcon />,
    }, {
        segment: 'nota_fiscal',
        title: 'Nota Fiscal',
        icon: <ShoppingCartIcon />,
    },
    {
        kind: 'divider',
    },
    {
        segment: 'reports',
        title: 'Relatorios',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Notas',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'settings',
        title: 'Configurações',
        icon: <LayersIcon />,
    },
];

const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 800,
            lg: 1300,
            xl: 1536,
        },
    },
});



export default function Layout(props: any) {

    return (
        <AppProvider
            navigation={NAVIGATION}
            theme={demoTheme}

        >
            <DashboardLayout  >
                <PageContainer  >
                    <Outlet />
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
}