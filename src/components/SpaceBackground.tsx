import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';

interface SpaceBackgroundProps {
  starCount?: number;
  comets?: boolean;
  circularMotion?: boolean;
}

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ 
  starCount = 150,
  comets = false,
  circularMotion = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Clear existing stars
    container.innerHTML = '';
    
    // Create stars
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random star properties
      const size = Math.random() * 1.5 + 0.5; // Slightly bigger stars
      const opacity = Math.random() * 0.5 + 0.3; // More subtle opacity
      
      // Position randomly
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = `${opacity}`;
      
      if (!circularMotion) {
        // Subtle twinkle effect
        star.style.setProperty('--duration', `${Math.random() * 4 + 3}s`); // Slower twinkling
        star.style.setProperty('--delay', `${Math.random() * 5}s`);
      } else {
        // Remove twinkle animation class and just use opacity
        star.classList.remove('star');
        star.style.position = 'absolute';
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
      }
      
      container.appendChild(star);
      stars.push(star);
    }
    
    // Create tech elements
    createTechElements(container);
    
    // Circular motion with GSAP
    if (circularMotion && stars.length) {
      stars.forEach((star, i) => {
        const radius = Math.random() * 15; // Smaller radius for more subtle movement
        const speed = Math.random() * 60 + 80; // Much slower rotation (80-140 seconds)
        const centerX = parseFloat(star.style.left);
        const centerY = parseFloat(star.style.top);
        
        gsap.to(star, {
          duration: speed,
          repeat: -1,
          ease: "none",
          onUpdate: function() {
            const angle = this.time() * (360 / speed) * (Math.PI / 180);
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
          }
        });
        
        // Subtle twinkling effect
        gsap.to(star, {
          opacity: Math.random() * 0.3 + 0.1, // Very subtle opacity changes
          duration: Math.random() * 3 + 4, // Slower twinkling
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 3
        });
      });
    }
    
    // Create comets
    if (comets) {
      createComet(container);
      
      // Create new comets periodically
      const interval = setInterval(() => {
        createComet(container);
      }, 12000);
      
      return () => {
        clearInterval(interval);
        // Clean up GSAP animations
        if (circularMotion) {
          gsap.killTweensOf(".star");
          gsap.killTweensOf(".tech-element");
        }
      };
    }
    
    return () => {
      // Clean up GSAP animations
      if (circularMotion) {
        gsap.killTweensOf(".star");
        gsap.killTweensOf(".tech-element");
      }
    };
  }, [starCount, comets, circularMotion]);
  
  const createTechElements = (container: HTMLDivElement) => {
    // Tech elements - simplified shapes representing AI and technology
    const techElements = [
      { shape: 'circuit', posX: 15, posY: 20, size: 60, rotation: 10 },
      { shape: 'chip', posX: 75, posY: 30, size: 50, rotation: -15 },
      { shape: 'brain', posX: 55, posY: 70, size: 70, rotation: 5 },
      { shape: 'data', posX: 25, posY: 65, size: 40, rotation: -5 }
    ];
    
    techElements.forEach(elem => {
      const techElement = document.createElement('div');
      techElement.className = 'tech-element';
      techElement.style.position = 'absolute';
      techElement.style.left = `${elem.posX}%`;
      techElement.style.top = `${elem.posY}%`;
      techElement.style.width = `${elem.size}px`;
      techElement.style.height = `${elem.size}px`;
      techElement.style.opacity = '0.12';
      techElement.style.transform = `rotate(${elem.rotation}deg)`;
      
      // Different shapes for tech elements
      switch (elem.shape) {
        case 'circuit': // Circuit-like pattern
          techElement.style.border = '1px solid rgba(64, 134, 255, 0.5)';
          techElement.style.borderRadius = '50%';
          techElement.style.boxShadow = '0 0 20px rgba(64, 134, 255, 0.2)';
          techElement.style.backgroundImage = 'radial-gradient(circle at 50% 50%, transparent 90%, rgba(64, 134, 255, 0.3) 90%)';
          break;
        case 'chip': // Microchip-like shape
          techElement.style.border = '1px solid rgba(120, 200, 255, 0.5)';
          techElement.style.borderRadius = '4px';
          techElement.style.backgroundImage = 'linear-gradient(90deg, transparent 25%, rgba(120, 200, 255, 0.2) 25%, rgba(120, 200, 255, 0.2) 26%, transparent 26%, transparent 50%, rgba(120, 200, 255, 0.2) 50%, rgba(120, 200, 255, 0.2) 51%, transparent 51%, transparent 75%, rgba(120, 200, 255, 0.2) 75%, rgba(120, 200, 255, 0.2) 76%, transparent 76%)';
          techElement.style.backgroundSize = '20px 20px';
          break;
        case 'brain': // Brain/AI abstract shape
          techElement.style.border = '1px solid rgba(164, 80, 255, 0.5)';
          techElement.style.borderRadius = '44% 56% 65% 35% / 48% 40% 60% 52%';
          techElement.style.boxShadow = '0 0 25px rgba(164, 80, 255, 0.2)';
          break;
        case 'data': // Data flow
          techElement.style.border = '1px solid rgba(64, 224, 208, 0.5)';
          techElement.style.borderRadius = '40px';
          techElement.style.backgroundImage = 'linear-gradient(0deg, transparent 40%, rgba(64, 224, 208, 0.2) 40%, rgba(64, 224, 208, 0.2) 60%, transparent 60%)';
          techElement.style.backgroundSize = '10px 10px';
          break;
      }
      
      container.appendChild(techElement);
      
      // Animate tech elements
      gsap.to(techElement, {
        rotation: `+=${Math.random() * 20 - 10}`,
        scale: 1.1,
        opacity: 0.18,
        duration: Math.random() * 20 + 40,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  };
  
  const createComet = (container: HTMLDivElement) => {
    const comet = document.createElement('div');
    
    // Comet styling
    comet.style.position = 'absolute';
    comet.style.width = `${Math.random() * 80 + 40}px`;
    comet.style.height = '1px';
    comet.style.transformOrigin = 'left';
    comet.style.left = `${Math.random() * 100}%`;
    comet.style.top = `${Math.random() * 50}%`;
    comet.style.background = 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)';
    comet.style.borderRadius = '50%';
    comet.style.boxShadow = '0 0 10px rgba(255,255,255,0.5)';
    comet.style.transform = `rotate(${Math.random() * 20 - 30}deg)`;
    
    // Use GSAP for comet animation
    comet.style.opacity = '0';
    container.appendChild(comet);
    
    gsap.fromTo(comet, 
      { opacity: 0, x: 0 },
      { 
        opacity: 1, 
        x: '100vw', 
        duration: Math.random() * 2 + 2,
        ease: "power1.in",
        onComplete: () => {
          if (container.contains(comet)) {
            container.removeChild(comet);
          }
        }
      }
    );
  };
  
  return (
    <Box
      ref={containerRef}
      className="space-background"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at bottom, #0a0a12 0%, #000000 100%)', // Darker background
        overflow: 'hidden',
        zIndex: 0
      }}
    />
  );
};

export default SpaceBackground; 