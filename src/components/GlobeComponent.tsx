import React, { useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import gsap from 'gsap';

interface GlobeComponentProps {
  size?: number;
  spinSpeed?: number;
}

const GlobeComponent: React.FC<GlobeComponentProps> = ({ 
  size = 300,
  spinSpeed = 30 
}) => {
  const theme = useTheme();
  const globeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const globe = globeRef.current;
    const container = containerRef.current;
    if (!globe || !container) return;

    // Initial setup
    gsap.set(globe, { rotationY: 0 });

    // Create infinite rotation animation
    const rotateTimeline = gsap.timeline({
      repeat: -1,
      ease: "none"
    });

    rotateTimeline.to(globe, {
      rotationY: 360,
      duration: spinSpeed,
      ease: "linear"
    });

    // Add hover effect to slow down rotation
    container.addEventListener('mouseenter', () => {
      gsap.to(rotateTimeline, { timeScale: 0.3, duration: 1 });
    });

    container.addEventListener('mouseleave', () => {
      gsap.to(rotateTimeline, { timeScale: 1, duration: 1 });
    });

    return () => {
      rotateTimeline.kill();
      container.removeEventListener('mouseenter', () => {});
      container.removeEventListener('mouseleave', () => {});
    };
  }, [spinSpeed]);

  // Continents represented as CSS shapes
  const continents = [
    // North America
    {
      top: '25%',
      left: '20%',
      width: '20%',
      height: '15%',
      borderRadius: '70% 80% 70% 60%',
      background: '#4CAF50'
    },
    // South America
    {
      top: '45%',
      left: '25%',
      width: '12%',
      height: '20%',
      borderRadius: '60% 70% 50% 80%',
      background: '#8BC34A'
    },
    // Europe
    {
      top: '25%',
      left: '48%',
      width: '10%',
      height: '10%',
      borderRadius: '80% 70% 60% 75%',
      background: '#FFC107'
    },
    // Africa
    {
      top: '38%',
      left: '48%',
      width: '15%',
      height: '20%',
      borderRadius: '50% 60% 70% 40%',
      background: '#FF9800'
    },
    // Asia
    {
      top: '25%',
      left: '60%',
      width: '25%',
      height: '20%',
      borderRadius: '70% 60% 70% 50%',
      background: '#F44336'
    },
    // Australia
    {
      top: '55%',
      left: '72%',
      width: '12%',
      height: '10%',
      borderRadius: '60% 70% 80% 60%',
      background: '#E91E63'
    }
  ];

  return (
    <Box 
      ref={containerRef}
      sx={{
        width: size,
        height: size,
        perspective: '1000px',
        position: 'relative'
      }}
    >
      {/* Glow effect */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: size * 1.1,
          height: size * 1.1,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.2) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(20px)',
          zIndex: 0
        }}
      />

      {/* SERA Text that stays in front */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: size / 5,
          fontWeight: 800,
          color: theme.palette.primary.main,
          textShadow: '0 0 10px rgba(63,81,181,0.5)',
          zIndex: 3,
          letterSpacing: '2px',
          pointerEvents: 'none',
        }}
      >
        SERA
      </Box>

      {/* 3D Globe */}
      <Box
        ref={globeRef}
        sx={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(25,118,210,1) 0%, rgba(13,71,161,1) 100%)',
          transformStyle: 'preserve-3d',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8), 0 0 30px rgba(0,120,255,0.3)',
          overflow: 'hidden'
        }}
      >
        {/* Grid lines for globe effect */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '50%',
            background: `
              linear-gradient(transparent 49.5%, rgba(255,255,255,0.1) 50%, transparent 50.5%),
              linear-gradient(90deg, transparent 49.5%, rgba(255,255,255,0.1) 50%, transparent 50.5%)
            `,
            backgroundSize: '10% 10%, 10% 10%',
            opacity: 0.5
          }}
        />

        {/* Continents */}
        {continents.map((continent, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: continent.top,
              left: continent.left,
              width: continent.width,
              height: continent.height,
              background: continent.background,
              borderRadius: continent.borderRadius,
              boxShadow: 'inset 0 0 5px rgba(0,0,0,0.3)'
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default GlobeComponent; 