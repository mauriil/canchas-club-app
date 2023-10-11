/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from 'react';
import { createClub, deleteClub, editClub, getClubById } from '../../../api/clubs';
import { useDropzone } from 'react-dropzone';
import uploadFileToS3 from '../../../api/uploadFileToS3';
import TopBar from '../../../components/TopBar';
import { Alert, AlertColor, Avatar, Box, Button, CircularProgress, LinearProgress, Snackbar, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import ProvinceDropdown from '../../../components/ProvinceDropdown';
import AddressAutocomplete from '../../../components/AddressAutocomplete';
import Map from '../../../components/Map';
import { CirclePicker } from 'react-color';
import ClubAvatar from '../../../components/ClubAvatar';
import ClubClosedDaysPicker from '../../../components/ClubClosedDaysPicker';
import { useNavigate } from 'react-router-dom';
import { Club } from '../../../types/clubs';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import CanchasClubLoader from '../../../components/Loader';
import { set } from 'date-fns';
import DepartmentDropdown from '../../../components/DepartmentDropdown';
import ClosedDaysAccordion from '../../../components/ClubClosedDaysPicker/ClosedDayAccordion';

const steps = ['Información básica', 'Colores y logo', 'Días cerrados'];

interface EditOrCreateClubProps {
    editMode?: boolean;
}

const EditOrCreateClub = ({ editMode = false }: EditOrCreateClubProps) => {
    const [submittingForm, setSubmittingForm] = useState(false);
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("success");
    const handelSnackClose = () => {
        setSnackBarOpen(false);
    }
    const [activeStep, setActiveStep] = useState(0);
    const [clubData, setClubData] = useState({
        _id: '',
        name: '',
        description: '',
        address: '',
        latitude: '0',
        longitude: '0',
        location: {
            type: 'Point',
            coordinates: [0, 0]
        },
        province: '',
        department: '',
        alias: '',
        colors: {
            primary: '#FFFFFF',
            secondary: '#FFFFFF'
        },
        logo: '',
        closedDays: [''],
    });
    const [buttonNextClicked, setButtonNextClicked] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (editMode && clubData.name === '') {
            const clubId = window.location.pathname.split('/')[3];
            void fetchClubData(clubId).then((clubData) => {
                setClubData(clubData);
            });
        }
    }, [editMode, clubData]);

    const fetchClubData = async (clubId: string) => {
        try {
            const clubInfo = await getClubById(clubId);
            if (clubInfo.ok) {
                const clubData = await clubInfo.json() as Club
                return clubData;
            } else {
                console.error("Error fetching club data:", clubInfo.statusText);
            }
        } catch (error) {
            console.error("Error fetching club data:", error);
        }
    }

    const handleNext = () => {
        if (activeStep === 0) {
            setButtonNextClicked(true);
            if (clubData.name === ''
                || clubData.address === ''
                || clubData.province === ''
                || clubData.department === ''
                || clubData.description === ''
                || clubData.alias === '') {
                setSnackBarMessage('Por favor completa todos los campos');
                setSnackBarSeverity('warning');
                setSnackBarOpen(true);
                return;
            }
            setButtonNextClicked(false);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleLatLongChange = (position) => {
        setClubData((prevData) => ({
            ...prevData,
            latitude: position.lat.toString(),
            longitude: position.lng.toString(),
            address: position.address,
        }));
    };

    const handleSubmit = async () => {
        setSubmittingForm(true);
        clubData.location.coordinates = [];
        clubData.location.coordinates.push(parseFloat(clubData.longitude), parseFloat(clubData.latitude));
        if (editMode) {
            try {
                await editClub(clubData, clubData._id);
                setSnackBarMessage('Club editado correctamente');
                setSnackBarSeverity('success');
                setSnackBarOpen(true);
                setTimeout(() => {
                    navigate("/dashboard/miClub");
                }, 1500);
                return;
            } catch (error) {
                setSubmittingForm(false);
                console.error('Error al editar el club:', error);
            }
        } else {
            try {
                const req = await createClub(clubData);
                const request = await req.json();
                if (request.statusCode >= 400) {
                    setSnackBarMessage(request.message);
                    setSnackBarSeverity('error');
                    setSnackBarOpen(true);
                    return;
                }
                setSnackBarMessage('Club creado correctamente');
                setSnackBarSeverity('success');
                setSnackBarOpen(true);
                setTimeout(() => {
                    navigate("/dashboard/miClub");
                }, 1500);
                return;
            } catch (error) {
                setSubmittingForm(false);
                console.error('Error al crear el club:', error);
            }
        }
    };

    const handleFileUpload = async (acceptedFiles) => {
        setIsLoadingImage(true);
        try {
            const file = acceptedFiles[0];
            const fileUrl = await uploadFileToS3('clublogos', clubData.name, file, (progress) => {
                setUploadProgress(progress);
            });
            setClubData((prevData) => ({
                ...prevData,
                logo: fileUrl,
            }));
            setSnackBarMessage('Logo actualizado correctamente');
            setSnackBarSeverity('success');
            setSnackBarOpen(true);
            setIsLoadingImage(false);
        } catch (error) {
            console.error('Error uploading file:', error);
            setSnackBarMessage('Error al subir la imagen');
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
            setIsLoadingImage(false);
        }
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
                    latitude: location.lat.toString(),
                    longitude: location.lng.toString(),
                }));
            }
        } catch (error) {
            console.error('Error fetching geolocation:', error);
        }
    };

    const handleDelete = async () => {
        await deleteClub(clubData._id);
        setSnackBarMessage('Club eliminado correctamente');
        setSnackBarSeverity('success');
        setSnackBarOpen(true);
        setTimeout(() => {
            navigate("/dashboard/miClub");
        }, 1500);
        return;
    }

    return (
        <>
            <TopBar />

            {submittingForm ? (
                <CanchasClubLoader width="10%" />
            ) : (
                <Box p={4} sx={{
                    marginTop: 1,
                    alignItems: "center",
                }}>

                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                        marginTop: 3,
                        marginBottom: 3,
                    }}>
                        <Typography variant="h4" gutterBottom sx={{ marginRight: 3 }}>
                            {editMode ? `Editar club ${clubData.name}` : 'Crear un nuevo club'}
                        </Typography>
                        {editMode ?
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => setOpenDeleteDialog(true)}
                            >
                                Eliminar club
                            </Button>
                            :
                            null}

                        <ConfirmationDialog
                            open={openDeleteDialog}
                            onClose={() => setOpenDeleteDialog(false)}
                            onConfirm={handleDelete}
                            title={`Eliminar club ${clubData.name}`}
                            message={`¿Estás seguro que querés eliminar el club ${clubData.name}?
                            Todas las configuraciones y las canchas asociadas se eliminarán, asi como también todos aquellos turnos futuros confirmados y/o los turnos fijos se cancelarán.
                            Esta acción no se puede deshacer.`}
                        />
                    </Box>
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
                                    width: "100%",
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                    padding: "20px",
                                }}>
                                <Typography variant="h6" sx={{ marginBottom: 2 }}>Información básica:</Typography>
                                <TextField
                                    label="Nombre"
                                    fullWidth
                                    value={clubData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    sx={{ marginBottom: 2, }}
                                    error={clubData.name === '' && buttonNextClicked}
                                    helperText={clubData.name === '' && buttonNextClicked ? 'Campo requerido' : ''}
                                />
                                <TextField
                                    label="Descripción"
                                    fullWidth
                                    value={clubData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    sx={{ marginBottom: 2, }}
                                    error={clubData.description === '' && buttonNextClicked}
                                    helperText={clubData.description === '' && buttonNextClicked ? 'Campo requerido' : ''}
                                />
                                <TextField
                                    label="Alias"
                                    fullWidth
                                    value={clubData.alias}
                                    onChange={(e) => handleInputChange('alias', e.target.value)}
                                    sx={{ marginBottom: 2, }}
                                    error={clubData.alias === '' && buttonNextClicked}
                                    helperText={clubData.alias === '' && buttonNextClicked ? 'Campo requerido' : ''}
                                />
                                <ProvinceDropdown
                                    value={clubData.province}
                                    onChange={(province: any) => handleInputChange('province', province)}
                                    error={clubData.province === '' && buttonNextClicked}
                                    errorValue={clubData.province === '' && buttonNextClicked ? 'Campo requerido' : ''}
                                />
                                <DepartmentDropdown
                                    province={clubData.province}
                                    value={clubData.department}
                                    onChange={(department: any) => handleInputChange('department', department)}
                                    error={clubData.department === '' && buttonNextClicked}
                                />
                                <AddressAutocomplete
                                    value={clubData.address}
                                    onChange={(address: any) => handleAddressChange(address)}
                                    error={clubData.address === '' && buttonNextClicked}
                                    helperText={clubData.address === '' && buttonNextClicked ? 'Campo requerido' : ''}
                                />


                                {clubData.latitude !== '0' && clubData.longitude !== '0' && (
                                    <Map latitude={parseFloat(clubData.latitude)} longitude={parseFloat(clubData.longitude)} onMarkerDragEnd={(position: any) => handleLatLongChange(position)} />
                                )}

                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleNext}
                                    fullWidth
                                    sx={{ margin: 3 }}
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
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                    padding: "20px",
                                }}>
                                <Typography variant="h6" sx={{ marginBottom: 2 }}>Colores y logo:</Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: 3,
                                    }}
                                >
                                    {isLoadingImage ? (
                                        <Box>
                                            <CanchasClubLoader width="10%" />
                                            <LinearProgress
                                                variant="determinate"
                                                value={uploadProgress}
                                                sx={{
                                                    width: '150px', // Ancho personalizado
                                                    height: '8px',   // Altura personalizada
                                                    marginRight: '8px', // Margen derecho para separar el número de porcentaje
                                                }}
                                            />
                                            <Typography variant="body2" color="textSecondary">
                                                {`${uploadProgress}%`}
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
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
                                        </div>
                                    )}

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
                                        fullWidth
                                        onClick={handleBack}
                                    >
                                        Atrás
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
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
                                    width: "100%",
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                    padding: "20px",
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
                                        fullWidth
                                        onClick={handleBack}
                                    >
                                        Atrás
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
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
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                                padding: "20px",
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
                                <Typography>Provincia: {clubData.province}</Typography>
                                <Typography>Departamento: {clubData.department}</Typography>
                                <Typography>Alias: {clubData.alias}</Typography>
                                <ClosedDaysAccordion selectedDates={clubData.closedDays} />
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
                                        fullWidth
                                        onClick={handleBack} sx={{ mt: 2 }}>
                                        Atrás
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={handleSubmit}
                                        sx={{ mt: 2 }}
                                    >
                                        {editMode ? 'Guardar cambios' : 'Crear club'}
                                    </Button>
                                </Box>

                            </Box>
                        )}
                    </Box>
                </Box>
            )
            }

            <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
                <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default EditOrCreateClub;
