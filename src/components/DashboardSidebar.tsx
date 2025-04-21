import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Avatar, 
  Typography, 
  IconButton,
  Collapse,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  BarChart as AnalyticsIcon,
  CalendarToday as CalendarIcon,
  AssignmentOutlined as CoursesIcon,
  School as CertificationsIcon,
  Settings as SettingsIcon,
  AccountCircle as ProfileIcon,
  ExpandLess,
  ExpandMore,
  Psychology as AIIcon,
  QuestionAnswer as SupportIcon,
  Notifications as NotificationsIcon,
  ArrowLeft as ArrowLeftIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/Logo.png';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const DashboardSidebar: React.FC<SidebarProps> = ({ open, onToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [analyzeOpen, setAnalyzeOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);

  const handleAnalyzeToggle = () => {
    setAnalyzeOpen(!analyzeOpen);
  };

  const handleCoursesToggle = () => {
    setCoursesOpen(!coursesOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const sidebarWidth = 280;

  const mainMenuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/dashboard',
      active: isActive('/dashboard')
    },
    { 
      text: 'Analytics', 
      icon: <AnalyticsIcon />, 
      submenu: true,
      open: analyzeOpen,
      handleToggle: handleAnalyzeToggle,
      active: location.pathname.includes('/analytics')
    },
    { 
      text: 'Schedule', 
      icon: <CalendarIcon />, 
      path: '/schedule',
      active: isActive('/schedule')
    },
    { 
      text: 'Courses', 
      icon: <CoursesIcon />, 
      submenu: true,
      open: coursesOpen,
      handleToggle: handleCoursesToggle,
      active: location.pathname.includes('/courses')
    },
    { 
      text: 'AI Learning Planner', 
      icon: <AIIcon />, 
      path: '/ai-planner',
      active: isActive('/ai-planner')
    },
    { 
      text: 'Certifications', 
      icon: <CertificationsIcon />, 
      path: '/certifications',
      active: isActive('/certifications')
    }
  ];

  const analyticsSubmenu = [
    { text: 'Learning Progress', path: '/analytics/progress', active: isActive('/analytics/progress') },
    { text: 'Performance', path: '/analytics/performance', active: isActive('/analytics/performance') },
    { text: 'Activity Log', path: '/analytics/activity', active: isActive('/analytics/activity') },
    { text: 'Skill Map', path: '/analytics/skill-map', active: isActive('/analytics/skill-map') }
  ];

  const coursesSubmenu = [
    { text: 'My Courses', path: '/courses/my-courses', active: isActive('/courses/my-courses') },
    { text: 'Course Catalog', path: '/courses/catalog', active: isActive('/courses/catalog') },
    { text: 'Saved Courses', path: '/courses/saved', active: isActive('/courses/saved') },
    { text: 'Completed Courses', path: '/courses/completed', active: isActive('/courses/completed') }
  ];

  const bottomMenuItems = [
    { text: 'Profile', icon: <ProfileIcon />, path: '/profile', active: isActive('/profile') },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings', active: isActive('/settings') },
    { text: 'Support', icon: <SupportIcon />, path: '/support', active: isActive('/support') }
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src={Logo}
            alt="SERA Logo"
            sx={{
              height: '28px',
              width: 'auto',
              mr: 1
            }}
          />
          {open && <Typography variant="h6" sx={{ fontWeight: 700 }}>SERA</Typography>}
        </Box>
        <IconButton onClick={onToggle} sx={{ color: 'white' }}>
          {isMobile ? <ArrowLeftIcon /> : (open ? <ArrowLeftIcon /> : <MenuIcon />)}
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {open && (
        <Box sx={{ px: 2, mb: 3, display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src={user?.photoURL || undefined} 
            alt={user?.name || 'User'} 
            sx={{ width: 48, height: 48, mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {user?.name || 'User'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </Box>
      )}

      <List component="nav" sx={{ flexGrow: 1, px: 1 }}>
        {mainMenuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem
              button
              onClick={item.submenu ? item.handleToggle : () => navigate(item.path || '#')}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                bgcolor: item.active ? 'rgba(63, 81, 181, 0.08)' : 'transparent',
                color: item.active ? 'primary.main' : 'text.primary',
                '&:hover': {
                  bgcolor: item.active ? 'rgba(63, 81, 181, 0.15)' : 'rgba(255, 255, 255, 0.05)'
                }
              }}
            >
              <ListItemIcon sx={{ color: item.active ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              {open && (
                <>
                  <ListItemText primary={item.text} />
                  {item.submenu && (item.open ? <ExpandLess /> : <ExpandMore />)}
                </>
              )}
            </ListItem>
            
            {item.submenu && open && (
              <Collapse in={item.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.text === 'Analytics' && analyticsSubmenu.map((subItem) => (
                    <ListItem
                      key={subItem.text}
                      button
                      onClick={() => navigate(subItem.path)}
                      sx={{
                        pl: 5,
                        borderRadius: 2,
                        mb: 0.5,
                        bgcolor: subItem.active ? 'rgba(63, 81, 181, 0.08)' : 'transparent',
                        color: subItem.active ? 'primary.main' : 'text.primary',
                        '&:hover': {
                          bgcolor: subItem.active ? 'rgba(63, 81, 181, 0.15)' : 'rgba(255, 255, 255, 0.05)'
                        }
                      }}
                    >
                      <ListItemText primary={subItem.text} />
                    </ListItem>
                  ))}
                  
                  {item.text === 'Courses' && coursesSubmenu.map((subItem) => (
                    <ListItem
                      key={subItem.text}
                      button
                      onClick={() => navigate(subItem.path)}
                      sx={{
                        pl: 5,
                        borderRadius: 2,
                        mb: 0.5,
                        bgcolor: subItem.active ? 'rgba(63, 81, 181, 0.08)' : 'transparent',
                        color: subItem.active ? 'primary.main' : 'text.primary',
                        '&:hover': {
                          bgcolor: subItem.active ? 'rgba(63, 81, 181, 0.15)' : 'rgba(255, 255, 255, 0.05)'
                        }
                      }}
                    >
                      <ListItemText primary={subItem.text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <List sx={{ px: 1 }}>
        {bottomMenuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              bgcolor: item.active ? 'rgba(63, 81, 181, 0.08)' : 'transparent',
              color: item.active ? 'primary.main' : 'text.primary',
              '&:hover': {
                bgcolor: item.active ? 'rgba(63, 81, 181, 0.15)' : 'rgba(255, 255, 255, 0.05)'
              }
            }}
          >
            <ListItemIcon sx={{ color: item.active ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            {open && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box component="nav">
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: sidebarWidth,
              boxSizing: 'border-box',
              bgcolor: 'background.paper'
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? sidebarWidth : 72,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: open ? sidebarWidth : 72,
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              boxSizing: 'border-box',
              bgcolor: 'background.paper'
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

export default DashboardSidebar; 