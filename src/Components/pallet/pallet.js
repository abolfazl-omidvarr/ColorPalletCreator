import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion';
import { PalletFooterDiv } from './palletStyle';
import NavBar from './navBar';
export default function ColorPallet({ colorsObj }) {
  const [level, setLevel] = useState('500');
  const [type, setType] = useState('hex');
  const [showSlider, setShowSlider] = useState(true);

  return (
    <motion.div
      className='Pallet'
      style={{
        overflow: 'hidden',
        position: 'relative',
        height: '100vh'
      }}
    >
      <NavBar
        showSlider={showSlider}
        setLevel={setLevel}
        upperSetType={setType}
      />
      <Outlet
        context={{
          selectedColorObj: colorsObj,
          level: level,
          type: type,
          setShowSlider: setShowSlider
        }}
      />
      <PalletFooterDiv>
        <p>{colorsObj.paletteName}</p>
      </PalletFooterDiv>
    </motion.div>
  );
}
