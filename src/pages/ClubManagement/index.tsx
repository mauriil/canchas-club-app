import { useEffect, useState } from "react";
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Avatar, Snackbar, Alert, AlertColor } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Club } from "../../types/clubs";
import { useParams } from "react-router-dom";
import { getAllByClubId } from "../../api/fields";
import { Field } from "../../types/fields";
import { getClubById } from "../../api/clubs";
import TopBar from "../../components/TopBar";
import { Share } from "@mui/icons-material";

const ClubManagement = () => {
    const { clubId } = useParams();
    const [editClubMode, setEditClubMode] = useState(false);
    const [clubData, setClubData] = useState<Club>(
        {
            _id: "",
            name: "",
            address: "",
            description: "",
            logo: "",
            alias: "",
            city: "",
            country: "",
            closedDays: [""],
            colors: {
                primary: "",
                secondary: "",
                tertiary: "",
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
    function handleShareClick(): void {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        navigator.clipboard.writeText(`${import.meta.env.VITE_APP_URL}${clubData.alias}`)
            .then(() => {
                setSnackBarMessage("URL copiada al portapapeles");
                setSnackBarSeverity("success");
                setSnackBarOpen(true);
            })
            .catch((error) => {
                console.error("Error al copiar la URL:", error);
            });
    }

    useEffect(() => {
        async function fetchClubData() {
            try {
                const clubInfo = await getClubById(clubId);
                const fieldsOfClubInfo = await getAllByClubId(clubId);
                if (fieldsOfClubInfo.ok && clubInfo.ok) {
                    const clubData = await clubInfo.json() as Club
                    setClubData(clubData);
                    const fields = await fieldsOfClubInfo.json() as Field[];
                    setFields(fields);
                } else {
                    console.error("Error fetching club data:", fieldsOfClubInfo.statusText, clubInfo.statusText);
                }
            } catch (error) {
                console.error("Error fetching club data:", error);
            }
        }

        void fetchClubData();
    }, [clubId]);

    const handleEditClub = () => {
        setEditClubMode(!editClubMode);
    };

    if (clubData.name === "") {
        return <div>Loading...</div>;
    }

    return (
        <>
            <TopBar/>

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

                    <Avatar
                        alt={clubData.name}
                        src={clubData.logo}
                        sx={{
                            width: 130,
                            height: 130,
                            backgroundColor: clubData.colors.primary,
                            borderColor: clubData.colors.secondary,
                            borderWidth: "0.5rem",
                            borderStyle: "solid",
                        }} />
                    <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
                        {clubData.name}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            margin: "1rem",
                            marginBottom: "1rem",
                        }}
                    >
                        <>
                            <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={handleEditClub}>
                                Editar Club
                            </Button>
                            <Button variant="outlined" color="secondary" startIcon={<Share />} onClick={handleShareClick} >
                                Social link
                            </Button>
                            <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
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
                {fields.map((field) => (
                    <Accordion key={field._id} sx={{ maxHeight: 'calc(100vh - 300px)', backgroundColor: "#F5F5F5" }}>
                        <AccordionSummary>
                            <Box display="flex" alignItems="center">
                                <Box ml={2}> {/* Espacio entre la imagen y el título */}
                                    <Avatar alt="Cancha" src="url_de_la_imagen" sx={{ width: 60, height: 60 }} />
                                </Box>
                                <Typography>{field.name}</Typography>
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
                                <Button variant="outlined" color="primary" startIcon={<EditIcon />}>
                                    Editar
                                </Button>
                                <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
                                    Eliminar
                                </Button>
                            </Box>

                        </AccordionDetails>
                    </Accordion>
                ))}

                {/* Botón para Agregar Cancha */}
                <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{
                    marginTop: "2rem",
                }}>
                    Agregar Cancha
                </Button>
            </Box></>
    );
};

export default ClubManagement;
