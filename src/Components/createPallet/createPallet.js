import React, { useState } from "react";
import PalletCreateDrawer from "./drawer";
import ChoosePalletNameDialogBox from "./choosePalletNameDialogBox";
export default function CreatePallet({ colorPallets, setColorPallets }) {
	const [nameDialogOpen, setNameDialogOpen] = useState(false);
	const [newColorList, setNewColorList] = useState([
		{ color: "#000000", name: "1" },
		{ color: "#532626", name: "2" },
		{ color: "#C67B7B", name: "3" },
		{ color: "#2EAC8A", name: "4" },
		{ color: "#e67e22", name: "5" },
		{ color: "#e74c3c", name: "6" },
		{ color: "#d35400", name: "7" },
		{ color: "#f39c12", name: "8" },
		{ color: "#ff7675", name: "9" },
		{ color: "#e17055", name: "10" },
		{ color: "#e84393", name: "11" },
		{ color: "#636e72", name: "12" },
		{ color: "#ffeaa7", name: "13" },
		{ color: "#fdcb6e", name: "14" },
		{ color: "#e15055", name: "15" },
		{ color: "#6c5ce7", name: "16" },
		{ color: "#a29bfe", name: "17" },
		{ color: "#f27675", name: "18" },
		{ color: "#b2bec3", name: "19" },
		{ color: "#bdc581", name: "20" },
	]);
	const palletNames = colorPallets.map((pallet) =>
		pallet.paletteName.replace(/ /g, "").toLowerCase()
	);

	function updateNewColorList(color) {
		setNewColorList([...newColorList, color]);
	}
	function deleteFromNewColorList(color) {
		setNewColorList(
			newColorList.filter((colorObj) => colorObj.name !== color.name)
		);
	}
	function emptyNewColorList() {
		setNewColorList([]);
	}
	function updateColorPallet(name, emoji) {
		const newPallet = {
			paletteName: name,
			id: name,
			emoji: emoji,
			colors: newColorList,
		};
		setColorPallets([...colorPallets, newPallet]);
	}
	// useEffect(() => {
	// 	console.log(newColorList);
	// 	console.log("CP updated");
	// });
	return (
		<div className="CreatePallet">
			<ChoosePalletNameDialogBox
				open={nameDialogOpen}
				setOpen={setNameDialogOpen}
				palletNames={palletNames}
				updateColorPallet={updateColorPallet}
			/>
			<PalletCreateDrawer
				setNameDialogOpen={setNameDialogOpen}
				updateNewColorList={updateNewColorList}
				newColors={newColorList}
				setNewColors={setNewColorList}
				emptyNewColors={emptyNewColorList}
				deleteFromNewColorList={deleteFromNewColorList}
			/>
		</div>
	);
}
