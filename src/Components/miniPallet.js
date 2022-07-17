import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { MiniPalletPaper, MiniPalletColorDiv } from './Styles';
import { IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';

//mini pallet component function:
export default function MiniPallet({ setColorPallets, colorObj, tDelay, id }) {
  const History = useNavigate();

  //sate and Effect hook for show animation on startUp
  const [show, setShow] = useState(false);
  const [deleteMiniPallet, setDeleteMiniPallet] = useState(false);

  useEffect(() => {
    setTimeout(function() {
      setShow(true);
    }, tDelay);
  }, []);

  function handleMiniPalletClick(id) {
    History(`${id}/all-color`);
  }
  function setColorPalletsOnExit() {
    setTimeout(function() {
      setColorPallets(prevPallets =>
        prevPallets.filter(pallet => pallet.id !== id)
      );
    }, 300);
  }
  const nodeRef = React.useRef(null);
  return (
    <CSSTransition
      in={!deleteMiniPallet}
      timeout={300}
      classNames="miniPalletDelete"
      unmountOnExit
      onEnter={() => console.log('enter')}
      onExit={() => setColorPalletsOnExit()}
      nodeRef={nodeRef}
    >
      <Grid ref={nodeRef} item xs={10} sm={6} lg={4} md={4}>
        <MiniPalletPaper
          onClick={() => handleMiniPalletClick(id)}
          sx={{ transform: show ? 'scale(1)' : 'scale(0)' }}
          bgcolor="#f4efe4"
        >
          <div className="MiniPallet-colors">
            {colorObj.colors.map(color => (
              <MiniPalletColorDiv key={color.color} bgcolor={color.color} />
            ))}
          </div>
          <div className="MiniPallet-title">
            <div className="MiniPallet-name">{colorObj.paletteName}</div>
            <div className="MiniPallet-emoji">{colorObj.emoji}</div>
            <IconButton
              id={colorObj.id}
              size="small"
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'red'
                }
              }}
              onClick={e => {
                e.stopPropagation();
                setDeleteMiniPallet(true);
              }}
            >
              <DeleteForeverIcon
                sx={{
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'scale(1.2)' }
                }}
              />
            </IconButton>
          </div>
        </MiniPalletPaper>
      </Grid>
    </CSSTransition>
  ); //end of return
} //end of function
