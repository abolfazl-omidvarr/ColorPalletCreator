import React, { useState, useRef, useEffect } from "react";
import { Stack, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import chroma from "chroma-js";
import { ChromePicker } from "react-color";

//styling
const PickerButtonStack = styled(Stack)({
	width: "100%",
	flexDirection: "row",
	marginBottom: "0.5rem",
	gap: "0.5rem",
});
const ColorPickerBox = styled(Box)({
	display: "grid",
	width: "300px",
	justifyItems: "center",
});
const ColorPickerButton = styled(Button)((props) => ({
	width: props.width,
	height: "2rem",
	backgroundColor: props.bgcolor ? props.bgcolor : "#000",
	padding: props.padding,
	color: props.bgcolor && chroma(props.bgcolor).luminance() > 0.2 && "#000",
	fontWeight: "bold",
	"&:hover": {
		backgroundColor: props.bgcolor ? props.bgcolor : "#000",
	},
}));
//end of styling

export default function ColorPicker({
	newColors,
	setNewColors,
}) {
	const [colorCodes, setColorCodes] = useState("");
	const [colorName, setColorName] = useState("");

	//add a validation rule for TextValidator
	useEffect(() => {
		ValidatorForm.addValidationRule("isUniqueColorName", (value) =>
			newColors.every(
				(color) => color.name.toLowerCase() !== value.toLowerCase()
			)
		);
		ValidatorForm.addValidationRule("isUniqueColorCode", (value) =>
			newColors.every((color) => color.hex !== colorCodes.hex)
		);
	});

	function submitClickHandler() {
		setNewColors([...newColors, { color: colorCodes.hex, name: colorName }]);
	}
	return (
		<ColorPickerBox>
			<PickerButtonStack>
				<ColorPickerButton
					onClick={() => setNewColors([])}
					variant="contained"
					bgcolor="#F95656"
					width={"50%"}
				>
					Clear
				</ColorPickerButton>
				<ColorPickerButton
					onClick={() => 0}
					variant="contained"
					bgcolor="#398FF4"
					width={"50%"}
				>
					Random
				</ColorPickerButton>
			</PickerButtonStack>
			<ChromePicker
				width={"100%"}
				color={colorCodes}
				//setColorCodes execute as user made any change to ChromePicker:
				onChangeComplete={(color) => setColorCodes(color)}
				onChange={(color) => setColorCodes(color)}
			/>
			<ValidatorForm ref={useRef()} onSubmit={submitClickHandler}>
				<TextValidator
					sx={{ margin: "2rem" }}
					label="Color Name"
					onChange={(e) => setColorName(e.target.value)} //setColorName execute as user types
					name="ColorName"
					value={colorName}
					validators={["required", "isUniqueColorName", "isUniqueColorCode"]} //list of val.. rules
					errorMessages={[
						"this field is required",
						"This name is taken",
						"This code is taken",
					]}
				/>
				<ColorPickerButton
					variant="contained"
					type="submit"
					bgcolor={colorCodes.hex}
					width={"100%"}
				>
					Add Color
				</ColorPickerButton>
			</ValidatorForm>
		</ColorPickerBox>
	);
}
