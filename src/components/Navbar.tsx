import React, { useEffect, useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Avatar,
  Fade
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/Logo.png';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);

  const isHomePage = location.pathname === '/';

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Update active section on scroll
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const sections = ['hero', 'features', 'paths', 'faq', 'contact', 'cta'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogin = () => {
    navigate('/login');
    setLoginMenuOpen(false);
  };

  const handleRegister = () => {
    navigate('/register');
    setLoginMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setLoginMenuOpen(false);
  };

  const handleDashboard = () => {
    navigate('/dashboard');
    setLoginMenuOpen(false);
  };

  const handleAssessment = () => {
    navigate('/assessment');
  };

  const mobileMenuItems = [
    { text: 'Home', onClick: () => navigate('/') },
    ...(isHomePage ? [
      { text: 'Features', onClick: () => scrollToSection('features') },
      { text: 'Learning Paths', onClick: () => scrollToSection('paths') },
      { text: 'FAQ', onClick: () => scrollToSection('faq') },
      { text: 'Contact', onClick: () => scrollToSection('contact') },
      { text: 'Get Started', onClick: () => scrollToSection('cta') }
    ] : []),
    ...(isAuthenticated
      ? [
          { text: 'Dashboard', onClick: handleDashboard },
          { text: 'Assessment', onClick: handleAssessment },
          { text: 'Logout', onClick: handleLogout }
        ]
      : [
          { text: 'Login', onClick: handleLogin },
          { text: 'Register', onClick: handleRegister }
        ])
  ];

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {mobileMenuItems.map((item, index) => (
          <ListItem button key={index} onClick={item.onClick}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const buttonStyle = {
    opacity: 0.9,
    borderRadius: '4px',
    paddingX: '16px',
    paddingY: '8px',
    transition: 'all 0.3s ease',
    fontWeight: 500,
    '&:hover': {
      opacity: 1,
      transform: 'translateY(-2px)',
    }
  };

  const activeButtonStyle = {
    ...buttonStyle,
    opacity: 1,
    background: 'rgba(255, 255, 255, 0.08)',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '20px',
      height: '2px',
      background: theme.palette.primary.main
    }
  };

  return (
    <Fade in={true} timeout={1200}>
      <AppBar position="fixed" elevation={0} sx={{ 
        background: 'rgba(20, 20, 30, 0.8)', 
        backdropFilter: 'blur(8px)'
      }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src={Logo}
              alt="SERA Logo"
              sx={{
                height: '22px',
                width: 'auto',
                mr: 1
              }}
            />
          </Box>

          {/* Center section links - visible only on desktop */}
          {!isMobile && (
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              position: 'absolute', 
              left: '50%', 
              transform: 'translateX(-50%)'
            }}>
              {isHomePage && (
                <>
                  <Button 
                    color="inherit" 
                    onClick={() => scrollToSection('features')}
                    sx={activeSection === 'features' ? activeButtonStyle : buttonStyle}
                  >
                    Features
                  </Button>
                  <Button 
                    color="inherit" 
                    onClick={() => scrollToSection('paths')}
                    sx={activeSection === 'paths' ? activeButtonStyle : buttonStyle}
                  >
                    Learning Paths
                  </Button>
                  <Button 
                    color="inherit" 
                    onClick={() => scrollToSection('faq')}
                    sx={activeSection === 'faq' ? activeButtonStyle : buttonStyle}
                  >
                    FAQ
                  </Button>
                  <Button 
                    color="inherit" 
                    onClick={() => scrollToSection('contact')}
                    sx={activeSection === 'contact' ? activeButtonStyle : buttonStyle}
                  >
                    Contact
                  </Button>
                  <Button 
                    color="inherit" 
                    onClick={() => scrollToSection('cta')}
                    sx={activeSection === 'cta' ? activeButtonStyle : buttonStyle}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </Box>
          )}

          {/* Right side - Mobile menu or auth buttons */}
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isAuthenticated ? (
                <Box sx={{ position: 'relative' }}>
                  <Button 
                    onClick={() => setLoginMenuOpen(!loginMenuOpen)}
                    sx={{
                      borderRadius: '50px',
                      background: theme.palette.primary.main,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2,
                      py: 1,
                      '&:hover': {
                        background: theme.palette.primary.dark,
                      },
                      transition: 'all 0.3s ease',
                    }}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    <Avatar sx={{ width: 30, height: 30, bgcolor: 'primary.dark' }}>
                      {user?.name ? user.name.charAt(0).toUpperCase() : <AccountCircleIcon />}
                    </Avatar>
                    {user?.name || 'Account'}
                  </Button>
                  
                  {loginMenuOpen && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        mt: 1,
                        width: 200,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        boxShadow: 3,
                        zIndex: 1000,
                        overflow: 'hidden',
                      }}
                    >
                      <List>
                        <ListItem button onClick={handleDashboard}>
                          <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button onClick={handleAssessment}>
                          <ListItemText primary="Assessment" />
                        </ListItem>
                        <ListItem button onClick={handleLogout}>
                          <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
                        </ListItem>
                      </List>
                    </Box>
                  )}
                </Box>
              ) : (
                <Box sx={{ position: 'relative' }}>
                  <Button 
                    onClick={() => setLoginMenuOpen(!loginMenuOpen)}
                    sx={{
                      borderRadius: '50px',
                      background: theme.palette.primary.main,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2,
                      py: 1,
                      '&:hover': {
                        background: theme.palette.primary.dark,
                      },
                      transition: 'all 0.3s ease',
                    }}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    <AccountCircleIcon fontSize="small" />
                    Account
                  </Button>
                  
                  {loginMenuOpen && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        mt: 1,
                        width: 200,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        boxShadow: 3,
                        zIndex: 1000,
                        overflow: 'hidden',
                      }}
                    >
                      <List>
                        <ListItem button onClick={handleLogin}>
                          <ListItemText primary="Login" />
                        </ListItem>
                        <ListItem button onClick={handleRegister}>
                          <ListItemText primary="Register" />
                        </ListItem>
                      </List>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Fade>
  );
};

export default Navbar; 