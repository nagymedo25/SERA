import React, { useEffect, useRef, forwardRef } from 'react';
import { Box, BoxProps } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps extends BoxProps {
  animateFrom?: 'left' | 'right' | 'bottom' | 'top' | 'fade';
  animationType?: string; // للتوافق مع الاستخدامات القديمة
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
  children: React.ReactNode;
}

const AnimatedSection = forwardRef<HTMLDivElement, AnimatedSectionProps>((props, ref) => {
  const {
    animateFrom = 'fade',
    animationType, // سيتم تجاهلها فقط للتوافق مع الاستخدامات القديمة
    delay = 0,
    duration = 0.8,
    distance = 100,
    threshold = 0.2,
    once = false,
    children,
    sx,
    ...rest
  } = props;
  
  const localRef = useRef<HTMLDivElement>(null);
  const sectionRef = ref || localRef;
  
  useEffect(() => {
    const section = (sectionRef as React.RefObject<HTMLDivElement>).current;
    if (!section) return;
    
    let initialProps = {};
    
    switch (animateFrom) {
      case 'left':
        initialProps = { x: -distance, opacity: 0 };
        break;
      case 'right':
        initialProps = { x: distance, opacity: 0 };
        break;
      case 'top':
        initialProps = { y: -distance, opacity: 0 };
        break;
      case 'bottom':
        initialProps = { y: distance, opacity: 0 };
        break;
      case 'fade':
      default:
        initialProps = { opacity: 0 };
        break;
    }
    
    // Set initial state
    gsap.set(section, initialProps);
    
    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: `top bottom-=${threshold * 100}%`,
        toggleActions: once ? 'play none none none' : 'play none none reset',
        markers: false
      }
    });
    
    tl.to(section, {
      x: 0,
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: "power2.out"
    });
    
    return () => {
      // Clean up animation
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [animateFrom, delay, duration, distance, threshold, once, sectionRef]);
  
  // نزيل خاصية animationType من الخصائص المنتقلة إلى DOM
  const domProps = { ...rest };
  
  return (
    <Box
      ref={sectionRef}
      sx={{
        opacity: 0, // Start invisible
        ...sx
      }}
      {...domProps}
    >
      {children}
    </Box>
  );
});

// إضافة اسم عرض للمكون لتحسين التصحيح
AnimatedSection.displayName = 'AnimatedSection';

export default AnimatedSection; 