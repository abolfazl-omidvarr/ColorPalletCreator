import React from "react";
import { styled as muiStyled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import chroma from "chroma-js";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
const TrashIcon = muiStyled(IconButton)((props) => ({
	color: props.luminance < 0.1 ? "#fff" : "",
	position: "absolute",
	bottom: "5px",
	right: "5px",
	transition: props.theme.transitions.create(["transform", "color"], {
		easing: props.theme.transitions.easing.sharp,
		duration: 200,
	}),
	"&:hover": {
		color: props.luminance > 0.2 ? "#000" : "",
		transform: "scale(1.2)",
		backgroundColor: "transparent",
	},
}));
const DraggableColorBoxTitleBox = muiStyled(Box)((props) => ({
	position: "absolute",
	width: "100%",
	bottom: "0",
	display: "flex",
	justifyContent: "space-between",
	padding: "0 0.5rem",
}));
export default function DraggableColorBox({
	color,
	deleteFromNewColorList,
	id,
	overLay,
}) {
	const {
		setNodeRef,
		attributes,
		listeners,
		transition,
		transform,
		isDragging,
	} = useSortable({ id: id });

	const luminance = chroma(color.color).luminance();
	return (
		<Box
			sx={{
				position: "relative",
				transition,
				transform: CSS.Transform.toString(transform),
				width: "100%",
				height: "100%",
				backgroundColor: color.color,
				boxShadow: overLay
					? "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
					: "",
				opacity: isDragging ? "0.4" : "1",
				animation: overLay ? "tilt-shaking 0.2s infinite" : "",
				"&:hover": {
					".dragBox": {
						opacity: "0.7",
					},
				},
				"@keyframes tilt-shaking": {
					"0%": { transform: "rotate(0deg) skew(2deg)" },
					"25%": { transform: "rotate(2deg) skew(0deg)" },
					"50%": { transform: "rotate(0eg) skew(-2deg)" },
					"75%": { transform: "rotate(-2deg) skew(0deg)" },
					"100%": { transform: "rotate(0deg) skew(2deg)" },
				},
			}}
			ref={setNodeRef}
		>
			<DraggableColorBoxTitleBox>
				<Typography
					variant="h6"
					sx={{
						color: luminance > 0.3 ? "#000" : "#fff",
					}}
				>
					{color.name}
				</Typography>
				<TrashIcon
					onClick={(e) => {
						deleteFromNewColorList(color);
					}}
					luminance={luminance}
				>
					<DeleteIcon />
				</TrashIcon>
			</DraggableColorBoxTitleBox>
			<Box
				className={"dragBox"}
				sx={{
					width: "40px",
					height: "40px",
					display: "grid",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: "50%",
					backgroundColor: "#ffffff50",
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%,-50%)",
					opacity: "0.2",
					transition: "all 0.2s",
					cursor: "grab",
				}}
				{...attributes}
				{...listeners}
			>
				<OpenWithIcon sx={{ fontSize: "2rem" }} />
			</Box>
		</Box>
		// </div>
	);
}
