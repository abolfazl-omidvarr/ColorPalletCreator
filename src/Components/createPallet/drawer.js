import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ColorPickerDiv } from "../Styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import DraggableColorBox from "./draggableColorBox";
import ColorPicker from "./colorPicker";
import {
	closestCenter,
	DndContext,
	PointerSensor,
	// TouchSensor,
	useSensor,
	DragOverlay,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	rectSortingStrategy,
} from "@dnd-kit/sortable";

const ButtonsDiv = styled(Box)((props) => ({
	display: "flex",
	gap: "1rem",
	marginLeft: "auto",
}));
const DrawerButton = styled(Button)((props) => ({
	width: "6rem",
	backgroundColor: props.bgcolor,
	"&:hover": {
		backgroundColor: props.bgcolor,
	},
}));

const drawerWidth = 350;
const staticDrawerStyleSx = {
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		"& .MuiDrawer-paper": {
			width: drawerWidth,
			boxSizing: "border-box",
		},
	},
	DrawerNewColorsBoxContainer: {
		display: "grid",
		gridTemplateColumns: "repeat(5,1fr)",
		gridTemplateRows: "repeat(4,1fr)",
		width: "100%",
		height: "100%",
	},
};
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		flexGrow: "1",
		height: "calc(100vh - 64px)",
		padding: theme.spacing(0),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),
	})
);
const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	background: "linear-gradient(to right,#ffeeee,#ddefbb)",
	color: "black",
	position: "fixed",
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

const DrawerBgDiv = styled("div")({
	background: "linear-gradient(to right, #ddefbb, #ffeeee)",
	position: "absolute",
	width: "100%",
	height: "100%",
	zIndex: "-5",
});
const DrawerTitleTypo = styled(Typography)({
	position: "absolute",
	width: "80%",
	margin: "8rem 0",
	left: "50%",
	padding: "1rem 0.5rem",
	transform: "translate(-50%,0px)",
	background: "linear-gradient(to left, #30e8bf, #ff8235)",
	borderRadius: "50px",
	transition: "all 0.2s",
	// cursor: "pointer",
	userSelect: "none",
	boxShadow:
		"rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
	"&:hover": {
		boxShadow:
			"rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
	},
});
const DrawerNewColorsBoxContainer = styled(Box)({
	display: "grid",
	gridTemplateColumns: "repeat(5,1fr)",
	gridTemplateRows: "repeat(4,1fr)",
	width: "100%",
	height: "100%",
});
//end of Styling section

export default function PalletCreateDrawer({
	newColors,
	setNewColors,
	emptyNewColors,
	setNameDialogOpen,
	deleteFromNewColorList,
}) {
	//state hook for determining dragging colorBox
	const [activeId, setActiveId] = useState(null);

	//state hook for drawer open/close
	const [open, setOpen] = useState(true);

	const sensors = [useSensor(PointerSensor)]; //sensors for dndKit

	//sorting algorithm for rectSortingStrategy
	function dragHandler({ active, over }) {
		if (!over) return;
		if (active.id !== over.id) {
			setNewColors((newColors) => {
				const oldIndex = newColors.findIndex(
					(item) => item.color === active.id
				);
				const newIndex = newColors.findIndex((item) => item.color === over.id);
				return arrayMove(newColors, oldIndex, newIndex);
			});
		}
		setActiveId(null);
	}
	//navigation hook for back Button
	const navigate = useNavigate();

	//determination tool Bar Icon Button by drawer close/open 
	const toolBarIconButton = open ? (
		<IconButton onClick={() => setOpen(!open)} sx={{ color: "red" }}>
			<ChevronLeftIcon fontSize="medium" />
		</IconButton>
	) : (
		<IconButton
			aria-label="open drawer"
			onClick={() => setOpen(!open)}
			edge="start"
			size="large"
			open={open}
			sx={{ color: "green" }}
		>
			<AddBoxIcon fontSize="large" />
		</IconButton>
	);
	//set overLay of dragging component 
	const dragOverLay = activeId ? (
		<DraggableColorBox
			id={activeId}
			color={{
				color: activeId,
				name: newColors.filter((color) => color.color === activeId)[0].name,
			}}
			overLay={true}
		/>
	) : null;

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar open={open}>
				<Toolbar sx={{ justifyContent: "space-between" }}>
					{toolBarIconButton}
					<ButtonsDiv>
						<DrawerButton
							bgcolor={"#F95656"}
							variant="contained"
							onClick={() => navigate(-1)}
						>
							Back
						</DrawerButton>
						<DrawerButton
							onClick={() => setNameDialogOpen(true)}
							variant="contained"
						>
							Save
						</DrawerButton>
					</ButtonsDiv>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={staticDrawerStyleSx.drawer}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader></DrawerHeader>
				<DrawerBgDiv />
				<DrawerTitleTypo variant="h5" align={"center"} component="div">
					Create your own pallet
				</DrawerTitleTypo>
				<ColorPickerDiv>
					<ColorPicker
						setNewColors={setNewColors}
						newColors={newColors}
						emptyNewColors={emptyNewColors}
					/>
				</ColorPickerDiv>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				<Box sx={staticDrawerStyleSx.DrawerNewColorsBoxContainer}>
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={dragHandler}
						onDragStart={(e) => setActiveId(e.active.id)}
					>
						<SortableContext
							items={newColors.map((item) => item.color)}
							strategy={rectSortingStrategy}
						>
							{newColors.map((color) => (
								<DraggableColorBox
									key={color.color}
									id={color.color}
									color={color}
									deleteFromNewColorList={deleteFromNewColorList}
									overLay={false}
								/>
							))}
						</SortableContext>
						<DragOverlay>{dragOverLay}</DragOverlay>
					</DndContext>
				</Box>
			</Main>
		</Box>
	);
}
