import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import Pallet from './Components/pallet';
import PalletList from './Components/palletList';
import seedColors from './seedColors';
import ColorBoxes from './Components/colorBoxes';
import ColorShades from './Components/colorShades';
import CreatePallet from './Components/createPallet/createPallet';
import Test from './test';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

//Application function
export default function App() {
  const location = useLocation();
  const savedColorPallet = JSON.parse(
    window.localStorage.getItem('colorPallets')
  );
  const [colorPallets, setColorPallets] = useState(
    savedColorPallet ? savedColorPallet : seedColors
  );

  // this will set local storage on initial render and when ever colorPallets changes.
  useEffect(() => {
    window.localStorage.setItem('colorPallets', JSON.stringify(colorPallets));
  }, [colorPallets]);

  const PalletComponentWrapper = () => {
    const { id } = useParams();
    const pallet = colorPallets.find(pallet => pallet.id === id);
    return <Pallet colorsObj={pallet} />;
  };
  const ColorShadesWrapper = () => {
    const { color } = useParams();
    return <ColorShades colorName={color} />;
  };
  return (
    <div>
      <div className='App-bg' />
      <Routes>
        <Route
          path='/'
          element={
            <PalletList
              setColorPallets={setColorPallets}
              colorPallets={colorPallets}
            />
          }
        />
        <Route
          path='/createPallet'
          element={
            <CreatePallet
              colorPallets={colorPallets}
              setColorPallets={setColorPallets}
            />
          }
        />
        <Route path='test' element={<Test />} />
        <Route path=':id' element={<PalletComponentWrapper />}>
          <Route path='all-color' element={<ColorBoxes />} />
          <Route path=':color' element={<ColorShadesWrapper />} />
        </Route>
        <Route path='*' element={<h1>404 NOT FOUND</h1>}></Route>
      </Routes>
    </div>
  );
}
