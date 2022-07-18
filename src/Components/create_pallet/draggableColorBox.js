import React from 'react';
import { Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import chroma from 'chroma-js';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
  draggableColorBoxSx,
  TrashIcon,
  ShakingDraggableColorBox
} from './style';

export default function DraggableColorBox({
  color,
  deleteFromNewColorList,
  id,
  overLay
}) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging
  } = useSortable({ id: id }); // this hook is for dndKit functions

  const luminance = chroma(color.color).luminance(); //extract color lightness

  return (
    <ShakingDraggableColorBox
      transition={transition}
      transform={CSS.Transform.toString(transform)}
      overLay={overLay}
      isDragging={isDragging}
      ref={setNodeRef}
      color={color.color}
    >
      <Box sx={draggableColorBoxSx.title}>
        <Typography
          variant='h6'
          sx={{
            color: luminance > 0.3 ? '#000' : '#fff'
          }}
        >
          {color.name}
        </Typography>
        <TrashIcon
          onClick={e => {
            deleteFromNewColorList(color);
          }}
          luminance={luminance}
        >
          <DeleteIcon />
        </TrashIcon>
      </Box>
      <Box
        sx={draggableColorBoxSx.dragBox}
        className={'dragBox'}
        {...attributes}
        {...listeners}
      >
        <OpenWithIcon sx={{ fontSize: '2rem' }} />
      </Box>
    </ShakingDraggableColorBox>
  );
}
