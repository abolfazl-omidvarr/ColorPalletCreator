import React, { useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Pallet from "./Components/pallet";
import PalletList from "./Components/palletList";
import seedColors from "./seedColors";
import ColorBoxes from "./Components/colorBoxes";
import ColorShades from "./Components/colorShades";
import CreatePallet from "./Components/createPallet";
export default function App(props) {
	const [colorPallets, setColorPallets] = useState(seedColors);
	const PalletComponentWrapper = () => {
		const { id } = useParams();
		const pallet = colorPallets.find((pallet) => pallet.id === id);
		return <Pallet colorsObj={pallet} />;
	};
	const ColorShadesWrapper = () => {
		const { color } = useParams();
		return <ColorShades colorName={color} />;
	};
	return (
		<div>
			<div className="App-bg" />
			<Routes>
				<Route path="/" element={<PalletList colorPallets={colorPallets} />} />
				<Route
					path="/createPallet"
					element={
						<CreatePallet
							colorPallets={colorPallets}
							setColorPallets={setColorPallets}
						/>
					}
				/>
				<Route path=":id" element={<PalletComponentWrapper />}>
					<Route path="all-color" element={<ColorBoxes />} />
					<Route path=":color" element={<ColorShadesWrapper />} />
				</Route>
				<Route path="*" element={<h1>404 NOT FOUND</h1>}></Route>
			</Routes>
		</div>
	);
}
