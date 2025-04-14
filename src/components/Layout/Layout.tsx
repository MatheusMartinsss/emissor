
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, Session } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';;
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import React from 'react';
import { logout } from '@/features/user/userSlice';



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



export default function Layout() {
    const { user } = useSelector((state: RootState) => state.user)
    const [session, setSession] = useState<Session | null>(null)
    const dispatch = useDispatch()

    const authentication = React.useMemo(() => {
        return {

            signIn: () => {
                setSession({
                    user: {
                        email: user?.email,
                        name: user?.firstName,
                        id: user?.id
                    }
                })
            },
            signOut: () => {
                setSession(null);
                dispatch(logout())
            },
        };
    }, []);

    useEffect(() => {
        authentication.signIn()
    }, [])
    return (
        <AppProvider
            navigation={NAVIGATION}
            theme={demoTheme}
            session={session}
            branding={null}
            authentication={authentication}
        >

            <DashboardLayout>
                <PageContainer  >

                    <Outlet />
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
}