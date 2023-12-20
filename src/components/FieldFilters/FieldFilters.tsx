import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox, FormControl, FormControlLabel, InputLabel, Select } from '@mui/material';
import { localidades } from '../../helpers/locations/locations.json'
import { getPlanStatus } from '../../api/users';

interface FieldFiltersProps {
    onFilterChange: (filterName: string, filterValue: string) => void;
}
export default function FieldFilters({ onFilterChange }: FieldFiltersProps) {
    const [isPremium, setIsPremium] = React.useState(false);

    const checkPremium = async () => {
        const planStatus = await getPlanStatus();
        setIsPremium(planStatus.type !== "free" && planStatus.status === "active");
    };
    const provinces = [
        'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos',
        'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro',
        'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'
    ];

    const [departments, setDepartments] = React.useState([]);
    const searchDepartments = (province: string) => {
        if (!province) return;
        const departments = localidades.filter((objeto) => {
            return objeto.provincia.nombre.toLowerCase() === province.toLowerCase();
        });
        // make departments an array of strings
        const departmentsArray = departments.map((department) => {
            return department.localidad_censal.nombre;
        });
        // remove duplicates
        const uniqueDepartments = [...new Set(departmentsArray)];
        // order alphabetically
        uniqueDepartments.sort((a, b) => a.localeCompare(b));
        setDepartments(uniqueDepartments);
    }

    React.useEffect(() => {
        void checkPremium();
    }, []);

    return (
        <Accordion sx={{
            backgroundColor: "#F5F5F5",
            marginBottom: "1rem",
            position: "sticky",
            top: "50px",
            zIndex: "100",
        }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography>Filtros</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormControl fullWidth sx={{ marginBottom: 1 }}>
                    <FormControlLabel
                        control={
                            <Select
                                native
                                onChange={(event) => onFilterChange("sport", event.target.value)}
                                inputProps={{
                                    name: "sport",
                                    id: "sport-select",
                                }}
                                sx={{ width: "100%" }}
                            >
                                <option value="">Todos</option>
                                <option value="football">Futbol</option>
                                <option value="football5">Futbol 5</option>
                                <option value="football7">Futbol 7</option>
                                <option value="football9">Futbol 9</option>
                                <option value="football11">Futbol 11</option>
                                <option value="basketball">Basket</option>
                                <option value="tennis">Tenis</option>
                                <option value="paddle">Padel</option>
                                <option value="rugby">Rugby</option>
                                <option value="hockey">Hockey</option>
                                <option value="volleyball">Voley</option>
                            </Select>
                        }
                        label="Deporte"
                        labelPlacement='top'
                    />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 1 }}>
                    <FormControlLabel
                        control={
                            <Select
                                native
                                onChange={(event) => onFilterChange("fieldType", event.target.value)}
                                inputProps={{
                                    name: "fieldType",
                                    id: "fieldType-select",
                                }}
                                sx={{ width: "100%" }}
                            >
                                <option value="">Cubierta y Descubierta</option>
                                <option value="indoor">Cubierta</option>
                                <option value="outdoor">Descubierta</option>
                            </Select>
                        }
                        label="Tipo de cancha"
                        labelPlacement='top'
                    />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 1 }}>
                    <FormControlLabel
                        control={
                            <Select
                                native
                                onChange={(event) => onFilterChange("floorType", event.target.value)}
                                inputProps={{
                                    name: "floorType",
                                    id: "floorType-select",
                                }}
                                sx={{ width: "100%" }}
                            >
                                <option value="">Todos</option>
                                <option value="grass">Césped natural</option>
                                <option value="natural">Césped sintético</option>
                                <option value="concrete">Cemento alisado</option>
                                <option value="parquet">Parquet</option>
                                <option value="tar">Asfalto</option>
                            </Select>
                        }
                        label="Tipo de piso"
                        labelPlacement='top'
                    />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 1 }}>
                    <FormControlLabel
                        control={
                            <Select
                                native
                                onChange={(event) => onFilterChange("illumination", event.target.value)}
                                inputProps={{
                                    name: "illumination",
                                    id: "illumination-select",
                                }}
                                sx={{ width: "100%" }}
                            >
                                <option value="true" selected>Si</option>
                                <option value="false">No</option>
                            </Select>
                        }
                        label="Iluminación"
                        labelPlacement='top'
                    />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 1 }}>
                    <FormControlLabel
                        control={
                            <Select
                                native
                                onChange={(event) => { onFilterChange("province", event.target.value); searchDepartments(event.target.value) }}
                                inputProps={{
                                    name: "provincia",
                                    id: "provincia-select",
                                }}
                                sx={{ width: "100%" }}
                            >
                                <option value="" selected>Todas</option>
                                {provinces.map((province, index) => (
                                    <option key={index} value={province}>{province}</option>
                                ))}
                            </Select>
                        }
                        label="Provincia"
                        labelPlacement='top'
                    />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 1 }}>
                    <FormControlLabel
                        control={
                            <Select
                                native
                                onChange={(event) => onFilterChange("department", event.target.value)}
                                inputProps={{
                                    name: "department",
                                    id: "department-select",
                                }}
                                sx={{ width: "100%" }}
                            >
                                <option value="" selected>Todos</option>
                                {departments.map((department, index) => (
                                    <option key={index} value={department}>{department}</option>
                                ))}
                            </Select>
                        }
                        label="Departamento"
                        labelPlacement='top'
                    />
                </FormControl>
                {isPremium &&
                <FormControl fullWidth sx={{ marginBottom: 1 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(event) => onFilterChange("owner-fields", event.target.checked)}
                                inputProps={{
                                    name: "owner-fields",
                                    id: "owner-fields-check",
                                }}
                                sx={{ marginLeft: 2 }}
                            />
                        }
                        label="Canchas propias"
                        labelPlacement='end'
                    />
                </FormControl>
                }
            </AccordionDetails>
        </Accordion>
    );
}