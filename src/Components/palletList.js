import React from "react";
import { Link } from "react-router-dom";
import MiniPallet from "./miniPallet";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const PalletListBox = styled(Box)((props) => ({
	margin: "auto",
	flexGrow: 1,
	maxWidth: 900,
	zIndex: 22,
	nav: {
		display: "flex",
		width: "96.5%",
		height: "70px",
		margin: "1rem auto",
		backgroundColor: "#66626260",
		backdropFilter: "blur(15px)",
		borderRadius: "10px",
		boxSizing: "border-box",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "1rem 1rem",
		p: {
			color: "#fff",
			fontSize: "1.5rem",
		},
		"@media (max-width:1200px)": {
			width: "88.5%",
			padding: "1rem 1rem",
			p: {
				color: "#fff",
				fontSize: "1.3rem",
			},
		},
		"@media (max-width:600px)": {
			display: "none",
		},
	},
}));
const GridContainer = styled(Grid)((props) => ({
	justifyContent: "space-around",
	"@media (max-width:600px)": {
		justifyContent: "center",
	},
}));

function PalletList({ colorPallets }) {
	return (
		<PalletListBox>
			<nav>
				<p>Color Picker created by Abolfazl omidvar</p>
				<Link to={"/createPallet"}>Create a Pallet</Link>
			</nav>
			<GridContainer container>
				{colorPallets.map((colorObj, i) => (
					<MiniPallet
						key={colorObj.id}
						colorObj={colorObj}
						tDelay={(i + 1) * 100}
						id={colorObj.id}
					/>
				))}
			</GridContainer>
		</PalletListBox>
	);
}
export default PalletList;
