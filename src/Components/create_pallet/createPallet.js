import React, { useState } from 'react';
import PalletCreateDrawer from './drawer';
import ChoosePalletNameDialogBox from './choosePalletNameDialogBox';
import { motion } from 'framer-motion/dist/framer-motion';

export default function CreatePallet({ colorPallets, setColorPallets }) {
  // open & close name dialog state hook
  const [nameDialogOpen, setNameDialogOpen] = useState(false);

  //new color list state hook and initial values
  const [newColorList, setNewColorList] = useState([
    { color: '#000000', name: '1' },
    { color: '#532626', name: '2' },
    { color: '#C67B7B', name: '3' },
    { color: '#2EAC8A', name: '4' },
    { color: '#e67e22', name: '5' },
    { color: '#e74c3c', name: '6' },
    { color: '#d35400', name: '7' },
    { color: '#f39c12', name: '8' }
  ]);

  //extract color name for sending to palletName form for validation
  const palletNames = colorPallets.map(pallet =>
    pallet.paletteName.replace(/ /g, '').toLowerCase()
  );

  //delete from new Color function, send to new color boxes
  function deleteFromNewColorList(color) {
    setNewColorList(
      newColorList.filter(colorObj => colorObj.name !== color.name)
    );
  }

  //gather name,emoji and new colors to send to App component and update Pallet List
  function updateColorPallet(name, emoji) {
    const newPallet = {
      paletteName: name,
      id: name,
      emoji: emoji,
      colors: newColorList
    };
    setColorPallets([...colorPallets, newPallet]);
  }
  return (
    <motion.div
      className='CreatePallet'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <ChoosePalletNameDialogBox
        open={nameDialogOpen}
        setOpen={setNameDialogOpen}
        palletNames={palletNames}
        updateColorPallet={updateColorPallet}
      />
      <PalletCreateDrawer
        setNameDialogOpen={setNameDialogOpen}
        newColors={newColorList}
        setNewColors={setNewColorList}
        deleteFromNewColorList={deleteFromNewColorList}
      />
    </motion.div>
  );
}
