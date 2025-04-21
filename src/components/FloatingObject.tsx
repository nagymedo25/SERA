import React from 'react';
import { Box, SxProps } from '@mui/material';

interface FloatingObjectProps {
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  size?: string | number;
  color?: string;
  shape?: 'circle' | 'square' | 'triangle' | 'polygon';
  speed?: 'normal' | 'slow' | 'fast';
  delay?: number;
  opacity?: number;
  blur?: number;
  rotate?: boolean;
  rotateSpeed?: 'normal' | 'slow' | 'fast';
  sx?: SxProps;
  zIndex?: number;
}

const FloatingObject: React.FC<FloatingObjectProps> = ({
  top,
  left,
  right,
  bottom,
  size = 100,
  color = 'rgba(63, 81, 181, 0.2)',
  shape = 'circle',
  speed = 'normal',
  delay = 0,
  opacity = 0.5,
  blur = 0,
  rotate = false,
  rotateSpeed = 'normal',
  sx = {},
  zIndex = 0
}) => {
  // Determine float animation class based on speed
  const floatClass = speed === 'slow' ? 'float-slow' : speed === 'fast' ? 'float-fast' : 'float';
  
  // Determine rotation animation class
  const rotateClass = rotate ? 
    (rotateSpeed === 'slow' ? 'rotate-slow' : rotateSpeed === 'fast' ? 'rotate-fast' : 'rotate') 
    : '';
  
  // Shape styles
  let shapeStyles = {};
  
  switch(shape) {
    case 'circle':
      shapeStyles = {
        borderRadius: '50%'
      };
      break;
    case 'square':
      shapeStyles = {
        borderRadius: '12px'
      };
      break;
    case 'triangle':
      shapeStyles = {
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        borderRadius: 0
      };
      break;
    case 'polygon':
      shapeStyles = {
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        borderRadius: 0
      };
      break;
  }

  return (
    <Box
      className={`${floatClass} ${rotateClass}`}
      sx={{
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        backgroundColor: color,
        filter: `blur(${blur}px)`,
        opacity,
        zIndex,
        animationDelay: `${delay}s`,
        ...shapeStyles,
        ...sx
      }}
    />
  );
};

export default FloatingObject; 