import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import './ClubClosedDaysPicker.css';

const ClosedDaysPicker = ({ selectedDays, onChange }) => {
  const fetchArgentinianHolidays = async () => {
    const currentYear = new Date().getFullYear();
    const response = await fetch(
      `https://nolaborables.com.ar/api/v2/feriados/${currentYear}`
    );
    const data = await response.json();

    const holidays = data.map((holiday) => new Date(currentYear, holiday.mes - 1, holiday.dia));
    holidays.forEach((holiday, index) => {
      holidays[index] = holiday.toISOString().substring(0, 10);
    });

    return holidays;
  };

  const [selectedDates, setSelectedDates] = useState(
    selectedDays.filter((day) => day !== '')
  );

  const handleDateClick = (date) => {
    const dateISOString = date.toISOString().substring(0, 10);
    console.log("🚀 ~ file: index.tsx:27 ~ handleDateClick ~ dateISOString:", dateISOString)
    const updatedDates = selectedDates.includes(dateISOString)
      ? selectedDates.filter((d) => d !== dateISOString)
      : [...selectedDates, dateISOString];

    setSelectedDates(updatedDates);
    onChange(updatedDates);
  };

  const handleClearSelectedDates = () => {
    setSelectedDates([]);
  };

  const tileContent = ({ date }) => {
    const dateISOString = date.toISOString().substring(0, 10);
    return selectedDates.includes(dateISOString) ? (
      <div className="selected-day"></div>
    ) : null;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginTop: "1rem",
      }}>
      <Button
        variant="outlined"
        onClick={async () => {
          const holidays = await fetchArgentinianHolidays();
          setSelectedDates([...selectedDates, ...holidays]);
        }}
        sx={{ marginBottom: "1rem" }}
      >
        Tomar feriados argentinos del año en curso ({new Date().getFullYear()})
      </Button>


      <Calendar
        onClickDay={handleDateClick}
        tileContent={tileContent}
        locale='es'
        value={selectedDates.map((date) => new Date(date))}
      />
      <Button
        variant="outlined"
        color="warning"
        startIcon={<CalendarTodayIcon />}
        onClick={handleClearSelectedDates}
        sx={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        Limpiar días seleccionados
      </Button>
      {selectedDates.length > 0 && (<Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={
          {
            borderRadius: "15px",
            marginTop: "1rem",
            width: "70vw",
          }
        }>
          <Typography variant="h6">Días seleccionados</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            {selectedDates.map((date) => (
              <li key={date}>{date}</li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>

      )}
    </Box>
  );
};

export default ClosedDaysPicker;
