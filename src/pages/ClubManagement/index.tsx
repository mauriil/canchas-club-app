import { useEffect, useState } from "react";
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AvatarIcon from "../../components/Avatar";
import { Club } from "../../types/clubs";
import { useParams } from "react-router-dom";
import { getAllByClubId } from "../../api/fields";
import { Field } from "../../types/fields";
import { getClubById } from "../../api/clubs";

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

    useEffect(() => {
        async function fetchClubData() {
            try {
                const clubInfo = await getClubById(clubId);
                const fieldsOfClubInfo = await getAllByClubId(clubId);
                if (fieldsOfClubInfo.ok && clubInfo.ok) {
                    setClubData(await clubInfo.json() as Club);
                    const data = await fieldsOfClubInfo.json() as Field[];
                    setFields(data);
                    console.log("🚀 ~ file: index.tsx:22 ~ fetchClubData ~ data:", data)
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
                {editClubMode ? (
                    <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleEditClub}>
                        Guardar Cambios
                    </Button>
                ) : (
                    <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={handleEditClub}>
                        Editar Club
                    </Button>
                )}
            </Box>

            {/* Canchas */}
            <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                Canchas
            </Typography>
            {
                fields.map((field) => (
                    <Accordion key={field._id} sx={{ maxHeight: 'calc(100vh - 300px)', backgroundColor: "#F5F5F5"}}>
                        <AccordionSummary>
                            <Box display="flex" alignItems="center">
                                <Box ml={2}> {/* Espacio entre la imagen y el título */}
                                    <Avatar alt="Cancha" src="url_de_la_imagen" sx={{ width: 60, height: 60 }} />
                                </Box>
                                <Typography>{field.name}</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box >
                                <Typography><strong>Nombre:</strong> {field.name}</Typography>
                                <Typography><strong>Deporte:</strong> {field.sport}</Typography>
                                <Typography><strong>Descripción:</strong> {field.description}</Typography>
                            </Box>
                            <Box sx={{
                                marginLeft: "auto",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: "1rem",
                            }}>
                                <Button variant="outlined" color="primary" startIcon={<EditIcon />}>
                                    Editar
                                </Button>
                                <Button variant="outlined" color="secondary" startIcon={<DeleteIcon />}>
                                    Eliminar
                                </Button>
                            </Box>

                        </AccordionDetails>
                    </Accordion>
                ))
            }

            {/* Botón para Agregar Cancha */}
            <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{
                marginTop: "2rem",
            }}>
                Agregar Cancha
            </Button>
        </Box>
    );
};

export default ClubManagement;
