import styled from '@emotion/styled';
import { styled as muiStyled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Paper, Grid } from '@mui/material';
import breakPoints from '../../breakPoints';

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

const CreatePalletDiv = styled.div({
  overflow: 'hidden',
  position: 'relative',
  height: '100vh',
  backgroundColor: 'blue'
});
const PalletListContainer = styled.div`
  --scrollbar-width: 8px;
  --mask-height: 32px;

  overflow-y: auto;
  height: 92%;
  padding-bottom: var(--mask-height);
  padding-top: var(--mask-height);
  --mask-image-content: linear-gradient(
    to bottom,
    transparent,
    black var(--mask-height),
    black calc(100% - var(--mask-height)),
    transparent
  );
  --mask-size-content: calc(100% - var(--scrollbar-width)) 100%;
  --mask-image-scrollbar: linear-gradient(black, black);
  --mask-size-scrollbar: var(--scrollbar-width) 100%;
  mask-image: var(--mask-image-content), var(--mask-image-scrollbar);
  mask-size: var(--mask-size-content), var(--mask-size-scrollbar);
  mask-position: 0 0, 100% 0;
  mask-repeat: no-repeat, no-repeat;
  ${breakPoints.sizeUp('md')} {
    height: 90%;
  }
  // ${breakPoints.sizeUp('sm')} {
  //   height: 98%;
  // }
`;
const PalletListBox = styled(Box)({
  '-webkit-scrollbar-track': {
    WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
    backgroundColor: '#F5F5F5'
  },

  '-webkit-scrollbar': {
    width: '6px',
    backgroundColor: '#F5F5F5'
  },

  '-webkit-scrollbar-thumb': {
    backgroundColor: '#000000'
  },
  height: '100vh',
  position: 'relative',
  margin: 'auto',
  flexGrow: 1,
  paddingTop: '1rem',
  maxWidth: 900,
  nav: {
    height: '70px',
    zIndex: '22',
    top: '0',
    display: 'flex',
    margin: '100px',
    width: '100%',
    margin: '0rem auto 0rem auto',
    backgroundColor: '#ffe6ab40',
    backdropFilter: 'blur(12px)',
    borderRadius: '10px',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1rem',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',
    p: {
      color: '#fff',
      fontSize: '1.5rem'
    },
    '@media (max-width:1200px)': {
      width: '88.5%',
      padding: '1rem 1rem',
      p: {
        color: '#fff',
        fontSize: '1.3rem'
      }
    },
    '@media (max-width:600px)': {
      width: '88.5%',
      padding: '1rem 1rem',
      p: {
        color: '#fff',
        fontSize: '1rem'
      }
    }
  }
});
const GridContainer = muiStyled(Grid)({
  gap: '0',
  alignItems: 'center',
  alignContent: 'center',
  '@media (max-width:600px)': {
    justifyContent: 'center'
  }
});
const createPalletLink = { color: '#fff', cursor: 'pointer' };
export {
  MiniPalletPaper,
  MiniPalletColorDiv,
  CreatePalletDiv,
  PalletListContainer,
  PalletListBox,
  GridContainer,
  createPalletLink
};
