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
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		flexGrow: "1",
		height: "calc(100vh - 64px)",
		padding: theme.spacing(0),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: 500,
		}),
		marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: 500,
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

const DrawerBgDiv = styled("div")((props) => ({
	background: "linear-gradient(to right, #ddefbb, #ffeeee)",
	position: "absolute",
	width: "100%",
	height: "100%",
	zIndex: "-5",
}));
const DrawerTitleTypo = styled(Typography)((props) => ({
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
}));
//end of Styling section

export default function PalletCreateDrawer({
	updateNewColorList,
	newColors,
	setNewColors,
	emptyNewColors,
	setNameDialogOpen,
	deleteFromNewColorList,
}) {
	// const [items, setItems] = useState(newColors);
	const [activeId, setActiveId] = useState(null);
	const [open, setOpen] = useState(true);

	const sensors = [useSensor(PointerSensor)];
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
	function handleDragStart(e) {
		setActiveId(e.active.id);
	}

	const navigate = useNavigate();

	const handleDrawerOpenClose = () => {
		setOpen(!open);
	};

	return (
		<Box
			sx={{
				display: "flex",
			}}
		>
			<CssBaseline />
			<AppBar
				sx={{
					background: "linear-gradient(to right,#ffeeee,#ddefbb)",
					color: "black",
				}}
				position="fixed"
				open={open}
			>
				<Toolbar sx={{ justifyContent: "space-between" }}>
					{open ? (
						<IconButton onClick={handleDrawerOpenClose} sx={{ color: "red" }}>
							<ChevronLeftIcon fontSize="medium" />
						</IconButton>
					) : (
						<IconButton
							aria-label="open drawer"
							onClick={handleDrawerOpenClose}
							edge="start"
							size="large"
							sx={{ color: "green", ...(open && { display: "none" }) }}
						>
							<AddBoxIcon fontSize="large" />
						</IconButton>
					)}

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
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
				transitionDuration={{
					enter: 200,
					exit: 200,
				}}
			>
				<DrawerHeader></DrawerHeader>
				<DrawerBgDiv />
				<DrawerTitleTypo variant="h5" align={"center"} component="div">
					Create your own pallet
				</DrawerTitleTypo>
				<ColorPickerDiv>
					<ColorPicker
						updateNewColorList={updateNewColorList}
						newColors={newColors}
						emptyNewColors={emptyNewColors}
					/>
				</ColorPickerDiv>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(5,1fr)",
						gridTemplateRows: "repeat(4,1fr)",
						width: "100%",
						height: "100%",
					}}
				>
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={dragHandler}
						onDragStart={handleDragStart}
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
						<DragOverlay>
							{activeId ? (
								<DraggableColorBox
									id={activeId}
									color={{
										color: activeId,
										name: newColors.filter(
											(color) => color.color === activeId
										)[0].name,
									}}
									overLay={true}
								/>
							) : null}
						</DragOverlay>
					</DndContext>{" "}
				</div>
			</Main>
		</Box>
	);
}
