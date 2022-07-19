import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PalletColorsDiv } from './style';
import generatePallet from '../../colorHelper';
import ColorBox from './colorBox';
import { motion } from 'framer-motion/dist/framer-motion';

export default function ColorBoxes() {
  const oL = useOutletContext();
  const modifiedColorObj = generatePallet(oL.selectedColorObj);
  useEffect(() => {
    oL.setShowSlider(true);
  }, []);
  const colorBoxes = modifiedColorObj.colors[oL.level].map(colorObj => {
    return (
      <ColorBox
        key={colorObj.id}
        color={colorObj[oL.type]}
        name={colorObj.name}
      />
    );
  });
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      // transition={{ duration: 1 }}
    >
      <PalletColorsDiv>{colorBoxes}</PalletColorsDiv>
    </motion.div>
  );
}
