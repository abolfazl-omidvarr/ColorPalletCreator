
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

//this component is just a simple slider provided by mui
export default function ColorSlider({ setLevel }) {
  return (
    <Box sx={{ width: 150 }}>
      <Slider
        aria-label='degree'
        defaultValue={500}
        valueLabelDisplay='off'
        step={100}
        marks
        min={100}
        max={900}
        onChange={e => setLevel(e.target.value)}
      />
    </Box>
  );
}
