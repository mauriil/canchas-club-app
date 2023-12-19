import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Container, Typography } from '@mui/material';

const HalfHourTimeSelector = ({ day, startTime, endTime, onStartTimeChange, onEndTimeChange, fromHour, toHour, halfHourError, noAvailableHours }) => {
  const currentTime = new Date();
  const selectedDay = new Date(day);
  const [halfHourOptions, setHalfHourOptions] = useState([]);

  useEffect(() => {
    generateHalfHourOptions();
  }, [fromHour, toHour]);

  const generateHalfHourOptions = () => {
    const options = [];
    let currentHour = fromHour;
    // begin while loop frim current time plus half hour if currentHour is less than current time
    if (
      currentTime > selectedDay &&
      currentTime.getHours() > parseInt(currentHour.split(':')[0], 10)
    ) {
      const [hour, minutes, secondAndPMAM] = currentTime.toLocaleTimeString({
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        region: 'es-AR',
      }).split(':');
      const [second, PMAM] = secondAndPMAM.split(' ');
      let correctHour = hour;
      if (PMAM === 'PM') {
        correctHour = (parseInt(hour, 10) + 12).toString().padStart(2, '0');
      }
      const nextMinutes = parseInt(minutes, 10) + 30;
      if (nextMinutes >= 60) {
        const nextHour = (parseInt(correctHour, 10) + 1).toString().padStart(2, '0');
        currentHour = `${nextHour}:00`;
      } else {
        const nextMinutesStr = nextMinutes.toString().padStart(2, '0');
        currentHour = `${correctHour}:30`;
      }
    }
    while (currentHour <= toHour) {
      options.push(currentHour);
      const [hour, minutes] = currentHour.split(':');
      const nextMinutes = parseInt(minutes, 10) + 30;
      if (nextMinutes === 60) {
        const nextHour = (parseInt(hour, 10) + 1).toString().padStart(2, '0');
        currentHour = `${nextHour}:00`;
      } else {
        const nextMinutesStr = nextMinutes.toString().padStart(2, '0');
        currentHour = `${hour}:${nextMinutesStr}`;
      }
    }
    if (toHour === '23:59') {
      options.push('23:59');
    }
    setHalfHourOptions(options);

    if (options.length === 0) {
      noAvailableHours();
    }
  };

  return (
      halfHourOptions.length === 0 ? (
        <Container sx={{
          mt: 2,
          mb: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
          <Typography sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>Lo sentimos, los horarios disponibles para reserva ya han pasado. ¿Podrías intentar buscar en otro día o elegir una franja horaria diferente?</Typography>
        </Container>
      )
        : (
          <>
            <FormControl sx={{ mb: 2, mt: 2, width: '50%' }}>
              <InputLabel>Desde</InputLabel>
              <Select value={startTime} onChange={onStartTimeChange} error={halfHourError}>
                {halfHourOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl><FormControl sx={{ mb: 2, mt: 2, width: '50%' }}>
              <InputLabel>Hasta</InputLabel>
              <Select value={endTime} onChange={onEndTimeChange} error={halfHourError}>
                {halfHourOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {halfHourError && (
              <p className="error">El turno debe ser de 1 hora mínimo</p>
            )}
          </>
        )
  );
};

export default HalfHourTimeSelector;
