import React, { useState, useRef, useEffect } from "react";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import chroma from "chroma-js";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const PickerButtonStack = styled(Stack)((props) => ({
	width: "100%",
}));
const ColorPickerBox = styled(Box)((props) => ({
	display: "grid",
	width: "300px",
	justifyItems: "center",
}));
const ColorPickerButtom = styled(Button)((props) => ({
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

export default function ColorPicker({
	updateNewColorList,
	newColors,
	emptyNewColors,
}) {
	const [colorCodes, setColorCodes] = useState("");
	const [colorName, setColorName] = useState("");
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
		updateNewColorList({ color: colorCodes.hex, name: colorName });
	}
	return (
		<ColorPickerBox>
			<PickerButtonStack
				direction="row"
				spacing={1}
				padding={1}
				marginBottom={0.5}
			>
				<ColorPickerButtom
					onClick={() => emptyNewColors()}
					variant="contained"
					bgcolor="#F95656"
					width={"50%"}
				>
					Clear
				</ColorPickerButtom>
				<ColorPickerButtom variant="contained" bgcolor="#398FF4" width={"50%"}>
					Random
				</ColorPickerButtom>
			</PickerButtonStack>
			<ChromePicker
				width={"100%"}
				styles={{ borderRadius: "50px" }}
				color={colorCodes}
				onChangeComplete={(color) => setColorCodes(color)}
				onChange={(color) => setColorCodes(color)}
			/>
			<ValidatorForm ref={useRef()} onSubmit={submitClickHandler}>
				<TextValidator
					sx={{ margin: "2rem" }}
					label="Color Name"
					onChange={(e) => setColorName(e.target.value)}
					name="ColorName"
					value={colorName}
					validators={["required", "isUniqueColorName", "isUniqueColorCode"]}
					errorMessages={[
						"this field is required",
						"This name is taken",
						"This code is taken",
					]}
				/>
				<ColorPickerButtom
					variant="contained"
					type="submit"
					bgcolor={colorCodes.hex}
					width={"100%"}
				>
					Add Color
				</ColorPickerButtom>
			</ValidatorForm>
		</ColorPickerBox>
	);
}
