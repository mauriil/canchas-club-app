/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { localidades } from '../../helpers/locations/locations.json'
import { useEffect, useState } from 'react';

const DepartmentDropdown = ({ province, value, onChange, error }) => {
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    void searchDepartments(province);
  }, [province])

  const searchDepartments = (province: string) => {
    if (!province) return;
    const departments = localidades.filter((objeto) => {
      return objeto.provincia.nombre.toLowerCase() === province.toLowerCase();
    });
    // make departments an array of strings
    let departmentsArray = [];
    if (province === 'Ciudad Autónoma de Buenos Aires') {
      departmentsArray = departments.map((department) => {
        return `${department.nombre[0].toUpperCase()}${department.nombre.slice(1).toLowerCase()}`;
      });
    } else {
      departmentsArray = departments.map((department) => {
        return department.departamento.nombre;
      });
    }
    // remove duplicates
    const uniqueDepartments = [...new Set(departmentsArray)];
    // order alphabetically
    uniqueDepartments.sort((a, b) => a.localeCompare(b));
    setDepartments(uniqueDepartments);
  }

  return (
    <FormControl fullWidth sx={{ marginBottom: 2 }}>
      <InputLabel>Departamento</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error}
      >
        {departments.map((department, index) => (
          <MenuItem key={index} value={department}>
            {department}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DepartmentDropdown;
