import React from 'react';
import { Link } from 'react-router-dom';
import MiniPallet from './miniPallet';
import { motion } from 'framer-motion/dist/framer-motion';

import {
  PalletListContainer,
  PalletListBox,
  GridContainer,
  createPalletLink
} from './palletListStyle';

export default function PalletList({ colorPallets, setColorPallets }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <PalletListBox>
        <nav>
          <p>Abolfazl's Color Picker</p>
          <Link style={createPalletLink} to={'/createPallet'}>
            Create a Pallet
          </Link>
        </nav>
        <PalletListContainer className='masked-overflow'>
          <GridContainer container>
            {colorPallets.map((colorObj, i) => (
              <MiniPallet
                setColorPallets={setColorPallets}
                key={colorObj.id}
                colorObj={colorObj}
                tDelay={(i + 1) * 150} // delays miniPallet shows up on startUp
                id={colorObj.id}
              />
            ))}
          </GridContainer>
        </PalletListContainer>
      </PalletListBox>
    </motion.div>
  ); //end of return
} //end of function
