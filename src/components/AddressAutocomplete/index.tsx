import React, { useState } from 'react';
import { TextField } from '@mui/material';

const AddressAutocomplete = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePlaceSelect = (place) => {
    const address = place.formatted_address;
    setInputValue(address);
    onChange(address);
  };

  const handleScriptLoad = () => {
    const options = {
      types: ['address'],
      componentRestrictions: { country: 'ar' }, // Limit to Argentina
    };
    const autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('address-input'), options);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      handlePlaceSelect(place);
    });
  };

  return (
    <TextField
      id="address-input"
      label="Dirección"
      fullWidth
      value={inputValue}
      onChange={handleInputChange}
      onBlur={() => onChange(inputValue)}
      onFocus={handleScriptLoad}
      sx={{ marginBottom: 2, }}
    />
  );
};

export default AddressAutocomplete;
