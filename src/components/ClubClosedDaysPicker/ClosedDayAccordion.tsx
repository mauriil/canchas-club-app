import { Accordion, AccordionDetails, AccordionSummary, Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ClosedDaysAccordionProps {
    selectedDates: Date[] | string[];
}

const ClosedDaysAccordion = ({ selectedDates }: ClosedDaysAccordionProps) => {

    function formatDateToARGString(dateString) {
        const daysOfWeek = [
            'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
        ];

        const months = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
            'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        const date = new Date(dateString);
        const dayOfWeek = daysOfWeek[date.getDay() + 1];
        const day = date.getDate() + 1;
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${dayOfWeek} ${day} de ${month} de ${year}`;
    }

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon
            />} sx={
                {
                    borderRadius: "15px",
                    marginTop: "1rem",
                    width: "70vw",
                }
            }>
                <Typography variant="h6">Días cerrados</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ul>
                    {selectedDates.map((date) => (
                        <li key={date}>{formatDateToARGString(date)}</li>
                    ))}
                </ul>
            </AccordionDetails>
        </Accordion>
    );
};

export default ClosedDaysAccordion;
