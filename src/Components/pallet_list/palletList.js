import React from 'react';
import { Link } from 'react-router-dom';
import MiniPallet from './miniPallet';
import styled from '@emotion/styled';
import { styled as muiStyled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import breakPoints from '../../breakPoints';

const PalletListContainer = styled.div`
  --scrollbar-width: 8px;
  --mask-height: 32px;

  overflow-y: auto;
  height: 85%;
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
  ${breakPoints.sizeUp('sm')} {
    height: 98%;
  }
`;
const PalletListBox = styled(Box)(props => ({
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
    backgroundColor: '#66626260',
    backdropFilter: 'blur(15px)',
    borderRadius: '10px',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1rem',
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
      display: 'none'
    }
  }
}));
const GridContainer = muiStyled(Grid)(props => ({
  gap: '0',
  alignItems: 'center',
  alignContent: 'center',
  '@media (max-width:600px)': {
    justifyContent: 'center'
  }
}));

export default function PalletList({ colorPallets, setColorPallets }) {
  return (
    <PalletListBox>
      <nav>
        <p>Color Picker created by Abolfazl omidvar</p>
        <Link to={'/createPallet'}>Create a Pallet</Link>
      </nav>
      <PalletListContainer className='masked-overflow'>
        <GridContainer container>
          {colorPallets.map((colorObj, i) => (
            <MiniPallet
              setColorPallets={setColorPallets}
              key={colorObj.id}
              colorObj={colorObj}
              tDelay={(i + 1) * 200}
              id={colorObj.id}
            />
          ))}
        </GridContainer>
      </PalletListContainer>
    </PalletListBox>
  );
}
