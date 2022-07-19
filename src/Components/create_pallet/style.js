import { styled as muiStyled } from '@mui/material/styles';
import styled from '@emotion/styled';
import { IconButton, Box, Button } from '@mui/material';
import chroma from 'chroma-js';
import MuiAppBar from '@mui/material/AppBar';
import breakPoints from '../../breakPoints';

//sx and static styles
const dialogStyleSX = {
  DialogTitle: {
    width: '100%',
    mt: 8,
    fontFamily: '"Roboto Condensed", sans-serif'
  },
  ValidatorFormBox: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    display: 'flex',
    gap: '1rem',
    fontFamily: '"Roboto Condensed", sans-serif'
  },
  PalletEmojiTypo: {
    m: '20px 0px',
    fontFamily: '"Roboto Condensed", sans-serif'
  }
};
const draggableColorBoxSx = {
  title: {
    position: 'absolute',
    width: '100%',
    bottom: '0',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 0.5rem'
  },
  dragBox: {
    width: '40px',
    height: '40px',
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: '#ffffff50',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    opacity: '0.2',
    transition: 'all 0.2s',
    cursor: 'grab',
    [breakPoints.sizeUp('sm')]: {
      width: '20px',
      height: '20px'
    }
  }
};
const drawerStyleSx = {
  drawer: {
    width: 350,
    flexShrink: 0,
    [breakPoints.sizeUp('md')]: {
      width: 250
    },
    [breakPoints.sizeUp('sm')]: {
      width: 230
    },
    '& .MuiDrawer-paper': {
      width: 350,
      boxSizing: 'border-box',
      [breakPoints.sizeUp('md')]: {
        width: 250
      },
      [breakPoints.sizeUp('sm')]: {
        width: 230
      }
    }
  },
  DrawerNewColorsBoxContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4,1fr)',
    gridTemplateRows: 'repeat(5,1fr)',
    width: '100%',
    height: '100%',
    [breakPoints.sizeUp('md')]: {
      gridTemplateColumns: 'repeat(2,1fr)',
      gridTemplateRows: 'repeat(10,1fr)'
    },
    [breakPoints.sizeUp('sm')]: {
      gridTemplateColumns: 'repeat(1,1fr)',
      gridTemplateRows: 'repeat(20,1fr)'
    }
  },
  ButtonsDiv: {
    display: 'flex',
    gap: '1rem',
    marginLeft: 'auto',
    [breakPoints.sizeUp('sm')]: {
      flexDirection: 'column',
      gap: '0.6rem'
    }
  },
  drawerBgDiv: {
    background: 'linear-gradient(to right, #ddefbb, #ffeeee)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: '-5'
  },
  DrawerTitleTypo: {
    position: 'absolute',
    width: '80%',
    margin: '8rem 0',
    left: '50%',
    padding: '1rem 0.5rem',
    transform: 'translate(-50%,0px)',
    background: 'linear-gradient(to left, #30e8bf, #ff8235)',
    borderRadius: '50px',
    transition: 'all 0.2s',
    userSelect: 'none',
    boxShadow:
      'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
    '&:hover': {
      boxShadow:
        'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'
    }
  }
};
const colorPickerStyleSx = {
  pickerButtonStack: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: '0.5rem',
    gap: '0.5rem',
    [breakPoints.sizeUp('md')]: {
      flexDirection: 'column'
    }
  },
  colorPickerBox: {
    display: 'grid',
    width: '100%',
    justifyItems: 'center'
  }
};
//functional and active styles created with mui and emotion styling system
const TrashIcon = muiStyled(IconButton)(props => ({
  color: props.luminance < 0.1 ? '#fff' : '',
  position: 'absolute',
  top: '2px',
  right: '2px',
  transition: props.theme.transitions.create(['transform', 'color'], {
    easing: props.theme.transitions.easing.sharp,
    duration: 230
  }),
  '&:hover': {
    color: props.luminance > 0.2 ? '#000' : '',
    transform: 'scale(1.2)',
    backgroundColor: 'transparent'
  },
  [breakPoints.sizeUp('sm')]: {
    bottom: '0px',
    width: '20px',
    height: '20px',
    fontSize: '0.5rem'
  }
}));

const ShakingDraggableColorBox = muiStyled(Box)(props => ({
  position: 'relative',
  transition: props.transition,
  transform: props.transform,
  width: '100%',
  height: '100%',
  backgroundColor: props.color,
  boxShadow: props.overLay
    ? 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'
    : '',
  opacity: props.isDragging ? '0.4' : '1',
  animation: props.overLay ? 'tilt-shaking 0.2s infinite' : '',
  '&:hover': {
    '.dragBox': {
      opacity: '0.7'
    }
  },
  '@keyframes tilt-shaking': {
    '0%': { transform: 'rotate(0deg) skew(2deg)' },
    '25%': { transform: 'rotate(2deg) skew(0deg)' },
    '50%': { transform: 'rotate(0eg) skew(-2deg)' },
    '75%': { transform: 'rotate(-2deg) skew(0deg)' },
    '100%': { transform: 'rotate(0deg) skew(2deg)' }
  }
}));
const DrawerMain = muiStyled('main', {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  flexGrow: '1',
  height: 'calc(100vh - 64px)',
  padding: theme.spacing(0),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: '-350px',
  [breakPoints.sizeUp('md')]: {
    marginLeft: '-250px'
  },
  [breakPoints.sizeUp('sm')]: {
    marginLeft: '-230px'
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0,
    [breakPoints.sizeUp('md')]: {
      marginLeft: 0
    },
    [breakPoints.sizeUp('sm')]: {
      marginLeft: 0
    }
  })
}));
const AppBar = muiStyled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  background: 'linear-gradient(to right,#ffeeee,#ddefbb)',
  color: 'black',
  position: 'fixed',
  ...(open && {
    width: 'calc(100% - 350px)',
    marginLeft: '350px',
    [breakPoints.sizeUp('md')]: {
      width: 'calc(100% - 250px)',
      marginLeft: '250px'
    },
    [breakPoints.sizeUp('sm')]: {
      width: 'calc(100% - 230px)',
      marginLeft: '230px'
    },
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const DrawerHeader = muiStyled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

const DrawerButton = muiStyled(Button)(props => ({
  width: '50%',
  backgroundColor: props.bgcolor,
  '&:hover': {
    backgroundColor: props.bgcolor
  },
  [breakPoints.sizeUp('sm')]: {
    width: '100%',
    height: '20px'
  }
}));
const ColorPickerButton = muiStyled(Button)(props => ({
  width: props.width,
  height: '2rem',
  backgroundColor: props.bgcolor ? props.bgcolor : '#000',
  padding: props.padding,
  color: props.bgcolor && chroma(props.bgcolor).luminance() > 0.2 && '#000',
  fontWeight: 'bold',
  [breakPoints.sizeUp('md')]: {
    width: '100%'
  },
  '&:hover': {
    backgroundColor: props.bgcolor ? props.bgcolor : '#000'
  }
}));
const ColorPickerDiv = styled.div(props => ({
  display: 'grid',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  [breakPoints.sizeUp('md')]: {
    padding: '0.6rem'
  }
}));
export {
  dialogStyleSX,
  draggableColorBoxSx,
  TrashIcon,
  ShakingDraggableColorBox,
  drawerStyleSx,
  DrawerMain,
  AppBar,
  DrawerHeader,
  DrawerButton,
  colorPickerStyleSx,
  ColorPickerButton,
  ColorPickerDiv
};
