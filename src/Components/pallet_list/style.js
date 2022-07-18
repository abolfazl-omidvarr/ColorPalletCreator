import styled from '@emotion/styled';
import { styled as muiStyled } from '@mui/material/styles';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';

const MiniPalletPaper = muiStyled(Paper)(props => {
  return {
    ...props.theme.typography.body2,
    padding: props.theme.spacing(1, 1, 0, 1),
    textAlign: 'center',
    color: props.theme.palette.text.secondary,
    overflow: 'Hidden',
    backgroundColor: props.bgcolor,
    margin: '0rem 1rem 1.5rem 1rem',
    transition: 'all 0.2s',
    transform: 'scale(0)',
    cursor: 'pointer',
    borderRadius: '8px',
    boxShadow:
      'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
    '&:hover': {
      boxShadow:
        'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
      transform: 'scale(1.05)'
    },

    '.MiniPallet-name': {
      justifySelf: 'start',
      marginLeft: '8px',
      color: '#000'
    },
    '.MiniPallet-emoji': {
      fontSize: '18px',
      justifySelf: 'start'
    },
    '.MiniPallet-colors': {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gridTemplateRows: 'repeat(4, 1fr)',
      height: '200px',
      overflow: 'Hidden',
      borderRadius: '10px',
      boxShadow:
        'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;',
      '@media (max-width: 900px)': {
        height: '250px'
      }
    },
    '.MiniPallet-title': {
      display: 'grid',
      gridTemplateColumns: '4fr 1fr 1fr',
      alignItems: 'center',
      // justifyContent: "space-between",
      padding: '0rem 0rem 0 0rem'
    }
  };
});

const MiniPalletColorDiv = muiStyled(Box)(props => ({
  display: 'inline-block',
  width: '100%',
  height: '100%',
  backgroundColor: props.bgcolor
}));

const CreatePalletDiv = styled.div(props => ({
  overflow: 'hidden',
  position: 'relative',
  height: '100vh',
  backgroundColor: 'blue'
}));

export { MiniPalletPaper, MiniPalletColorDiv, CreatePalletDiv };
