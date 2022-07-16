import React, { useRef, useEffect } from "react";
import { ColorSliderDiv } from "./Styles";
export default function ColorSlider({ setLevel }) {
	const slider = useRef();
	const sliderLabel = useRef();

	function onChangeHandler(e) {
		setLevel(e.target.value);
	}

	useEffect(() => {
		slider.current.defaultValue = 500;
	}, []);

	useEffect(() => {
		sliderLabel.current.innerHTML = `Level: ${slider.current.value}`;
	});

	return (
		<ColorSliderDiv>
			<label ref={sliderLabel} htmlFor="#levelSlider">
				500
			</label>
			<input
				ref={slider}
				id="#levelSlider"
				type={"range"}
				min="100"
				step="100"
				max="1000"
				onChange={onChangeHandler}
			/>
		</ColorSliderDiv>
	);
}
