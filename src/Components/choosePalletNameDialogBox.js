import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Picker from "emoji-picker-react";
import { Box } from "@mui/system";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChoosePalletNameDialogBox({
	open,
	setOpen,
	palletNames,
	updateColorPallet,
}) {
	const [palletName, setPalletName] = useState("");
	const [palletEmoji, setPalletEmoji] = useState("");
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

	function handleClickOpenClose() {
		setOpen(!open);
	}
	function submitClickHandler() {
		updateColorPallet(palletName, palletEmoji);
		handleClickOpenClose();
	}
	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClickOpenClose}
				aria-describedby="Pallet name dialog"
			>
				<DialogTitle
					sx={{
						width: "100%",
						mt: 8,
						fontFamily: '"Roboto Condensed", sans-serif',
					}}
				>
					Choose a name and emoji for your new shiny pallet
				</DialogTitle>
				<DialogContent>
					<DialogContentText></DialogContentText>
					<ValidatorForm ref={useRef()} onSubmit={submitClickHandler}>
						<Box
							sx={{
								position: "absolute",
								top: "1rem",
								right: "1rem",
								display: "flex",
								gap: "1rem",
								fontFamily: '"Roboto Condensed", sans-serif',
							}}
						>
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
						<Typography
							variant="h6"
							sx={{
								m: "20px 0px",
								fontFamily: '"Roboto Condensed", sans-serif',
							}}
						>
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
