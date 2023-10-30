/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, Button, Snackbar, Alert, AlertColor, TextField } from '@mui/material';
import CanchasClubLoader from '../Loader';
import { User } from '../../types/users';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../customHooks/useAuth';

interface NewUserModalProps {
    isOpen: boolean;
    onSuccessfulUserCreation: (userId: string) => void;
    onClose: () => void;
}

const NewUserModal: React.FC<NewUserModalProps> = ({
    isOpen,
    onSuccessfulUserCreation,
    onClose
}) => {
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("success");
    const handelSnackClose = () => {
        setSnackBarOpen(false);
    }
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signUp, signIn } = useAuth();

    const closeModal = () => {
        onClose();
    };

    const onSubmit = handleSubmit(async (values) => {
        setIsLoading(true);
        const registerResponse = await signUp(values as User);
        if (!registerResponse.status) {
            setSnackBarMessage(registerResponse.errors[0]);
            setSnackBarSeverity("error");
            setSnackBarOpen(true);
        }
        setSnackBarMessage('Bienvenido a Canchas Club!');
        setSnackBarSeverity("success");
        setSnackBarOpen(true);
        setIsLoading(false);
        onSuccessfulUserCreation(registerResponse.id as string);
        onClose();
    });

    const onLoginSubmit = handleSubmit(async (values) => {
        setIsLoading(true);
        const loginResponse = await signIn(values as User);
        if (!loginResponse.status) {
            setSnackBarMessage(loginResponse.errors[0]);
            setSnackBarSeverity("error");
            setSnackBarOpen(true);
        }
        setSnackBarMessage('Bienvenido a Canchas Club!');
        setSnackBarSeverity("success");
        setSnackBarOpen(true);
        setIsLoading(false);
        onSuccessfulUserCreation(loginResponse.id as string);
        onClose();
    });

    return (
        <>
            <Modal open={isOpen} onClose={closeModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        maxWidth: 400,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center',
                    }}
                >
                    {isLoading ? (
                        <CanchasClubLoader width="10%" />
                    ) : (
                        !isRegistering ? (
                            <>
                                <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onLoginSubmit} width={"100%"}>
                                    <Typography variant="h2" sx={{ mb: 2 }}> Ingresa para continuar </Typography>
                                    <TextField
                                        required
                                        type="email"
                                        margin="normal"
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        autoComplete="email"
                                        sx={{ background: "transparent" }}
                                        error={!!errors.email}
                                        {...register("email", {
                                            required: true,
                                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        })}
                                    />
                                    {errors.email && (
                                        <Typography color="red"> El email es requerido </Typography>
                                    )}
                                    <TextField
                                        margin="normal"
                                        type="password"
                                        required
                                        fullWidth
                                        id="password"
                                        label="Contraseña"
                                        autoComplete="current-password"
                                        sx={{ background: "transparent" }}
                                        error={!!errors.password}
                                        {...register("password", { required: true, minLength: 6 })}
                                    />
                                    {errors.password && (
                                        <Typography color="red" sx={{ mb: 2 }}> La contraseña es requerida </Typography>
                                    )}
                                    <Button
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 1 }}
                                    >
                                        Ingresar
                                    </Button>
                                    <Button
                                        color="primary"
                                        type="button"
                                        fullWidth
                                        variant="outlined"
                                        sx={{ mt: 1, mb: 0 }}
                                        onClick={() => setIsRegistering(true)}
                                    >
                                        Registro rápido
                                    </Button>
                                </Box>

                            </>
                        ) :
                            <>
                                <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit} width={"100%"}>
                                <Typography variant="h2" sx={{ mb: 2 }}> Registrate para continuar </Typography>
                                    <TextField
                                        type="text"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Nombre completo"
                                        autoComplete="name"
                                        autoFocus
                                        sx={{ background: "transparent" }}
                                        error={!!errors.name}
                                        {...register("name", { required: true })}
                                    />
                                    {errors.name && (
                                        <Typography color="red"> El nombre es requerido </Typography>
                                    )}
                                    <TextField
                                        type="tel"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Teléfono"
                                        autoComplete="phone"
                                        sx={{ background: "transparent" }}
                                        error={!!errors.phone}
                                        {...register("phone", { required: true })}
                                    />
                                    {errors.phone && (
                                        <Typography color="red"> El teléfono es requerido </Typography>
                                    )}
                                    <TextField
                                        required
                                        type="email"
                                        margin="normal"
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        autoComplete="email"
                                        sx={{ background: "transparent" }}
                                        error={!!errors.email}
                                        {...register("email", {
                                            required: true,
                                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        })}
                                    />
                                    {errors.email && (
                                        <Typography color="red"> El email es requerido </Typography>
                                    )}
                                    <TextField
                                        margin="normal"
                                        type="password"
                                        required
                                        fullWidth
                                        id="password"
                                        label="Contraseña"
                                        autoComplete="current-password"
                                        sx={{ background: "transparent" }}
                                        error={!!errors.password}
                                        {...register("password", { required: true, minLength: 6 })}
                                    />
                                    {errors.password && (
                                        <Typography color="red" sx={{ mb: 2 }}> La contraseña es requerida </Typography>
                                    )}
                                    <Button
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 1 }}
                                    >
                                        Crear nueva cuenta
                                    </Button>
                                    <Button
                                        color="primary"
                                        type="button"
                                        fullWidth
                                        variant="outlined"
                                        sx={{ mt: 1, mb: 0 }}
                                        onClick={() => setIsRegistering(false)}
                                    >
                                        Ya tengo cuenta
                                    </Button>
                                </Box>
                            </>
                    )}
                </Box>
            </Modal>

            <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
                <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default NewUserModal;
