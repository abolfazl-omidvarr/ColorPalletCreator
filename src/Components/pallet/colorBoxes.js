import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PalletColorsDiv } from './style';
import generatePallet from '../../colorHelper';
import ColorBox from './colorBox';
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
  return <PalletColorsDiv>{colorBoxes}</PalletColorsDiv>;
}
