import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  Button,
  Tooltip
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link as RouterLink } from 'react-router-dom';

interface FooterLink {
  name: string;
  href: string;
}

interface FooterCategory {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerCategories: FooterCategory[] = [
    {
      title: "Platform",
      links: [
        { name: "Learning Paths", href: "#learning-paths" },
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "/pricing" },
        { name: "FAQ", href: "#faq" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Help Center", href: "/help" },
        { name: "Community", href: "/community" },
        { name: "API", href: "/api" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "GDPR", href: "/gdpr" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, name: "Facebook", href: "https://facebook.com" },
    { icon: <TwitterIcon />, name: "Twitter", href: "https://twitter.com" },
    { icon: <LinkedInIcon />, name: "LinkedIn", href: "https://linkedin.com" },
    { icon: <InstagramIcon />, name: "Instagram", href: "https://instagram.com" },
    { icon: <GitHubIcon />, name: "GitHub", href: "https://github.com" }
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        background: 'linear-gradient(180deg, rgba(15,15,20,1) 0%, rgba(20,20,30,1) 100%)',
        pt: 8,
        pb: 4,
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      {/* Back to top button */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 2
        }}
      >
        <Tooltip title="Back to top" arrow placement="left">
          <IconButton
            onClick={scrollToTop}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: '50%',
              width: 48,
              height: 48,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                transform: 'translateY(-5px)',
                transition: 'all 0.3s ease'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <KeyboardArrowUpIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          left: '5%',
          width: '30%',
          height: '30%',
          background: 'radial-gradient(circle, rgba(63,81,181,0.03) 0%, rgba(63,81,181,0) 70%)',
          filter: 'blur(100px)',
          borderRadius: '50%',
          zIndex: 0
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '25%',
          height: '25%',
          background: 'radial-gradient(circle, rgba(233,30,99,0.03) 0%, rgba(233,30,99,0) 70%)',
          filter: 'blur(100px)',
          borderRadius: '50%',
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Logo and brief description */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'center' : 'flex-start',
            justifyContent: 'space-between',
            mb: 6
          }}
        >
          <Box sx={{ mb: isMobile ? 4 : 0, textAlign: isMobile ? 'center' : 'left' }}>
            <Typography
              variant="h3"
              component="div"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2rem', md: '2.5rem' },
                mb: 2,
                background: 'linear-gradient(135deg, #3f51b5 0%, #f50057 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              SERA
            </Typography>
            
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 400,
                fontSize: '0.95rem',
                lineHeight: 1.6
              }}
            >
              Empowering the next generation of developers with cutting-edge education
              and resources for a successful career in technology.
            </Typography>
          </Box>

          {/* Newsletter signup */}
          <Box
            component="form"
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: 380,
              width: '100%'
            }}
          >
            <Typography variant="subtitle1" fontWeight="medium" mb={1.5}>
              Stay updated with our newsletter
            </Typography>
            
            <Box sx={{ display: 'flex' }}>
              <Box
                component="input"
                placeholder="Your email address"
                sx={{
                  p: 1.5,
                  borderRadius: '4px 0 0 4px',
                  bgcolor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRight: 'none',
                  color: 'text.primary',
                  width: '100%',
                  outline: 'none',
                  '&:focus': {
                    borderColor: theme.palette.primary.main,
                  }
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: '0 4px 4px 0',
                  textTransform: 'none',
                  fontWeight: 'bold'
                }}
              >
                Subscribe
              </Button>
            </Box>
            
            <Typography variant="caption" color="text.secondary" mt={1}>
              By subscribing, you agree to our Privacy Policy.
            </Typography>
          </Box>
        </Box>

        {/* Footer links */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {footerCategories.map((category) => (
            <Grid key={category.title} item xs={6} sm={3}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
              >
                {category.title}
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {category.links.map((link) => (
                  <Box
                    component="li"
                    key={link.name}
                    sx={{ mb: 1.5 }}
                  >
                    <Link
                      href={link.href}
                      underline="none"
                      color="text.secondary"
                      sx={{
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        '&:hover': {
                          color: theme.palette.primary.main,
                          transform: 'translateX(5px)'
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
        
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 4 }} />
        
        {/* Bottom footer area */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'center'
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ mb: isMobile ? 2 : 0 }}>
            © {currentYear} SERA Learning Platform. All rights reserved.
          </Typography>
          
          <Box
            sx={{
              display: 'flex',
              gap: 1
            }}
          >
            {socialLinks.map((link) => (
              <Tooltip key={link.name} title={link.name} arrow>
                <IconButton
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  {link.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 