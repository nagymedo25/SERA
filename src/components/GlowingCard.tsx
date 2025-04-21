import React, { useRef, useEffect } from 'react';
import { Box, Card, CardContent, CardProps, useTheme } from '@mui/material';
import { gsap } from 'gsap';
import { hexToRgb, rgbToRgbaString } from '../utils/colorUtils';

export interface GlowingCardProps extends CardProps {
  glowColor?: string;
  glowIntensity?: number;
  glowSize?: number;
  animationDuration?: number;
  delay?: number;
  children: React.ReactNode;
}

const GlowingCard: React.FC<GlowingCardProps> = ({
  glowColor = '#00bcd4',
  glowIntensity = 0.4,
  glowSize = 30,
  animationDuration = 0.3,
  delay = 0,
  children,
  ...cardProps
}) => {
  const theme = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { 
          opacity: 0,
          y: 20
        },
        { 
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: 'power2.out'
        }
      );
    }
  }, [delay]);

  // Transform perspective and rotation on mouse move
  useEffect(() => {
    const card = cardRef.current;
    
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const angleX = (mouseY - centerY) * 0.01;
      const angleY = (centerX - mouseX) * 0.01;
      
      gsap.to(card, {
        rotationX: angleX,
        rotationY: angleY,
        duration: animationDuration,
        ease: 'power2.out'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: animationDuration * 1.5,
        ease: 'power2.out'
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [animationDuration]);

  // Convert hex to rgba for glow effect
  const rgb = hexToRgb(glowColor);
  const shadowColor = rgb ? rgbToRgbaString(rgb, glowIntensity) : 'rgba(0, 0, 0, 0)';
  
  return (
    <Box
      sx={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        position: 'relative',
      }}
    >
      <Card
        ref={cardRef}
        {...cardProps}
        sx={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          borderRadius: 2,
          overflow: 'hidden',
          background: theme.palette.background.paper,
          transition: `box-shadow ${animationDuration}s ease-in-out`,
          boxShadow: theme.shadows[4],
          '&:hover': {
            boxShadow: `0 0 ${glowSize}px ${shadowColor}, ${theme.shadows[8]}`,
          },
          ...(cardProps.sx || {})
        }}
      >
        <CardContent ref={contentRef} sx={{ position: 'relative', zIndex: 2 }}>
          {children}
        </CardContent>
      </Card>
    </Box>
  );
};

export default GlowingCard; 