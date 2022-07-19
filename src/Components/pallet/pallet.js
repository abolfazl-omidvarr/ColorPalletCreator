import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion';
import { PalletFooterDiv } from './style';
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
      // initial={{ transform: 'translate(100%,0)' }}
      // animate={{ transform: 'translate(0,0)' }}
      // exit={{ transform: 'translate(100%,0)' }}
      // transition={{ duration: 1 }}
      // initial={{ opacity: 0, x: 100 }}
      // animate={{ opacity: 1, x: 0 }}
      // exit={{ opacity: 0, x: 100 }}
      
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
