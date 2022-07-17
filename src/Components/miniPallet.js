import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { MiniPalletPaper, MiniPalletColorDiv } from "./Styles";
import { IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";

//mini pallet component function:
export default function MiniPallet({ setColorPallets, colorObj, tDelay, id }) {
	const History = useNavigate();

	//sate and Effect hook for show animation on startUp
	const [show, setShow] = useState(false);

	useEffect(() => {
		setTimeout(function() {
			setShow(true);
		}, tDelay);
	}, []);

	function handleMiniPalletClick(id) {
		History(`${id}/all-color`);
	}
	console.log(colorObj);
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
					<div className="MiniPallet-emoji">{colorObj.emoji}</div>
					<IconButton
						id={colorObj.id}
						size="small"
						sx={{ "&:hover": { backgroundColor: "transparent", color: "red" } }}
						onClick={(e) => {
							e.stopPropagation();
							setColorPallets((prevPallets) =>
								prevPallets.filter(
									(pallet) => pallet.id !== e.target.closest(`button`).id
								)
							);
							// console.log(e.target.closest(`button`).id);
						}}
					>
						<DeleteForeverIcon
							sx={{
								transition: "all 0.3s",
								"&:hover": { transform: "scale(1.2)" },
							}}
						/>
					</IconButton>
				</div>
			</MiniPalletPaper>
		</Grid>
	); //end of return
} //end of function
