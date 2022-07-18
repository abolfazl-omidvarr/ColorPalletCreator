
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
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
