import React from "react";
import { Link } from "react-router-dom";
import MiniPallet from "./miniPallet";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const PalletListBox = styled(Box)((props) => ({
	"-webkit-scrollbar-track": {
		WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
		backgroundColor: "#F5F5F5",
	},

	"-webkit-scrollbar": {
		width: "6px",
		backgroundColor: "#F5F5F5",
	},

	"-webkit-scrollbar-thumb": {
		backgroundColor: "#000000",
	},
	height: "100vh",
	position: "relative",
	margin: "auto",
	flexGrow: 1,
	paddingTop: "1rem",
	maxWidth: 900,
	nav: {
		height: "70px",
		zIndex: "22",
		top: "0",
		display: "flex",
		margin: "100px",
		// width: "900px",
		// left: "50%",
		// transform: "translate(-50%,0)",
		width: "100%",
		margin: "0rem auto 1rem auto",
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
	gap: "0",
	justifyContent: "space-around",
	alignItems: "center",
	alignContent: "center",
	"@media (max-width:600px)": {
		justifyContent: "center",
	},
}));

function PalletList({ colorPallets, setColorPallets }) {
	return (
		<PalletListBox>
			<nav>
				<p>Color Picker created by Abolfazl omidvar</p>
				<Link to={"/createPallet"}>Create a Pallet</Link>
			</nav>
			<Box
				sx={{
					height: "90%",
					overflowY: "scroll",
				}}
			>
				<GridContainer container>
					{colorPallets.map((colorObj, i) => (
						<MiniPallet
							setColorPallets={setColorPallets}
							key={colorObj.id}
							colorObj={colorObj}
							tDelay={(i + 1) * 100}
							id={colorObj.id}
						/>
					))}
				</GridContainer>
			</Box>
		</PalletListBox>
	);
}
export default PalletList;
