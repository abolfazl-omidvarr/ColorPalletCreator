import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import generatePallet, { colorLevels } from '../../colorHelper';
import ColorBox from './colorBox';
import { motion } from 'framer-motion/dist/framer-motion';
import { ColorShadeDiv } from './palletStyle';

export default function ColorShades({ colorName }) {
  const oL = useOutletContext(); //extracting Outlet props
  const modifiedColorObj = generatePallet(oL.selectedColorObj);

  //hide color slider in colorShades component
  useEffect(() => {
    oL.setShowSlider(false);
  }, []);

  //an empty object, will fill later :)
  const colorShades = {
    hex: [],
    rgb: []
  };

  //extract shades of specific color
  colorLevels.forEach(lvl => {
    if (lvl === 0) return;
    const colorLvlObj = modifiedColorObj.colors[lvl].filter(
      color => color.id === colorName
    )[0];
    colorShades.hex.push(colorLvlObj.hex);
    colorShades.rgb.push(colorLvlObj.rgb);
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <ColorShadeDiv>
        {colorShades[oL.type].map(color => (
          <ColorBox key={color} color={color} name={null} colorShades />
        ))}
      </ColorShadeDiv>
    </motion.div>
  );
}
