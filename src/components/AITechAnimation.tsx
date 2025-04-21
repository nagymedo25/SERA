import React, { useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import { gsap } from 'gsap';

interface AITechAnimationProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const AITechAnimation: React.FC<AITechAnimationProps> = ({
  width = '100%',
  height = 'auto',
  className = ''
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const theme = useTheme();

  // Animation setup
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const brain = svg.querySelector('#brain');
    const circuits = svg.querySelectorAll('.circuit');
    const dataPoints = svg.querySelectorAll('.data-point');
    const pulses = svg.querySelectorAll('.pulse');
    const screen = svg.querySelector('#screen');
    const gears = svg.querySelectorAll('.gear');
    const certificate = svg.querySelector('#certificate');
    const codeLines = svg.querySelectorAll('.code-line');
    const certificateLines = svg.querySelectorAll('.certificate-text');
    const codeTyping = svg.querySelector('#code-editor');

    // Reset animations
    gsap.set([brain, circuits, dataPoints, pulses, gears, certificate, codeLines, certificateLines], { clearProps: "all" });

    // Brain pulse animation
    gsap.to(brain, {
      scale: 1.05,
      opacity: 0.9,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Circuit animations
    gsap.fromTo(circuits, 
      { strokeDashoffset: 1000 },
      { 
        strokeDashoffset: 0, 
        duration: 3, 
        stagger: 0.2,
        ease: "power1.inOut",
        repeat: -1
      }
    );

    // Data points animations
    gsap.to(dataPoints, {
      y: -10,
      opacity: 0.8,
      duration: 1.5,
      stagger: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Pulse animations
    gsap.fromTo(pulses,
      { scale: 0.8, opacity: 0.1 },
      { 
        scale: 1.2, 
        opacity: 0.7, 
        duration: 1.5, 
        stagger: 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      }
    );

    // Screen flicker
    gsap.to(screen, {
      opacity: 0.85,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Gear rotation
    gears.forEach((gear, index) => {
      gsap.to(gear, {
        rotation: index % 2 === 0 ? 360 : -360,
        transformOrigin: 'center center',
        duration: 8 + index * 4,
        repeat: -1,
        ease: "none"
      });
    });

    // Certificate float animation
    gsap.to(certificate, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Certificate text typing animation
    gsap.fromTo(certificateLines, 
      { width: 0 },
      { 
        width: '100%', 
        duration: 2, 
        stagger: 0.5,
        repeat: -1,
        repeatDelay: 5,
        ease: "steps(20)"
      }
    );

    // Code typing animation
    gsap.fromTo(codeTyping,
      { opacity: 0.7 },
      { 
        opacity: 1, 
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)"
      }
    );

    // Code lines typing animation
    gsap.fromTo(codeLines, 
      { width: 0 },
      { 
        width: '100%', 
        duration: 1.5, 
        stagger: 0.3,
        repeat: -1,
        repeatDelay: 3,
        ease: "steps(30)"
      }
    );

    return () => {
      // Clean up animations
      gsap.killTweensOf([brain, circuits, dataPoints, pulses, screen, gears, certificate, codeLines, certificateLines, codeTyping]);
    };
  }, []);

  return (
    <Box
      sx={{
        width,
        height,
        position: 'relative',
        perspective: '1000px',
        transform: 'perspective(1000px) rotateY(-5deg)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'perspective(1000px) rotateY(0deg)'
        }
      }}
      className={`float ${className}`}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 800 600"
        width="100%"
        height="100%"
        style={{
          borderRadius: 16,
          filter: 'drop-shadow(0 10px 40px rgba(0,0,0,0.3))',
          background: 'linear-gradient(135deg, #0a0a14 0%, #1a1a28 100%)'
        }}
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a0a14" />
            <stop offset="100%" stopColor="#1a1a28" />
          </linearGradient>
          
          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(64, 134, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(64, 134, 255, 0)" />
          </radialGradient>
          
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Certificate paper texture */}
          <pattern id="paper" patternUnits="userSpaceOnUse" width="100" height="100">
            <rect width="100" height="100" fill="#f8f8f0" />
            <path d="M0,0 L100,100 M100,0 L0,100" stroke="#f0f0e8" strokeWidth="1" />
          </pattern>

          {/* Code editor pattern */}
          <pattern id="editor-bg" patternUnits="userSpaceOnUse" width="100" height="100">
            <rect width="100" height="100" fill="#1e1e2d" />
            <rect width="100" height="1" fill="#2a2a3a" y="20" />
            <rect width="100" height="1" fill="#2a2a3a" y="40" />
            <rect width="100" height="1" fill="#2a2a3a" y="60" />
            <rect width="100" height="1" fill="#2a2a3a" y="80" />
          </pattern>
        </defs>

        {/* Background */}
        <rect width="800" height="600" fill="url(#bgGradient)" />
        
        {/* Glow effect */}
        <circle cx="400" cy="300" r="200" fill="url(#glowGradient)" />

        {/* Computer base */}
        <rect x="200" y="350" width="400" height="20" rx="5" fill="#222" />
        <rect x="250" y="150" width="300" height="200" rx="10" fill="#333" />
        
        {/* Screen */}
        <rect id="screen" x="270" y="170" width="260" height="160" rx="5" fill="#0a1929" opacity="0.9" />
        
        {/* Circuits on screen */}
        <path 
          className="circuit" 
          d="M300,250 Q350,200 400,250 T500,250" 
          fill="none" 
          stroke="#4086FF" 
          strokeWidth="2" 
          strokeDasharray="5,5"
          opacity="0.7" 
        />
        <path 
          className="circuit" 
          d="M300,280 L350,280 L350,230 L450,230 L450,280 L500,280" 
          fill="none" 
          stroke="#4086FF" 
          strokeWidth="2" 
          strokeDasharray="5,5"
          opacity="0.7" 
        />
        <path 
          className="circuit" 
          d="M300,200 L380,200 L380,300 L500,300" 
          fill="none" 
          stroke="#4086FF" 
          strokeWidth="2" 
          strokeDasharray="5,5"
          opacity="0.7" 
        />

        {/* Data points */}
        <circle className="data-point" cx="300" cy="250" r="4" fill="#41e9ff" />
        <circle className="data-point" cx="350" cy="200" r="4" fill="#41e9ff" />
        <circle className="data-point" cx="400" cy="250" r="4" fill="#41e9ff" />
        <circle className="data-point" cx="500" cy="250" r="4" fill="#41e9ff" />
        <circle className="data-point" cx="300" cy="280" r="4" fill="#41e9ff" />
        <circle className="data-point" cx="350" cy="280" r="4" fill="#41e9ff" />
        <circle className="data-point" cx="450" cy="280" r="4" fill="#41e9ff" />
        <circle className="data-point" cx="500" cy="280" r="4" fill="#41e9ff" />
        <circle className="data-point" cx="300" cy="200" r="4" fill="#41e9ff" />
        <circle className="data-point" cx="380" cy="200" r="4" fill="#41e9ff" />
        <circle className="data-point" cx="380" cy="300" r="4" fill="#41e9ff" />
        <circle className="data-point" cx="500" cy="300" r="4" fill="#41e9ff" />

        {/* Pulses */}
        <circle className="pulse" cx="400" cy="250" r="30" fill="none" stroke="#41e9ff" strokeWidth="1" opacity="0.3" />
        <circle className="pulse" cx="400" cy="250" r="60" fill="none" stroke="#41e9ff" strokeWidth="1" opacity="0.2" />
        <circle className="pulse" cx="400" cy="250" r="90" fill="none" stroke="#41e9ff" strokeWidth="1" opacity="0.1" />

        {/* Brain in the center */}
        <g id="brain" opacity="0.8">
          <path 
            d="M400,220 C430,210 450,240 440,260 C470,270 470,300 440,310 C450,330 430,350 400,340 C370,350 350,330 360,310 C330,300 330,270 360,260 C350,240 370,210 400,220 Z" 
            fill="none" 
            stroke="#a450ff" 
            strokeWidth="2" 
          />
          <path 
            d="M380,230 C380,250 420,250 420,230" 
            fill="none" 
            stroke="#a450ff" 
            strokeWidth="2" 
          />
          <path 
            d="M380,330 C380,310 420,310 420,330" 
            fill="none" 
            stroke="#a450ff" 
            strokeWidth="2" 
          />
          <path 
            d="M400,260 L400,300" 
            fill="none" 
            stroke="#a450ff" 
            strokeWidth="2" 
          />
          <path 
            d="M380,280 L420,280" 
            fill="none" 
            stroke="#a450ff" 
            strokeWidth="2" 
          />
        </g>

        {/* Gears around the computer */}
        <g className="gear" transform="translate(180, 200)">
          <circle cx="0" cy="0" r="20" fill="none" stroke="#666" strokeWidth="3" />
          <path d="M0,-30 L0,-20 M0,20 L0,30 M-30,0 L-20,0 M20,0 L30,0 M-21,-21 L-14,-14 M14,-14 L21,-21 M-21,21 L-14,14 M14,14 L21,21" 
            stroke="#666" strokeWidth="3" />
        </g>
        
        <g className="gear" transform="translate(620, 200)">
          <circle cx="0" cy="0" r="25" fill="none" stroke="#666" strokeWidth="3" />
          <path d="M0,-35 L0,-25 M0,25 L0,35 M-35,0 L-25,0 M25,0 L35,0 M-25,-25 L-18,-18 M18,-18 L25,-25 M-25,25 L-18,18 M18,18 L25,25" 
            stroke="#666" strokeWidth="3" />
        </g>
        
        <g className="gear" transform="translate(200, 400)">
          <circle cx="0" cy="0" r="15" fill="none" stroke="#666" strokeWidth="3" />
          <path d="M0,-22 L0,-15 M0,15 L0,22 M-22,0 L-15,0 M15,0 L22,0 M-16,-16 L-11,-11 M11,-11 L16,-16 M-16,16 L-11,11 M11,11 L16,16" 
            stroke="#666" strokeWidth="3" />
        </g>
        
        <g className="gear" transform="translate(600, 400)">
          <circle cx="0" cy="0" r="18" fill="none" stroke="#666" strokeWidth="3" />
          <path d="M0,-25 L0,-18 M0,18 L0,25 M-25,0 L-18,0 M18,0 L25,0 M-18,-18 L-13,-13 M13,-13 L18,-18 M-18,18 L-13,13 M13,13 L18,18" 
            stroke="#666" strokeWidth="3" />
        </g>

        {/* Certificate */}
        <g id="certificate" transform="translate(200, 450)">
          {/* Certificate paper */}
          <rect x="0" y="0" width="160" height="120" rx="5" fill="url(#paper)" stroke="#d0d0c0" strokeWidth="2" />
          
          {/* Certificate border */}
          <rect x="5" y="5" width="150" height="110" rx="3" fill="none" stroke="#a08060" strokeWidth="1" strokeDasharray="2,2" />
          
          {/* Certificate seal */}
          <circle cx="130" cy="90" r="20" fill="#f5c542" />
          <path d="M130,70 L135,90 L155,90 L140,100 L145,120 L130,110 L115,120 L120,100 L105,90 L125,90 Z" fill="#d4a520" />
          
          {/* Certificate ribbon */}
          <path d="M140,110 L150,130 M120,110 L110,130" stroke="#c34a3e" strokeWidth="3" />
          
          {/* Certificate text lines with typing animation */}
          <rect x="20" y="30" width="120" height="2" className="certificate-text" fill="#333" />
          <rect x="30" y="45" width="100" height="2" className="certificate-text" fill="#333" />
          <rect x="40" y="60" width="80" height="2" className="certificate-text" fill="#333" />
          <rect x="25" y="75" width="70" height="2" className="certificate-text" fill="#333" />
        </g>

        {/* Code Editor */}
        <g id="code-editor" transform="translate(400, 450)">
          {/* Editor background */}
          <rect x="0" y="0" width="180" height="120" rx="5" fill="url(#editor-bg)" stroke="#333" strokeWidth="2" />
          
          {/* Editor top bar */}
          <rect x="0" y="0" width="180" height="20" rx="5" fill="#2a2a3a" />
          <circle cx="15" cy="10" r="5" fill="#f55" />
          <circle cx="35" cy="10" r="5" fill="#fb2" />
          <circle cx="55" cy="10" r="5" fill="#2c2" />
          
          {/* Code editor content with typing animation */}
          <rect x="10" y="30" width="0" height="3" className="code-line" fill="#ff5c57" />
          <rect x="25" y="30" width="0" height="3" className="code-line" fill="#ccc" />
          <rect x="10" y="45" width="0" height="3" className="code-line" fill="#569cd6" />
          <rect x="40" y="45" width="0" height="3" className="code-line" fill="#4ec9b0" />
          <rect x="20" y="60" width="0" height="3" className="code-line" fill="#ce9178" />
          <rect x="15" y="75" width="0" height="3" className="code-line" fill="#dcdcaa" />
          <rect x="20" y="90" width="0" height="3" className="code-line" fill="#c586c0" />
          <rect x="30" y="105" width="0" height="3" className="code-line" fill="#4fc1ff" />
          
          {/* Cursor */}
          <rect x="90" y="45" width="2" height="12" fill="#fff" id="cursor" />
        </g>

        {/* Binary code background */}
        <text x="30" y="100" fill="#444" fontSize="10" opacity="0.3">01001001 01101110 01110100 01100101 01101100 01101100 01101001 01100111 01100101 01101110 01100011 01100101</text>
        <text x="30" y="120" fill="#444" fontSize="10" opacity="0.3">01000001 01110010 01110100 01101001 01100110 01101001 01100011 01101001 01100001 01101100 00100000 01001100 01100101 01100001 01110010 01101110 01101001 01101110 01100111</text>
        <text x="30" y="460" fill="#444" fontSize="10" opacity="0.3">01000100 01100101 01100101 01110000 00100000 01001100 01100101 01100001 01110010 01101110 01101001 01101110 01100111</text>
        <text x="30" y="480" fill="#444" fontSize="10" opacity="0.3">01001101 01100001 01100011 01101000 01101001 01101110 01100101 00100000 01001100 01100101 01100001 01110010 01101110 01101001 01101110 01100111</text>
      </svg>
    </Box>
  );
};

export default AITechAnimation; 