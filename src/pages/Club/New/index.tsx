/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Avatar,
} from '@mui/material';
import { Create } from '@mui/icons-material';
import axios from 'axios';
import { Club } from '../../../types/clubs';
import { createClub } from '../../../api/clubs';
import { useDropzone } from 'react-dropzone';
import { CirclePicker } from "react-color";
import TopBar from '../../../components/TopBar';

const steps = ['Información básica', 'Colores y logo', 'Días cerrados'];

const CreateClub = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [clubData, setClubData] = useState({
        name: '',
        description: '',
        address: '',
        city: '',
        country: '',
        alias: '',
        colors: {
            primary: '',
            secondary: ''
        },
        logo: '',
        closedDays: [''],
    });

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = async () => {
        try {
            const response = await createClub(clubData);
            console.log('Club creado:', response);
            // Realiza otras acciones después de la creación exitosa
        } catch (error) {
            console.error('Error al crear el club:', error);
        }
    };

    const handleFileUpload = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setClubData((prevData) => ({
            ...prevData,
            logo: file,
        }));
        console.log("🚀 ~ file: index.tsx:68 ~ handleFileUpload ~ clubData:", clubData)
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        multiple: false,
        onDrop: handleFileUpload,
    });

    const handleInputChange = (field, value) => {
        setClubData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handlePrimaryColorChange = (color) => {
        setClubData((prevData) => ({
            ...prevData,
            colors: {
                ...prevData.colors,
                primary: color.hex,
            },
        }));
    };

    const handleSecondaryColorChange = (color) => {
        setClubData((prevData) => ({
            ...prevData,
            colors: {
                ...prevData.colors,
                secondary: color.hex,
            },
        }));
    };

    return (
        <>
            <TopBar />

            <Box p={4} sx={{
                marginTop: 1,
                alignItems: "center",
            }}>
                <Typography variant="h4" gutterBottom>
                    Crear un nuevo club
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box mt={4}>
                    {activeStep === 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "100%"
                            }}>
                            <Typography variant="h6">Información básica:</Typography>
                            <TextField
                                label="Nombre"
                                fullWidth
                                value={clubData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)} />
                            {/* Agrega más campos de información básica aquí */}
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleNext}
                                sx={{ mt: 2 }}
                            >
                                Siguiente
                            </Button>
                        </Box>
                    )}
                    {activeStep === 1 && (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "100%",
                            }}>
                            <Typography variant="h6">Colores y logo:</Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: 2,
                                }}
                            >
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <Avatar
                                        alt={clubData.name}
                                        src={clubData.logo}
                                        sx={{
                                            width: 130,
                                            height: 130,
                                            backgroundColor: clubData.colors.primary,
                                            borderColor: clubData.colors.secondary,
                                            borderWidth: '0.5rem',
                                            borderStyle: 'solid',
                                        }} />
                                </div>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 7,
                                    "@media (min-width:600px)": {
                                        flexDirection: "row",
                                    },
                                }}
                            >
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <Typography variant="subtitle1">Color primario:</Typography>
                                    <CirclePicker
                                        color={clubData.colors.primary}
                                        onChange={handlePrimaryColorChange}
                                    />
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <Typography variant="subtitle1">Color secundario:</Typography>
                                    <CirclePicker
                                        color={clubData.colors.secondary}
                                        onChange={handleSecondaryColorChange}
                                    />
                                </Box>
                            </Box>
                            {/* Agrega más campos de colores y logo aquí */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                    marginTop: 2,
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleBack}
                                >
                                    Atrás
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleNext}
                                >
                                    Siguiente
                                </Button>
                            </Box>
                        </Box>
                    )}
                    {activeStep === 2 && (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "100%"
                            }}>
                            <Typography variant="h6">Días cerrados:</Typography>
                            {/* Agrega aquí una forma de seleccionar los días cerrados */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                    marginTop: 2,
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleBack}
                                >
                                    Atrás
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleNext}
                                >
                                    Siguiente
                                </Button>
                            </Box>
                        </Box>
                    )}
                    {activeStep === steps.length && (
                        <Box>
                            <Typography variant="h6">Confirmar y crear:</Typography>
                            <Typography>
                                Por favor revisa la información antes de crear el club.
                            </Typography>
                            <Button variant="outlined"
                                color="secondary"
                                onClick={handleBack} sx={{ mt: 2 }}>
                                Atrás
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                sx={{ mt: 2 }}
                            >
                                Crear Club
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default CreateClub;
