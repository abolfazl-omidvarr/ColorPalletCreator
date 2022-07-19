import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PalletNav } from './style';
import ColorSlider from './colorRange';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import breakpoints from '../../breakPoints';

export default function NavBar({ setLevel, upperSetType, showSlider }) {
  const navigate = useNavigate();
  const [type, setType] = useState('hex'); //code type state hook
  const [snackOpen, setSnackOpen] = useState(false); //show hide snack bar state hook

  //select menu change function handler
  function selectChangeHandler(e) {
    const type = e.target.value; //extract code type from select
    upperSetType(type); //set code type of parent component
    setType(type); //set code type

    setSnackOpen(true); //show snack bar

    setTimeout(function() {
      setSnackOpen(false);
    }, 2000); //hide snack bar after 2 sec
  }
  function handleClose() {
    setSnackOpen(false);
  }
  function backClickHandler() {
    navigate(-1);
  }
  console.log();
  return (
    <PalletNav>
      <div className='NavBar-BackSlider-container'>
        <div className='NavBar-back' onClick={backClickHandler}>
          <ArrowBackIcon />
        </div>
        {showSlider ? <ColorSlider setLevel={setLevel} /> : null}
      </div>
      <Box
        sx={{
          width: 160,
          m: 1,
          [breakpoints.sizeUp('sm')]: {
            width: 100
          }
        }}
      >
        <FormControl fullWidth>
          <InputLabel id='code-type-select'>CodeType</InputLabel>
          <Select
            labelId='code-type-select'
            id='code-type-select'
            value={type}
            label='CodeType'
            onChange={selectChangeHandler}
            sx={{
              height: '30px'
            }}
          >
            <MenuItem key={'hex'} value={'hex'}>
              HEX: #000000
            </MenuItem>
            <MenuItem key={'rgb'} value={'rgb'}>
              RGB: rgb(0,0,0)
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackOpen}
        autoHideDuration={2000}
        message={<span id='message-id'>format Changed!</span>}
        ContentProps={{ 'aria-describedby': 'message-id' }}
        onClose={handleClose}
        action={[
          <IconButton onClick={handleClose} color={'inherit'}>
            <CloseIcon />
          </IconButton>
        ]}
      ></Snackbar>
    </PalletNav>
  );
}
