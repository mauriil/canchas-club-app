/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ProvinceDropdown = ({ value, onChange, error, errorValue }) => {
  const provinces = [
    'Buenos Aires', 'Ciudad Autónoma de Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos',
    'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro',
    'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'
  ];



  return (
    <FormControl fullWidth sx={{ marginBottom: 2, }}>
      <InputLabel>Provincia</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error}
      >
        {provinces.map((province, index) => (
          <MenuItem key={index} value={province}>{province}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProvinceDropdown;
