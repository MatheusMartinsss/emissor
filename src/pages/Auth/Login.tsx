import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Link,
} from '@mui/material';
import { useAuthMutation } from '@/features/user/userApiSlice';
import { ErrorAlert } from '@/components/Alerts/ErrorAlert';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '@/features/user/userSlice';
// Schema de validação
const schema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('Campo obrigatório'),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [auth, { isLoading }] = useAuthMutation();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const onSubmit = async (data: any) => {
    setErrorMessage(undefined);
    try {
      const userData = await auth(data).unwrap()
      if (userData) {
        dispatch(setCredentials({ accessToken: userData.access_token }))
        navigate('/')
      }
    } catch (err: any) {
      if (err.status == 404) {
        setErrorMessage('Usuario não encontrado!.')
        return
      }
      const message = err.data?.message || 'Credenciais inválidas ou erro no servidor';
      setErrorMessage(message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {errorMessage && <ErrorAlert message={errorMessage} />}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            autoComplete="email"
            autoFocus
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Entrar'
            )}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link href="#" variant="body2" sx={{ mr: 2 }}>
              Esqueceu a senha?
            </Link>
            <Link href="#" variant="body2">
              Criar conta
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}