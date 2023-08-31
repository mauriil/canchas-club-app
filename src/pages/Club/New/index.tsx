/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    Box,
    TextField,
    Avatar,
} from '@mui/material';
import { createClub } from '../../../api/clubs';
import { useDropzone } from 'react-dropzone';
import { CirclePicker } from "react-color";
import TopBar from '../../../components/TopBar';
import ProvinceDropdown from '../../../components/ProvinceDropdown';
import AddressAutocomplete from '../../../components/AddressAutocomplete';
import Map from '../../../components/Map';
import ClubClosedDaysPicker from '../../../components/ClubClosedDaysPicker';
import ClubAvatar from '../../../components/ClubAvatar';
import uploadImageToSpace from '../../../api/uploadImageToSpace';

const steps = ['Información básica', 'Colores y logo', 'Días cerrados'];

const CreateClub = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [clubData, setClubData] = useState({
        name: '',
        description: '',
        address: '',
        latitude: 0,
        longitude: 0,
        city: '',
        country: 'ARG',
        alias: '',
        colors: {
            primary: '',
            secondary: ''
        },
        logo: '' || null,
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

    const handleFileUpload = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        await uploadImageToSpace('archivo', file, 'image/jpeg');
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

    const handleAddressChange = async (address) => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyAzVkfaA86bJwjTKyVyawoj9mp9rO72Cro`);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                setClubData((prevData) => ({
                    ...prevData,
                    address: address,
                    latitude: location.lat,
                    longitude: location.lng,
                }));
            }
        } catch (error) {
            console.error('Error fetching geolocation:', error);
        }
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
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>Información básica:</Typography>
                            <TextField
                                label="Nombre"
                                fullWidth
                                value={clubData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                sx={{ marginBottom: 2, }} />
                            <TextField
                                label="Descripción"
                                fullWidth
                                value={clubData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                sx={{ marginBottom: 2, }} />
                            <TextField
                                label="Alias"
                                fullWidth
                                value={clubData.alias}
                                onChange={(e) => handleInputChange('alias', e.target.value)}
                                sx={{ marginBottom: 2, }} />
                            <ProvinceDropdown
                                value={clubData.city}
                                onChange={(province: any) => handleInputChange('city', province)} />
                            <AddressAutocomplete
                                value={clubData.address}
                                onChange={(address: any) => handleAddressChange(address)} />
                            <Map latitude={clubData.latitude} longitude={clubData.longitude} />

                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleNext}
                                sx={{ mt: 2, marginTop: 3 }}
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
                                    marginBottom: 3,
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
                                    marginBottom: 3,
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
                            }}>
                            <Typography variant="h6">Días cerrados:</Typography>
                            <ClubClosedDaysPicker
                                selectedDays={clubData.closedDays}
                                onChange={(closedDays: any) => handleInputChange('closedDays', closedDays)}
                            />

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                    marginTop: 3,
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
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}>
                            <Typography variant="h6" sx={{ margin: 1 }}>Confirmar y crear:</Typography>
                            <Typography sx={{ margin: 1 }}>
                                Por favor revisa la información antes de crear el club.
                            </Typography>
                            <ClubAvatar
                                logo={clubData.logo}
                                colors={{
                                    primary: clubData.colors.primary,
                                    secondary: clubData.colors.secondary
                                }}
                                title={clubData.name}
                                width="130px"
                                height="130px"
                            />
                            <Typography><h3>{clubData.description}</h3></Typography>
                            <Typography>Dirección: {clubData.address}</Typography>
                            <Typography>Provincia: {clubData.city}</Typography>
                            <Typography>Alias: {clubData.alias}</Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                    marginTop: 3,
                                }}
                            >
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

                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default CreateClub;
