import React, { useState } from 'react';
import {
  IconButton,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HalfHourTimeSelector from './HalfHoursSelector.jsx';

interface FieldDayAvailabilityProps {
  editable: boolean;
  data: {
    [key: string]: { openHour: string; closeHour: string; price: number }[];
  };
  onAddData: (day: string, data: { openHour: string; closeHour: string; price: number }) => void;
  onDeleteData: (day: string, index: number) => void;
  selectedDay: string;
  setSelectedDay: React.Dispatch<React.SetStateAction<string>>;
  dayData: {
    openHour: string;
    closeHour: string;
    price: number;
  };
  setDayData: React.Dispatch<
    React.SetStateAction<{
      openHour: string;
      closeHour: string;
      price: number;
    }>
  >;
}

const FieldDayAvailability: React.FC<FieldDayAvailabilityProps> = ({
  editable,
  data,
  onAddData,
  onDeleteData,
  selectedDay,
  setSelectedDay,
  dayData,
  setDayData,
}) => {
  const handleAddDayData = () => {
    onAddData(selectedDay, dayData);
    setDayData({ openHour: '08:00', closeHour: '08:30', price: 0 });
  };
  const spanishDays = {
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo',
  };

  const handleDeleteDayData = (day: string, index: number) => {
    if (data[day] && data[day].length > index) {
      data[day].splice(index, 1);
      onDeleteData(day, index);
    }
  };

  return (
    <Box sx={{
      width: '100%',
    }}>
      {editable && (
        <>
          <FormControl fullWidth sx={{
            marginTop: '2rem',
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <InputLabel htmlFor="day-select">Día</InputLabel>
            <Select
              labelId="day-select-label"
              id="day-select"
              fullWidth
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value as string)}
            >
              <MenuItem value="monday">Lunes</MenuItem>
              <MenuItem value="tuesday">Martes</MenuItem>
              <MenuItem value="wednesday">Miércoles</MenuItem>
              <MenuItem value="thursday">Jueves</MenuItem>
              <MenuItem value="friday">Viernes</MenuItem>
              <MenuItem value="saturday">Sábado</MenuItem>
              <MenuItem value="sunday">Domingo</MenuItem>
            </Select>
          </FormControl><Grid container spacing={2}>
            <Grid item xs={4}>
              <HalfHourTimeSelector
                label="Hora de apertura"
                value={dayData.openHour}
                onChange={(e) => setDayData({ ...dayData, openHour: e.target.value })}
              />
            </Grid>
            <Grid item xs={4}>
              <HalfHourTimeSelector
                label="Hora de cierre"
                value={dayData.closeHour}
                onChange={(e) => setDayData({ ...dayData, closeHour: e.target.value })}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="number"
                label="Precio ARS($)"
                value={dayData.price}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                onSelect={(e) => {
                  e.target.value = "";
                }}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const isValidPrice = /^\d*\.?\d*$/.test(inputValue);
                  if (isValidPrice || inputValue !== "") {
                    setDayData({
                      ...dayData,
                      price: parseFloat(inputValue),
                    });
                  }
                }} />
            </Grid>
          </Grid><Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddDayData}
            style={{ marginTop: '2rem', marginBottom: '2rem', width: '50%', marginLeft: '25%', color: 'white' }}
          >
            Agregar
          </Button>
        </>
      )}

      <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Día</TableCell>
              <TableCell>Horario</TableCell>
              <TableCell>Precio</TableCell>
              {editable && <TableCell>Eliminar</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              Object.keys(data).map((day) => {
                return data[day].map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{spanishDays[day as keyof typeof spanishDays]}</TableCell>
                      <TableCell>{`${item.openHour}-${item.closeHour}`}</TableCell>
                      <TableCell>{`$${item.price}`}</TableCell>
                      {editable && (
                        <TableCell>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteDayData(day, index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })
              })
            }
          </TableBody>
        </Table>
      </TableContainer>


    </Box>
  );
};

export default FieldDayAvailability;
