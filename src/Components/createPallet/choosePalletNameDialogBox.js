import React, { useState, useEffect, useRef } from "react";
import {
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
	Typography,
	Box,
} from "@mui/material";
import Picker from "emoji-picker-react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

//slide transition for dialog box
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

// styling
const dialogStyleSX = {
	DialogTitle: {
		width: "100%",
		mt: 8,
		fontFamily: '"Roboto Condensed", sans-serif',
	},
	ValidatorFormBox: {
		position: "absolute",
		top: "1rem",
		right: "1rem",
		display: "flex",
		gap: "1rem",
		fontFamily: '"Roboto Condensed", sans-serif',
	},
	PalletEmojiTypo: {
		m: "20px 0px",
		fontFamily: '"Roboto Condensed", sans-serif',
	},
};
//end of styling

export default function ChoosePalletNameDialogBox({
	open,
	setOpen,
	palletNames,
	updateColorPallet,
}) {
	const [palletName, setPalletName] = useState("");
	const [palletEmoji, setPalletEmoji] = useState("");

	//add a validation rule for TextValidator
	useEffect(() => {
		ValidatorForm.addValidationRule("isUniquePalletName", (value) =>
			palletNames.every(
				(name) =>
					name !==
					value
						.replace(/ /g, "")
						.replace(/-/g, "")
						.toLowerCase()
			)
		);
	});

	//open & close dialog box
	function handleClickOpenClose() {
		setOpen(!open);
	}

	function submitClickHandler() {
		updateColorPallet(palletName, palletEmoji); //send picked name and emoji to createPallet component
		handleClickOpenClose(); //close
	}
	return (
		<div className="ChoosePalletNameDialogBox">
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClickOpenClose}
				aria-describedby="Pallet name dialog"
			>
				<DialogTitle sx={dialogStyleSX.DialogTitle}>
					Choose a name and emoji for your new shiny pallet
				</DialogTitle>
				<DialogContent>
					<DialogContentText></DialogContentText>
					<ValidatorForm ref={useRef()} onSubmit={submitClickHandler}>
						<Box sx={dialogStyleSX.ValidatorFormBox}>
							<Button color="secondary" onClick={handleClickOpenClose}>
								Never Mind
							</Button>
							<Button variant="contained" color="primary" type="submit">
								OK
							</Button>
						</Box>
						<TextValidator
							autoFocus
							margin="dense"
							id="name"
							label="Pallet Name"
							type="text"
							variant="standard"
							onChange={(e) => setPalletName(e.target.value)}
							value={palletName}
							validators={["required", "isUniquePalletName"]}
							errorMessages={["this field is required", "This name is taken"]}
						/>
						<Typography variant="h6" sx={dialogStyleSX.PalletEmojiTypo}>
							Pallet Emoji:
							<Box component="span" sx={{ fontSize: "28px" }}>
								{palletEmoji}
							</Box>
						</Typography>

						<Picker
							onEmojiClick={(_, obj) => setPalletEmoji(obj.emoji)}
							pickerStyle={{ width: "100%" }}
							disableSearchBar
							native
						/>
					</ValidatorForm>
				</DialogContent>
			</Dialog>
		</div>
	);
}