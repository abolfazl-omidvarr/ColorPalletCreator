import React, { useEffect } from 'react';
import { ColorShadeDiv } from './style';
import { useOutletContext } from 'react-router-dom';
import generatePallet, { colorLevels } from '../../colorHelper';
import ColorBox from './colorBox';

export default function ColorShades({ colorName }) {
  const { selectedColorObj, setShowSlider, type } = useOutletContext();
  const modifiedColorObj = generatePallet(selectedColorObj);
  const colorShades = {
    hex: [],
    rgb: []
  };
  useEffect(() => {
    setShowSlider(false);
  }, []);
  colorLevels.forEach(lvl => {
    if (lvl === 0) return;
    const colorLvlObj = modifiedColorObj.colors[lvl].filter(
      color => color.id === colorName
    )[0];
    colorShades.hex.push(colorLvlObj.hex);
    colorShades.rgb.push(colorLvlObj.rgb);
  });
  const colorBoxes = colorShades[type].map(color => {
    return (
      <ColorBox key={color} color={color} name={null} singleColor />
    );
  });
  return <ColorShadeDiv>{colorBoxes}</ColorShadeDiv>;
}
