/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from "react";
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Avatar, Snackbar, Alert, AlertColor, Pagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Club } from "../../../types/clubs";
import { useNavigate, useParams } from "react-router-dom";
import { deleteField, getAllByClubId } from "../../../api/fields";
import { Field, FieldResponse } from "../../../types/fields";
import { getClubById } from "../../../api/clubs";
import TopBar from "../../../components/TopBar";
import { Share } from "@mui/icons-material";
import ClubAvatar from "../../../components/ClubAvatar";
import CanchasClubLoader from "../../../components/Loader";
import { PlanStatus } from "../../../types/users";
import { getPlanStatus } from "../../../api/users";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import useScreenSize from "../../../customHooks/screenSize";

const ClubManagement = () => {
    const screenWidth = useScreenSize().width;
    const navigate = useNavigate();
    const { clubId } = useParams();
    const [clubData, setClubData] = useState<Club>(
        {
            _id: "",
            name: "",
            address: "",
            description: "",
            logo: "",
            alias: "",
            reservationMode: "full",
            province: "",
            department: "",
            closedDays: [""],
            colors: {
                primary: "",
                secondary: "",
            },
            location: {
                type: "Point",
                coordinates: [0, 0],
            },
        },
    );
    const [fields, setFields] = useState<Field[]>([]);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("success");
    const handelSnackClose = () => {
        setSnackBarOpen(false);
    }
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [fieldToDelete, setFieldToDelete] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    function handleShareClick(): void {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        navigator.clipboard.writeText(`${import.meta.env.VITE_LANDING_URL}${clubData.alias}`)
            .then(() => {
                setSnackBarMessage("URL copiada al portapapeles");
                setSnackBarSeverity("success");
                setSnackBarOpen(true);
            })
            .catch((error) => {
                console.error("Error al copiar la URL:", error);
            });
    }
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        void fetchClubData(value);
      }

    async function fetchClubData(page = 1) {
        try {
            setIsLoading(true);
            const clubInfo = await getClubById(clubId);
            const fieldsOfClubInfo = await getAllByClubId(clubId, page);
            if (fieldsOfClubInfo.ok && clubInfo.ok) {
                const clubData = await clubInfo.json() as Club
                setClubData(clubData);
                const fields = await fieldsOfClubInfo.json() as FieldResponse;
                setFields(fields.fields);
                setTotalPages(fields.totalPages);
                setIsLoading(false);
            } else {
                console.error("Error fetching club data:", fieldsOfClubInfo.statusText, clubInfo.statusText);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching club data:", error);
        }
    }

    useEffect(() => {
        void fetchClubData();
    }, [clubId]);

    const handleEditClub = () => {
        navigate(`edit`);
    };

    if (isLoading) {
        return (
            <CanchasClubLoader width={screenWidth < 900 ? '30%' : '10%'} />
        );
    }

    const handleEditField = (fieldId: string) => {
        navigate(`fields/${fieldId}`);
    };

    const handleAddField = async () => {
        try {
            setIsLoading(true);
            const planStatus: PlanStatus = await getPlanStatus();
            if (planStatus.remainingFieldCreations > 0) {
                navigate("fields");
            } else {
                setSnackBarMessage("No tienes más creaciones de canchas disponibles, actualiza tu plan");
                setSnackBarSeverity("error");
                setSnackBarOpen(true);
            }
        } catch (error) {
            console.error("Error creating field:", error);
        }
    };

    const handleDeleteField = async () => {
        if (fieldToDelete === undefined) return
        try {
            setIsLoading(true);
            await deleteField(fieldToDelete);
            setSnackBarMessage("Cancha eliminada");
            setSnackBarSeverity("success");
            setSnackBarOpen(true);
            setOpenDeleteDialog(false);
            void fetchClubData();
        } catch (error) {
            console.error("Error creating club:", error);
        }
    };

    return (
        <>
            <TopBar backUrl="/dashboard/miClub" />

            <Box
                sx={{
                    padding: "1rem",
                    minHeight: '100vh',
                    overflow: 'auto',
                }}
            >
                {/* Información del Club */}
                <Box sx={{
                    marginBottom: "5rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>

                    <ClubAvatar
                        width="130px"
                        height="130px"
                        title={clubData.name}
                        logo={clubData.logo}
                        colors={clubData.colors}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            margin: "1rem",
                            marginBottom: "1rem",
                            "& > *": {
                                marginLeft: "1.5rem",
                            },
                            gap: "1rem",
                        }}
                    >
                        <>
                            <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={handleEditClub}>
                                Editar Club
                            </Button>
                            <Button variant="outlined" color="secondary" startIcon={<Share />} onClick={handleShareClick} >
                                Social link
                            </Button>
                            <Snackbar open={snackBarOpen} autoHideDuration={4000} onClick={handelSnackClose} onClose={handelSnackClose}>
                                <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
                                    {snackBarMessage}
                                </Alert>
                            </Snackbar>
                        </>
                    </Box>
                </Box>

                {/* Canchas */}
                <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                    Canchas
                </Typography>
                {fields.length > 0 ? (
                    fields.map((field) => (
                        <Accordion key={field._id} sx={{ maxHeight: 'calc(100vh - 300px)', backgroundColor: "#F5F5F5" }}>
                            <AccordionSummary>
                                <Box display="flex" alignItems="center">
                                    <Box ml={2}> {/* Espacio entre la imagen y el título */}
                                        <img src={`https://canchas-club.s3.amazonaws.com/${field.photos[0]}`} alt="Cancha" width="60px" height="60px" style={
                                            {
                                                borderRadius: "10%",
                                                border: "1px solid #000",
                                                objectFit: "cover",
                                            }
                                        } />
                                    </Box>
                                    <Typography sx={{ marginLeft: "2rem", }}>{field.name}</Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box>
                                    <Typography><strong>Nombre:</strong> {field.name}</Typography>
                                    <Typography><strong>Deporte:</strong> {field.sport}</Typography>
                                    <Typography><strong>Descripción:</strong> {field.description}</Typography>
                                </Box>
                                <Box sx={{
                                    marginLeft: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    marginTop: "1rem",
                                }}>
                                    <Button sx={{ width: '40%' }} variant="outlined" color="primary" startIcon={<EditIcon />} onClick={() => handleEditField(field._id)}>
                                        Editar
                                    </Button>
                                    <Button sx={{ width: '40%' }} variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => { setOpenDeleteDialog(true); setFieldToDelete(field._id) }}>
                                        Eliminar
                                    </Button>
                                </Box>

                            </AccordionDetails>
                        </Accordion>
                    )))
                    : (
                        <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
                            No hay canchas registradas
                        </Typography>
                    )}

                {fields.length > 0 && (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        sx={{
                            backgroundColor: 'white',
                            padding: '1rem',
                            marginBottom: screenWidth < 900 ? '5rem' : '0px'
                        }}
                    >
                        <Pagination count={totalPages} color="primary" variant="outlined" siblingCount={0} onChange={handlePageChange} />
                    </Box>
                )}



                <ConfirmationDialog
                    open={openDeleteDialog}
                    onClose={() => setOpenDeleteDialog(false)}
                    onConfirm={handleDeleteField}
                    title={'Eliminar Cancha'}
                    message={`¿Estás seguro que querés elimminar la cancha?
                                    Todos los datos se van a eliminar.
                                    Esta acción no se puede deshacer.`}
                />



                {/* Botón para Agregar Cancha */}
                <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{
                    marginTop: "2rem",
                }} onClick={handleAddField}>
                    Agregar Cancha
                </Button>
            </Box>
        </>
    );
};

export default ClubManagement;
