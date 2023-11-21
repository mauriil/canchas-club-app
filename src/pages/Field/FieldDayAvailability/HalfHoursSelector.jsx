import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const HalfHourTimeSelector = ({ label, value, onChange }) => {
    const halfHourOptions = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const formattedHour = hour.toString().padStart(2, '0');
            const formattedMinute = minute.toString().padStart(2, '0');
            halfHourOptions.push(`${formattedHour}:${formattedMinute}`);
        }
    }
    halfHourOptions.push('24:00');

    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                onChange={onChange}
            >
                {halfHourOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default HalfHourTimeSelector;
