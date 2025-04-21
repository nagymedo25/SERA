import React, { useEffect, useRef } from 'react';
import {
  Box,
  Button,
  CardContent,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SpaceBackground from '../components/SpaceBackground';
import AnimatedSection from '../components/AnimatedSection';
import FloatingObject from '../components/FloatingObject';
import GlowingCard from '../components/GlowingCard';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import AITechAnimation from '../components/AITechAnimation';
import SchoolIcon from '@mui/icons-material/School';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAuth } from '../context/AuthContext';
import { requireAuth } from '../utils/authUtils';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();

  // Scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollIndicator = document.getElementById('scroll-indicator');
      if (scrollIndicator) {
        if (window.scrollY > 100) {
          scrollIndicator.style.opacity = '0';
        } else {
          scrollIndicator.style.opacity = '1';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero animations with GSAP and ScrollTrigger for reanimation
  useEffect(() => {
    if (!heroRef.current) return;
    
    const heroTitle = heroRef.current.querySelector('.hero-title');
    const heroDesc = heroRef.current.querySelector('.hero-desc');
    const heroButtons = heroRef.current.querySelector('.hero-buttons');
    const heroImage = heroRef.current.querySelector('.hero-image');
    
    // Initial animation timeline
    const animateHero = () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.fromTo(heroTitle, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 })
        .fromTo(heroDesc, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 }, 
          '-=0.8')
        .fromTo(heroButtons, 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 }, 
          '-=0.6')
        .fromTo(heroImage, 
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 1 }, 
          '-=0.8');
          
      return tl;
    };
    
    // Create initial animation
    const masterTl = gsap.timeline();
    masterTl.add(animateHero());
    
    // Create ScrollTrigger for reanimation
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top bottom",
      onEnter: () => {
        masterTl.restart();
      },
      onLeaveBack: () => {
        // Reset when scrolling back up beyond the section
        gsap.set([heroTitle, heroDesc, heroButtons, heroImage], { clearProps: "all" });
      },
      onEnterBack: () => {
        // Reanimate when scrolling back to this section
        masterTl.restart();
      },
      markers: false
    });
    
    return () => {
      masterTl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Features scatter animation
  useEffect(() => {
    if (!featuresRef.current) return;
    
    const featureCards = featuresRef.current.querySelectorAll('.feature-card');
    
    if (featureCards.length) {
      // Set initial positions off-screen randomly
      gsap.set(featureCards, {
        x: () => Math.random() * 1000 - 500,
        y: () => Math.random() * 1000 - 500,
        rotation: () => Math.random() * 360,
        opacity: 0
      });
      
      // Create scroll trigger animation to bring them to place
      ScrollTrigger.create({
        trigger: featuresRef.current,
        start: "top bottom-=100",
        onEnter: () => {
          gsap.to(featureCards, {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "elastic.out(0.8, 0.6)"
          });
        },
        once: true
      });
    }
  }, []);

  const features = [
    {
      title: "AI-Powered Learning",
      description: "Our platform utilizes advanced AI to personalize your learning experience and adapt to your progress.",
      icon: <PsychologyIcon sx={{ fontSize: 56, color: theme.palette.primary.main }} />,
      glowColor: 'rgba(63, 81, 181, 0.5)'
    },
    {
      title: "Skill Assessments",
      description: "Take comprehensive tests to evaluate your skills and identify areas for improvement.",
      icon: <AssessmentIcon sx={{ fontSize: 56, color: theme.palette.primary.main }} />,
      glowColor: 'rgba(77, 208, 225, 0.5)'
    },
    {
      title: "Expert-Led Courses",
      description: "Access high-quality courses created by industry experts in front-end development.",
      icon: <SchoolIcon sx={{ fontSize: 56, color: theme.palette.primary.main }} />,
      glowColor: 'rgba(144, 202, 249, 0.5)'
    },
    {
      title: "Certified Recognition",
      description: "Earn industry-recognized certificates to showcase your skills to employers.",
      icon: <WorkspacePremiumIcon sx={{ fontSize: 56, color: theme.palette.primary.main }} />,
      glowColor: 'rgba(245, 0, 87, 0.5)'
    }
  ];

  // Learning paths with images
  const learningPaths = [
    {
      title: "Front-End Development",
      description: "Master modern front-end technologies including HTML, CSS, JavaScript, React, and more. Build responsive and interactive web applications.",
      image: "https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg",
      status: "available",
      color: theme.palette.primary.main
    },
    {
      title: "Back-End Development",
      description: "Learn server-side programming, databases, API development, and cloud deployment. Build robust and scalable back-end systems.",
      image: "https://img.freepik.com/free-vector/programmers-using-javascript-programming-language-computer-tiny-people-javascript-language-javascript-engine-js-web-development-concept-bright-vibrant-violet-isolated-illustration_335657-946.jpg",
      status: "coming",
      color: "text.disabled"
    },
    {
      title: "Full-Stack Development",
      description: "Combine front-end and back-end skills to become a versatile developer capable of building complete web applications from scratch.",
      image: "https://img.freepik.com/free-vector/programmer-working-with-programming-languages_52683-23853.jpg",
      status: "coming",
      color: "text.disabled"
    }
  ];

  // Handler for take assessment button
  const handleTakeAssessment = () => {
    if (requireAuth(isAuthenticated, navigate)) {
      navigate('/assessment');
    }
  };

  // Handler for start path button
  const handleStartPath = () => {
    if (requireAuth(isAuthenticated, navigate)) {
      navigate('/assessment');
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <Box
        ref={heroRef}
        id="hero"
        sx={{
          background: 'linear-gradient(135deg, rgba(15,15,25,1) 0%, rgba(25,25,35,1) 100%)',
          pt: { xs: 12, md: 18 },
          pb: { xs: 12, md: 18 },
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Abstract shapes in background */}
        <Box
          className="rotate-slow"
          sx={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(63,81,181,0.15) 0%, rgba(63,81,181,0) 70%)',
            filter: 'blur(40px)',
            opacity: 0.5,
            zIndex: 0
          }}
        />
        <Box
          className="rotate"
          sx={{
            position: 'absolute',
            bottom: '5%',
            left: '10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,0,87,0.1) 0%, rgba(245,0,87,0) 70%)',
            filter: 'blur(50px)',
            opacity: 0.4,
            zIndex: 0
          }}
        />
        
        <FloatingObject 
          top="15%" 
          left="15%" 
          size={80} 
          shape="triangle" 
          color="rgba(63,81,181,0.15)" 
          blur={5}
          speed="slow"
        />
        
        <FloatingObject 
          bottom="20%" 
          right="18%" 
          size={120} 
          shape="square" 
          color="rgba(245,0,87,0.1)" 
          blur={8}
          rotate
          speed="slow"
        />
        
        <FloatingObject 
          top="30%" 
          right="30%" 
          size={40} 
          shape="circle" 
          color="rgba(255,255,255,0.08)" 
          blur={3}
          speed="fast"
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                className="hero-title"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  background: 'linear-gradient(90deg, #ffffff 0%, #b0b0b0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Elevate Your Tech Career with AI-Driven Learning
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                paragraph
                className="hero-desc"
                sx={{ 
                  mb: 4, 
                  fontSize: { xs: '1rem', md: '1.25rem' }
                }}
              >
                SERA provides personalized learning paths, skills assessment, and industry-recognized certifications 
                to help you excel in the world of front-end development.
              </Typography>
              <Box 
                className="hero-buttons"
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexWrap: 'wrap'
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate('/register')}
                  className="pulse"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: `0 8px 20px ${theme.palette.primary.main}50`,
                      '& .MuiButton-endIcon': {
                        transform: 'translateX(5px)'
                      }
                    },
                    '& .MuiButton-endIcon': {
                      transition: 'transform 0.3s ease'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      animation: 'shimmer 2s infinite'
                    }
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={handleTakeAssessment}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(63,81,181,0.08)',
                      boxShadow: `0 8px 20px rgba(0,0,0,0.1)`,
                      borderColor: theme.palette.primary.main,
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: -1,
                      transition: 'all 0.3s ease',
                      backgroundImage: 'linear-gradient(120deg, transparent, transparent, rgba(63,81,181,0.05), transparent, transparent)',
                      backgroundSize: '200% 100%',
                      backgroundPosition: '100% 0'
                    },
                    '&:hover::after': {
                      backgroundPosition: '0 0',
                    }
                  }}
                >
                  Take Assessment
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <AITechAnimation className="hero-image" />
            </Grid>
          </Grid>
        </Container>
        
        {/* Scroll indicator */}
        <Box
          id="scroll-indicator"
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'rgba(255,255,255,0.6)',
            transition: 'opacity 0.3s ease',
            zIndex: 10
          }}
        >
          <Typography variant="body2" sx={{ mb: 1 }}>
            Scroll to explore
          </Typography>
          <KeyboardArrowDownIcon className="float-fast" />
        </Box>
      </Box>

      {/* Continuous space background for all sections below */}
      <Box sx={{ position: 'relative' }}>
        <SpaceBackground starCount={150} circularMotion={true} />
        
        {/* Features Section */}
        <AnimatedSection id="features" animationType="fade" delay={0.2}
          sx={{ py: { xs: 8, md: 12 }, position: 'relative', zIndex: 2 }}
          ref={featuresRef}
        >
          <Container maxWidth="lg">
            <Typography variant="h3" component="h2" className="section-title">
              Why Choose SERA
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              align="center"
              sx={{
                maxWidth: '700px',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.1rem' },
                mb: 8
              }}
            >
              Our innovative platform combines cutting-edge AI technology with expert-created content
              to deliver a superior learning experience.
            </Typography>

            <Grid container spacing={4} className="equal-height-grid">
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <GlowingCard 
                    className="feature-card"
                    glowColor={feature.glowColor}
                    glowIntensity={0.5}
                    glowSize={6}
                    delay={index * 0.3} 
                    animationDuration={4}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      height: '100%',
                      p: 2,
                      minHeight: 270
                    }}>
                      <Box mb={3} className="float">{feature.icon}</Box>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h3"
                        align="center"
                        sx={{ fontWeight: 600, mb: 2 }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" align="center">
                        {feature.description}
                      </Typography>
                    </Box>
                  </GlowingCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </AnimatedSection>

        {/* Available Paths Section */}
        <AnimatedSection id="paths" animationType="stagger"
          sx={{ py: { xs: 8, md: 12 }, position: 'relative', zIndex: 2 }}
        >
          <Container maxWidth="lg">
            <Typography variant="h3" component="h2" className="section-title">
              Learning Paths
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              align="center"
              sx={{
                maxWidth: '700px',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.1rem' },
                mb: 8
              }}
            >
              Explore our specialized learning paths designed to help you master different areas of technology
            </Typography>

            <Grid container spacing={4} className="equal-height-grid">
              {learningPaths.map((path, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <GlowingCard 
                    glowColor={path.status === 'available' ? 'rgba(63,81,181,0.5)' : 'rgba(120,120,120,0.4)'}
                    glowIntensity={path.status === 'available' ? 0.6 : 0.4}
                    glowSize={8}
                    delay={index * 0.3}
                    sx={{ 
                      filter: path.status === 'available' ? 'none' : 'grayscale(100%)',
                      height: '100%'
                    }}
                  >
                    <Box sx={{
                      position: 'relative',
                      minHeight: 400,
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      {/* Image at the top */}
                      <Box
                        sx={{
                          height: 180,
                          overflow: 'hidden',
                          borderRadius: '8px',
                          mb: 2,
                          position: 'relative',
                          border: `1px solid ${path.status === 'available' ? theme.palette.primary.main : 'rgba(255,255,255,0.1)'}`,
                        }}
                      >
                        <Box
                          component="img"
                          src={path.image}
                          alt={path.title}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease',
                            '&:hover': {
                              transform: 'scale(1.05)'
                            }
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            backgroundColor: path.color,
                            color: 'white',
                            px: 2,
                            py: 0.5,
                            borderBottomLeftRadius: 8
                          }}
                        >
                          <Typography variant="caption" fontWeight="bold">
                            {path.status === 'available' ? 'AVAILABLE NOW' : 'COMING SOON'}
                          </Typography>
                        </Box>
                      </Box>
                      
                      {/* Content */}
                      <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                          {path.title}
                        </Typography>
                        <Typography color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                          {path.description}
                        </Typography>
                        <Box mt={2}>
                          {path.status === 'available' ? (
                            <Button 
                              variant="contained" 
                              color="primary"
                              onClick={handleStartPath}
                              endIcon={<ArrowForwardIcon />}
                              sx={{
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  boxShadow: `0 8px 20px ${theme.palette.primary.main}50`,
                                  '& .MuiButton-endIcon': {
                                    transform: 'translateX(5px)'
                                  }
                                },
                                '& .MuiButton-endIcon': {
                                  transition: 'transform 0.3s ease'
                                },
                                '&::after': {
                                  content: '""',
                                  position: 'absolute',
                                  top: 0,
                                  left: '-100%',
                                  width: '100%',
                                  height: '100%',
                                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                  animation: 'shimmer 2s infinite'
                                }
                              }}
                            >
                              Start Path
                            </Button>
                          ) : (
                            <Button 
                              variant="outlined" 
                              disabled
                              sx={{
                                '&.Mui-disabled': {
                                  borderColor: 'rgba(255,255,255,0.1)'
                                }
                              }}
                            >
                              Coming Soon
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </GlowingCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection id="faq" animationType="fade" delay={0.2}
          sx={{ position: 'relative', zIndex: 2 }}
        >
          <FAQSection />
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection id="contact" animationType="fade" delay={0.2}
          sx={{ position: 'relative', zIndex: 2 }}
        >
          <ContactSection />
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection id="cta" animationType="scale"
          sx={{ py: { xs: 8, md: 12 }, position: 'relative', zIndex: 2 }}
        >
          <Container maxWidth="md">
            <Box
              className="glow-border"
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                background: 'rgba(20, 20, 30, 0.7)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Background animation */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -100,
                  left: -100,
                  width: 300,
                  height: 300,
                  background: 'radial-gradient(circle, rgba(63,81,181,0.3) 0%, rgba(63,81,181,0) 70%)',
                  filter: 'blur(40px)',
                  borderRadius: '50%',
                  zIndex: -1
                }}
                className="rotate-slow"
              />
              
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  background: 'radial-gradient(circle, rgba(245,0,87,0.2) 0%, rgba(245,0,87,0) 70%)',
                  filter: 'blur(30px)',
                  borderRadius: '50%',
                  zIndex: -1
                }}
                className="rotate"
              />
              
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                className="section-title"
                sx={{ fontSize: { xs: '2rem', md: '2.75rem' } }}
              >
                Ready to Start Your Learning Journey?
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                paragraph
                sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
              >
                Join SERA today and take the first step towards mastering front-end development with our
                AI-powered learning platform.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/register')}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 5,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: `0 8px 20px ${theme.palette.primary.main}50`,
                    '& .MuiButton-endIcon': {
                      transform: 'translateX(5px)'
                    }
                  },
                  '& .MuiButton-endIcon': {
                    transition: 'transform 0.3s ease'
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    animation: 'shimmer 2s infinite'
                  }
                }}
              >
                Get Started For Free
              </Button>
            </Box>
          </Container>
        </AnimatedSection>
      </Box>
    </Layout>
  );
};

export default Home; 