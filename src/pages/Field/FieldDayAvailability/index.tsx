import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface FieldDayAvailabilityProps {
  day: string;
  data: { openHour: string; closeHour: string; price: number }[];
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
   day,
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
    setDayData({ openHour: '', closeHour: '', price: 0 });
  };

  const handleDeleteDayData = (index: number) => {
    onDeleteData(selectedDay, index);
  };
  return (
    <><FormControl fullWidth>
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
          <TextField
            fullWidth
            label="Hora de apertura"
            value={dayData.openHour}
            onChange={(e) => setDayData({ ...dayData, openHour: e.target.value })} />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Hora de cierre"
            value={dayData.closeHour}
            onChange={(e) => setDayData({ ...dayData, closeHour: e.target.value })} />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            type="number"
            label="Precio"
            value={dayData.price}
            onChange={(e) => setDayData({
              ...dayData,
              price: parseFloat(e.target.value) || 0,
            })} />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddDayData}
        style={{ marginTop: '1rem' }}
      >
        Agregar
      </Button><List>
        <ListItem>
          <ListItemText
            primary={`${day.charAt(0).toUpperCase() + day.slice(1)}: ${data.map((item) => `${item.openHour}-${item.closeHour} ($${item.price})`).join(', ')}`} />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDeleteDayData(0)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List></>
  );
};

export default FieldDayAvailability;
