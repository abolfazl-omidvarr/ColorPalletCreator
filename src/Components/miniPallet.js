import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MiniPalletPaper, MiniPalletColorDiv } from "./Styles";
import Grid from "@mui/material/Grid";


//mini pallet component function:
export default function MiniPallet({ colorObj, tDelay, id }) {
	const History = useNavigate();

	//sate and Effect hook for show animation on startUp
	const [show, setShow] = useState(false);

	useEffect(() => {
		setTimeout(function () {
			setShow(true);
		}, tDelay);
	}, []);

	function handleMiniPalletClick(id) {
		History(`${id}/all-color`);
	}
	return (
		<Grid item xs={10} sm={5} lg={4} md={5}>
			<MiniPalletPaper
				onClick={() => handleMiniPalletClick(id)}
				sx={{ transform: show ? "scale(1)" : "scale(0)" }}
				bgcolor="#f4efe4"
			>
				<div className="MiniPallet-colors">
					{colorObj.colors.map((color) => (
						<MiniPalletColorDiv key={color.color} bgcolor={color.color} />
					))}
				</div>
				<div className="MiniPallet-title">
					<div className="MiniPallet-name">{colorObj.paletteName}</div>
					<div className="MiniPallet-icon">{colorObj.emoji}</div>
				</div>
			</MiniPalletPaper>
		</Grid>
	); //end of return
} //end of function
