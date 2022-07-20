import React, { useState, useRef, useEffect } from 'react';
import { Stack, Box } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { colorPickerStyleSx, ColorPickerButton } from './createPalletStyle';

let selectedRandomColor = [];

export default function ColorPicker({ colorPallets, newColors, setNewColors }) {
  const [colorCodes, setColorCodes] = useState('');
  const [colorName, setColorName] = useState('');
  // const [selectedRandomColor, setSelectedRandomColor] = use;

  //add a validation rule for TextValidator
  useEffect(() => {
    ValidatorForm.addValidationRule('isUniqueColorName', value =>
      newColors.every(color => color.name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule('isUniqueColorCode', value =>
      newColors.every(color => {
        console.log();
        return color.color !== colorCodes.hex;
      })
    );
  });

  function submitClickHandler() {
    console.log(colorCodes);
    setNewColors([
      ...newColors,
      { color: !!colorCodes ? colorCodes.hex : '#000', name: colorName }
    ]);
  }
  function randomClickHandler() {
    let iter = true;
    let palletNum;
    let palletIndex;
    let colorNum;
    let colorIndex;

    while (iter) {
      palletNum = colorPallets.length;
      palletIndex = Math.floor(Math.random() * palletNum);
      colorNum = colorPallets[palletIndex].colors.length;
      colorIndex = Math.floor(Math.random() * colorNum);
      if (!selectedRandomColor.includes(`${palletIndex}${colorIndex}`))
        iter = false;
    }
    selectedRandomColor.push(`${palletIndex}${colorIndex}`);

    const color = colorPallets[palletIndex].colors[colorIndex];
    setNewColors([...newColors, { color: color.color, name: color.name }]);
  }
  return (
    <Box sx={colorPickerStyleSx.colorPickerBox}>
      <Stack sx={colorPickerStyleSx.pickerButtonStack}>
        <ColorPickerButton
          onClick={() => setNewColors([])}
          variant='contained'
          bgcolor='#F95656'
          width={'50%'}
        >
          Clear
        </ColorPickerButton>
        <ColorPickerButton
          onClick={() => randomClickHandler()}
          variant='contained'
          bgcolor='#398FF4'
          width={'50%'}
          disabled={newColors.length === 20}
        >
          Random
        </ColorPickerButton>
      </Stack>
      <ChromePicker
        width={'100%'}
        color={colorCodes}
        //setColorCodes execute as user made any change to ChromePicker:
        onChangeComplete={color => setColorCodes(color)}
        onChange={color => setColorCodes(color)}
      />
      <ValidatorForm ref={useRef()} onSubmit={submitClickHandler}>
        <TextValidator
          sx={{ margin: '2rem' }}
          label='Color Name'
          onChange={e => setColorName(e.target.value)} //setColorName execute as user types
          name='ColorName'
          value={colorName}
          validators={['required', 'isUniqueColorName', 'isUniqueColorCode']} //list of val.. rules
          errorMessages={[
            'this field is required',
            'This name is taken',
            'This code is taken'
          ]}
        />
        <ColorPickerButton
          variant='contained'
          type='submit'
          bgcolor={colorCodes.hex}
          width={'100%'}
          disabled={newColors.length === 20}
        >
          Add Color
        </ColorPickerButton>
      </ValidatorForm>
    </Box>
  );
}
