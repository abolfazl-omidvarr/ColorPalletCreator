import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DraggableColorBox from './draggableColorBox';
import ColorPicker from './colorPicker';
import {
  closestCenter,
  DndContext,
  PointerSensor,
  // TouchSensor,
  useSensor,
  DragOverlay
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy
} from '@dnd-kit/sortable';
import {
  drawerStyleSx,
  DrawerMain,
  AppBar,
  DrawerHeader,
  DrawerButton,
  ColorPickerDiv
} from './style';

export default function PalletCreateDrawer({
  newColors,
  setNewColors,
  emptyNewColors,
  setNameDialogOpen,
  deleteFromNewColorList
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
      setNewColors(newColors => {
        const oldIndex = newColors.findIndex(item => item.color === active.id);
        const newIndex = newColors.findIndex(item => item.color === over.id);
        return arrayMove(newColors, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }
  //navigation hook for back Button
  const navigate = useNavigate();

  //determination tool Bar Icon Button by drawer close/open
  const toolBarIconButton = open ? (
    <IconButton onClick={() => setOpen(!open)} sx={{ color: 'red' }}>
      <ChevronLeftIcon fontSize='medium' />
    </IconButton>
  ) : (
    <IconButton
      aria-label='open drawer'
      onClick={() => setOpen(!open)}
      edge='start'
      size='large'
      open={open}
      sx={{ color: 'green' }}
    >
      <AddBoxIcon fontSize='large' />
    </IconButton>
  );
  //set overLay of dragging component
  const dragOverLay = activeId ? (
    <DraggableColorBox
      id={activeId}
      color={{
        color: activeId,
        name: newColors.filter(color => color.color === activeId)[0].name
      }}
      overLay={true}
    />
  ) : null;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar open={open}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {toolBarIconButton}
          <Box sx={drawerStyleSx.ButtonsDiv}>
            <DrawerButton
              bgcolor={'#F95656'}
              variant='contained'
              onClick={() => navigate(-1)}
            >
              Back
            </DrawerButton>
            <DrawerButton
              onClick={() => setNameDialogOpen(true)}
              variant='contained'
            >
              Save
            </DrawerButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={drawerStyleSx.drawer}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader></DrawerHeader>
        <Box sx={drawerStyleSx.drawerBgDiv} />
        <Typography
          sx={drawerStyleSx.DrawerTitleTypo}
          variant='h5'
          align={'center'}
          component='div'
        >
          Create your own pallet
        </Typography>
        <ColorPickerDiv>
          <ColorPicker
            setNewColors={setNewColors}
            newColors={newColors}
            emptyNewColors={emptyNewColors}
          />
        </ColorPickerDiv>
      </Drawer>
      <DrawerMain open={open}>
        <DrawerHeader />
        <Box sx={drawerStyleSx.DrawerNewColorsBoxContainer}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={dragHandler}
            onDragStart={e => setActiveId(e.active.id)}
          >
            <SortableContext
              items={newColors.map(item => item.color)}
              strategy={rectSortingStrategy}
            >
              {newColors.map(color => (
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
      </DrawerMain>
    </Box>
  );
}
