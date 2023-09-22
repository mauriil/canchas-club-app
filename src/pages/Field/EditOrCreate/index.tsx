/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Snackbar,
    Alert,
    AlertColor,
    Stepper,
    Step,
    StepLabel,
    Box,
    Select,
    InputLabel,
} from '@mui/material';

import { createField, deleteField, editField, getFieldById } from '../../../api/fields';
import { Field } from '../../../types/fields';
import TopBar from '../../../components/TopBar';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import { useNavigate } from 'react-router-dom';
import FieldDayAvailability from '../FieldDayAvailability';
import { set } from 'date-fns';
import S3MultipleImageUpload from '../../../components/S3MultipleImageUpload';

const steps = ['Información básica', 'Fotos', 'Disponibilidad'];

interface CreateOrUpdateFieldProps {
    editMode?: boolean;
    fieldId?: string;
}

const CreateOrUpdateField: React.FC<CreateOrUpdateFieldProps> = ({
    editMode = false,
    fieldId,
}) => {
    const navigate = useNavigate();
    const [buttonNextClicked, setButtonNextClicked] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string>('monday');
    const [activeStep, setActiveStep] = useState(0);
    const [fieldData, setFieldData] = useState<Field>({
        name: '',
        description: '',
        photos: [],
        sport: 'football5',
        fieldType: 'indoor',
        floorType: 'grass',
        illumination: false,
        availability: {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
        },
        clubId: '',
    });
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('success');
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    useEffect(() => {
        if (editMode && fieldId) {
            const fieldId = window.location.pathname.split('/')[3];
            void fetchFieldData(fieldId).then((fieldData: Field) => {
                setFieldData(fieldData);
            });
        }
    }, [editMode, fieldId]);

    const fetchFieldData = async (fieldId: string): Promise<Field> => {
        const fieldData = await getFieldById(fieldId);
        return fieldData as unknown as Field;
    };

    const handleNext = () => {
        if (activeStep === 0) {
            setButtonNextClicked(true);
            if (fieldData.name === '' || fieldData.description === '') {
                setSnackBarMessage('Por favor revisa los campos obligatorios');
                setSnackBarSeverity('warning');
                setSnackBarOpen(true);
                return;
            }
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [dayData, setDayData] = useState({
        openHour: '',
        closeHour: '',
        price: 0,
    });

    const handleAddDayData = () => {
        setFieldData((prevData) => ({
            ...prevData,
            availability: {
                ...prevData.availability,
                [selectedDay]: [
                    ...(prevData.availability[selectedDay] || []),
                    { ...dayData },
                ],
            },
        }));
        setDayData({ openHour: '', closeHour: '', price: 0 });
    };

    const handleDeleteDayData = (day: string, index: number) => {
        setFieldData((prevData) => {
            const updatedData = { ...prevData };
            updatedData.availability[day].splice(index, 1);
            return updatedData;
        });
    };

    const handleAddPhotos = (urls: string[]) => {
        setFieldData((prevData) => ({
            ...prevData,
            photos: [...prevData.photos, ...urls],
        }));
    };

    const handleSubmit = async () => {
        try {
            if (editMode) {
                // Implementa la lógica para editar un campo existente
            } else {
                // Implementa la lógica para crear un nuevo campo
            }
            setSnackBarMessage(editMode ? 'Cancha editada correctamente' : 'Cancha creada correctamente');
            setSnackBarSeverity('success');
            setSnackBarOpen(true);
        } catch (error) {
            console.error('Error:', error);
            setSnackBarMessage('Error al guardar la cancha');
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
        }
    };

    const handleDelete = async () => {
        await deleteField(fieldData._id);
        setSnackBarMessage('Cancha eliminada correctamente');
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
                        {editMode ? `Editar cancha ${fieldData.name}` : 'Crear nueva cancha'}
                    </Typography>
                    {editMode ?
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setOpenDeleteDialog(true)}
                        >
                            Eliminar cancha
                        </Button>
                        :
                        null}

                    <ConfirmationDialog
                        open={openDeleteDialog}
                        onClose={() => setOpenDeleteDialog(false)}
                        onConfirm={handleDelete}
                        message={`¿Estás seguro que querés eliminar la cancha ${fieldData.name}?
                            Todas las configuraciones se eliminarán, asi como también todos aquellos turnos futuros confirmados y/o los turnos fijos se cancelarán.
                            Esta acción no se puede deshacer.`}
                    />
                </Box>
                <Box>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === 0 && (
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            marginTop: 3,
                            marginBottom: 3,
                        }}>
                            <Typography variant="h6">Información básica:</Typography>
                            <TextField
                                label="Nombre"
                                fullWidth
                                value={fieldData.name}
                                sx={{ marginTop: 2, marginBottom: 2 }}
                                error={fieldData.name === '' && buttonNextClicked}
                                helperText={fieldData.name === '' && buttonNextClicked ? 'Campo requerido' : ''}
                                onChange={(e) => setFieldData({ ...fieldData, name: e.target.value })} />
                            <TextField
                                label="Descripción"
                                fullWidth
                                multiline
                                value={fieldData.description}
                                sx={{ marginBottom: 2 }}
                                error={fieldData.description === '' && buttonNextClicked}
                                helperText={fieldData.description === '' && buttonNextClicked ? 'Campo requerido' : ''}
                                onChange={(e) => setFieldData({ ...fieldData, description: e.target.value })} />
                            <InputLabel htmlFor="sport">Deporte</InputLabel>
                            <Select
                                label="Deporte"
                                native
                                fullWidth
                                value={fieldData.sport}
                                sx={{ marginBottom: 2 }}
                                onChange={(e) => setFieldData({ ...fieldData, sport: e.target.value as string })}
                                inputProps={{
                                    name: 'sport',
                                    id: 'sport',
                                }}
                            >
                                <option value="football5">Fútbol 5</option>
                                <option value="football7">Fútbol 7</option>
                                <option value="football9">Fútbol 9</option>
                                <option value="football11">Fútbol 11</option>
                                <option value="basketball">Básquet</option>
                                <option value="tennis">Tenis</option>
                                <option value="paddle">Paddle</option>
                                <option value="volleyball">Vóley</option>
                                <option value="handball">Handball</option>
                                <option value="hockey">Hockey</option>
                                <option value="rugby">Rugby</option>
                                <option value="other">Otro</option>
                            </Select>
                            <InputLabel htmlFor="fieldType">Tipo de cancha</InputLabel>
                            <Select
                                label="Tipo de cancha"
                                native
                                fullWidth
                                value={fieldData.fieldType}
                                sx={{ marginBottom: 2 }}
                                onChange={(e) => setFieldData({ ...fieldData, fieldType: e.target.value as string })}
                                inputProps={{
                                    name: 'fieldType',
                                    id: 'fieldType',
                                }}
                            >
                                <option value="indoor">Cubierta</option>
                                <option value="outdoor">Descubierta</option>
                            </Select>
                            <InputLabel htmlFor="floorType">Tipo de piso</InputLabel>
                            <Select
                                label="Tipo de piso"
                                native
                                fullWidth
                                value={fieldData.floorType}
                                sx={{ marginBottom: 2 }}
                                onChange={(e) => setFieldData({ ...fieldData, floorType: e.target.value as string })}
                                inputProps={{
                                    name: 'floorType',
                                    id: 'floorType',
                                }}
                            >
                                <option value="grass">Césped</option>
                                <option value="syntheticGrass">Césped sintético</option>
                                <option value="parquet">Parquet</option>
                                <option value="concrete">Cemento</option>
                                <option value="other">Otro</option>
                            </Select>
                            <InputLabel htmlFor="illumination">Iluminación</InputLabel>
                            <Select
                                label="Iluminación"
                                native
                                fullWidth
                                value={fieldData.illumination ? 'true' : 'false'}
                                sx={{ marginBottom: 2 }}
                                onChange={(e) => setFieldData({ ...fieldData, illumination: e.target.value === 'true' })}
                                inputProps={{
                                    name: 'illumination',
                                    id: 'illumination',
                                }}
                            >
                                <option value="true">SÍ</option>
                                <option value="false">NO</option>
                            </Select>
                            {/* Otros campos de información básica */}
                            <Button variant="outlined" color="primary" sx={{ marginTop: 1 }} onClick={handleNext}>
                                Siguiente
                            </Button>
                        </Box>
                    )}
                    {activeStep === 1 && (
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            marginTop: 3,
                            marginBottom: 3,
                        }}>
                            <S3MultipleImageUpload onImagesUploaded={handleAddPhotos} photosArray={fieldData.photos} folderName={`canchas`} />
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
                    {activeStep === 2 && (
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            marginTop: 3,
                            marginBottom: 3,
                        }}>
                            <Typography variant="h6">Disponibilidad:</Typography>
                            <FieldDayAvailability
                                day={selectedDay}
                                data={fieldData.availability}
                                onAddData={handleAddDayData}
                                onDeleteData={handleDeleteDayData}
                                selectedDay={selectedDay}
                                setSelectedDay={setSelectedDay}
                                dayData={dayData}
                                setDayData={setDayData}
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
                        }}>
                            <Typography variant="h6" sx={{ margin: 1 }}>Confirmar y crear:</Typography>
                            <Typography sx={{ margin: 1 }}>
                                Por favor revisa la información antes de crear la cancha.
                            </Typography>

                            <Typography><h2>{fieldData.name}</h2></Typography>
                            <Typography><h3>Descripción: {fieldData.description}</h3></Typography>
                            <Typography><h3>Deporte: {fieldData.sport}</h3></Typography>
                            <Typography><h3>Tipo de cancha: {fieldData.fieldType}</h3></Typography>
                            <Typography><h3>Tipo de piso: {fieldData.floorType}</h3></Typography>
                            <Typography><h3>Iluminación: {fieldData.illumination === true ? 'SI' : 'NO'}</h3></Typography>
                            <FieldDayAvailability
                                editable={false}
                                data={fieldData.availability}
                                onAddData={handleAddDayData}
                                onDeleteData={handleDeleteDayData}
                                selectedDay={selectedDay}
                                setSelectedDay={setSelectedDay}
                                dayData={dayData}
                                setDayData={setDayData}
                            />
                            TODO: ADD PHOTOS AND SELECT THE POSTER PHOTO

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
                                    {editMode ? 'Guardar cambios' : 'Crear cancha'}
                                </Button>
                            </Box>

                        </Box>
                    )}
                </Box>
            </Box>
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={5000}
                onClose={() => setSnackBarOpen(false)}
            >
                <Alert severity={snackBarSeverity as AlertColor} onClose={() => setSnackBarOpen(false)}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CreateOrUpdateField;
