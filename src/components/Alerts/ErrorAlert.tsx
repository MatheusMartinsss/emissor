import { Alert, AlertProps } from '@mui/material';

interface ErrorAlertProps extends AlertProps {
    message?: string;
    onClose?: () => void;
}

export const ErrorAlert = ({ message, onClose, ...props }: ErrorAlertProps) => {
    return (
        <Alert
            severity="error"
            variant="filled"
            onClose={onClose}
            sx={{ width: '100%', mb: 2 }}
            {...props}
        >
            {message || 'Ocorreu um erro durante o login. Por favor, tente novamente.'}
        </Alert>
    );
};
