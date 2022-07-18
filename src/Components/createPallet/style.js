import { styled } from '@mui/material/styles';
import { IconButton, Box, Button } from '@mui/material';
import chroma from 'chroma-js';
import MuiAppBar from '@mui/material/AppBar';

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
    cursor: 'grab'
  }
};
const drawerWidth = 350;
const drawerStyleSx = {
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box'
    }
  },
  DrawerNewColorsBoxContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5,1fr)',
    gridTemplateRows: 'repeat(4,1fr)',
    width: '100%',
    height: '100%'
  },
  ButtonsDiv: {
    display: 'flex',
    gap: '1rem',
    marginLeft: 'auto'
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
    gap: '0.5rem'
  },
  colorPickerBox: {
    display: 'grid',
    width: '300px',
    justifyItems: 'center'
  }
};
//functional and active styles created with mui and emotion styling system
const TrashIcon = styled(IconButton)(props => ({
  color: props.luminance < 0.1 ? '#fff' : '',
  position: 'absolute',
  bottom: '5px',
  right: '5px',
  transition: props.theme.transitions.create(['transform', 'color'], {
    easing: props.theme.transitions.easing.sharp,
    duration: 200
  }),
  '&:hover': {
    color: props.luminance > 0.2 ? '#000' : '',
    transform: 'scale(1.2)',
    backgroundColor: 'transparent'
  }
}));

const ShakingDraggableColorBox = styled(Box)(props => ({
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
const DrawerMain = styled('main', {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  flexGrow: '1',
  height: 'calc(100vh - 64px)',
  padding: theme.spacing(0),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}));
const AppBar = styled(MuiAppBar, {
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
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

const DrawerButton = styled(Button)(props => ({
  width: '6rem',
  backgroundColor: props.bgcolor,
  '&:hover': {
    backgroundColor: props.bgcolor
  }
}));
const ColorPickerButton = styled(Button)(props => ({
  width: props.width,
  height: '2rem',
  backgroundColor: props.bgcolor ? props.bgcolor : '#000',
  padding: props.padding,
  color: props.bgcolor && chroma(props.bgcolor).luminance() > 0.2 && '#000',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: props.bgcolor ? props.bgcolor : '#000'
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
  ColorPickerButton
};
