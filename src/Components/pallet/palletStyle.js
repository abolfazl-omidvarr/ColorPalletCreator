import styled from '@emotion/styled';
import { styled as muiStyled } from '@mui/material/styles';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import breakpoints from '../../breakPoints';

const ColorBoxDiv = styled.div(props => ({
  backgroundColor: props.bgColor,
  position: 'relative',
  width: '100%',
  height: '100%',
  transition: 'all 0.1s',
  cursor: 'pointer',
  '.colorBox-content': {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: '-100%',
    transform: 'translate(0, -100%)'
  },
  button: {
    backgroundColor: '#ffffff77',
    border: 'none',
    padding: '2px 15px',
    transition: 'all 0.2s',
    cursor: 'pointer'
  },
  '.copy': {
    position: 'absolute',
    top: '50%',
    right: '50%',
    transform: 'translate(50%, -50%)',
    borderRadius: '5px',
    opacity: '0'
  },
  '.more': {
    padding: '5px 15px',
    border: 'none',
    opacity: '0',
    borderRadius: '10px 0 0 0',
    '&:hover': {
      backgroundColor: '#ffffff94'
    },
    '&:active': {
      backgroundColor: '#ffffffc0'
    }
  },
  '.name': {
    color: props.lum,
    transform: 'translate(2px, 0px)'
  },
  '&:hover': {
    boxShadow: 'inset 0px 0px 24px 3px rgba(0, 0, 0, 0.09)',
    '.copy, .more': {
      opacity: '1'
    }
  },
  '.copy-overlay': {
    position: 'absolute',
    opacity: '0',
    zIndex: '0',
    width: '100%',
    height: '100%',
    transform: 'scale(1)',
    transition: ' transform 0.3s ease-in-out'
  },
  '.copy-overlay-active': {
    opacity: '1',
    transform: 'scale(50)',
    zIndex: '10',
    position: 'absolute'
  },
  '.copy-msg-container': {
    fontFamily: '"Raleway", sans-serif',
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '-1',
    opacity: '0',
    transition: ' opacity 0.3s ease-in-out',
    transitionDelay: '0.2s',

    '.copy-msg-text': {
      fontSize: '5rem',
      textAlign: 'center',
      letterSpacing: '10px',
      backgroundColor: '#ffffff52',
      width: '100%',
      padding: '1rem'
    },

    '.copy-msg-colorCode': {
      textAlign: 'center',
      fontSize: '2.5rem',
      fontWeight: 'bolder',
      marginTop: '1rem',
      color: props.lum
    }
  },
  '.copy-msg-container-active': {
    zIndex: '25',
    opacity: '1'
  },
  [breakpoints.sizeUp('sm')]: {
    height: props.colorShades ? '100%' : '60px',
    '.more': {
      opacity: 1
    }
  }
}));

const PalletColorsDiv = styled.div(() => ({
  display: 'grid',
  gridTemplateColumns: ' repeat(4,1fr)',
  gridTemplateRows: 'auto',
  backgroundColor: '#00000044',
  height: '89vh',
  overflowY: 'hidden',
  overflowX: 'hidden',
  [breakpoints.sizeUp('md')]: {
    gridTemplateColumns: ' repeat(2,1fr)',
    gridTemplateRows: 'auto'
  },
  [breakpoints.sizeUp('sm')]: {
    gridTemplateColumns: ' repeat(1,1fr)',
    gridTemplateRows: 'auto',
    overflowY: 'scroll'
  }
}));

const PalletFooterDiv = styled.div(() => ({
  position: 'absolute',
  width: '100%',
  height: '5vh',
  background: 'linear-gradient(to right, #ddefbb, #ffeeee)',
  p: {
    transform: 'translate(1%, 40%)',
    fontSize: '1.1rem',
    fontWeight: 'bold'
  }
}));

const ColorShadeDiv = styled.div(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(5,1fr)',
  height: '90vh',
  [breakpoints.sizeUp('md')]: {
    gridTemplateColumns: 'repeat(2,1fr)'
  }
}));

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
      [breakpoints.sizeUp('md')]: {
        height: '250px'
      }
    },
    '.MiniPallet-title': {
      display: 'grid',
      gridTemplateColumns: '4fr 1fr 1fr',
      alignItems: 'center',
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

const PalletNav = styled.nav(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'linear-gradient(to right,#ddefbb,#ffeeee)',
  height: '6vh',
  '.NavBar-back': {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    transition: 'all 0.2s',
    backgroundColor: '#ff7979',
    cursor: 'pointer',
    boxShadow:
      'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
    '&:hover': {
      boxShadow:
        'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
      backgroundColor: '#eb4d4b'
    },
    [breakpoints.sizeUp('md')]: {
      display: 'none'
    }
  },
  select: {
    justifySelf: 'flex-start'
  },
  '.NavBar-BackSlider-container': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    marginLeft: '1rem'
  },
  '.NavBar-logo': {
    padding: ' 1rem 1rem',
    borderRadius: '15px',
    margin: '0.4rem 1rem 0.4rem 0.4rem',
    boxShadow:
      'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em',
    background: 'linear-gradient(268deg, #afaf48, #ccccb2)',
    backgroundSize: '400% 400%',
    a: {
      textDecoration: 'none',
      color: 'rgb(27, 26, 25)'
    }
  }
}));

const CreatePalletDiv = styled.div(props => ({
  overflow: 'hidden',
  position: 'relative',
  height: '100vh',
  backgroundColor: 'blue'
}));

const ColorPickerDiv = styled.div(props => ({
  display: 'grid',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%'
}));

export {
  ColorBoxDiv,
  PalletFooterDiv,
  PalletColorsDiv,
  ColorShadeDiv,
  MiniPalletPaper,
  MiniPalletColorDiv,
  PalletNav,
  CreatePalletDiv,
  ColorPickerDiv
};
