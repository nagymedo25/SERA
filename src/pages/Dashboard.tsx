import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Divider,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TimelineIcon from '@mui/icons-material/Timeline';
import MenuBookIcon from '@mui/icons-material/MenuBook';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

// Sample courses data
const courses = [
  {
    id: 1,
    title: 'HTML5 Fundamentals',
    description: 'Learn the essential elements of HTML5 and best practices for structuring web content.',
    duration: '2h 30m',
    level: 'Beginner',
    image: 'https://via.placeholder.com/300x160?text=HTML5+Fundamentals',
    progress: 100,
    completed: true
  },
  {
    id: 2,
    title: 'CSS3 Styling & Layouts',
    description: 'Master modern CSS techniques for responsive layouts and beautiful designs.',
    duration: '3h 45m',
    level: 'Beginner',
    image: 'https://via.placeholder.com/300x160?text=CSS3+Styling',
    progress: 75,
    completed: false
  },
  {
    id: 3,
    title: 'JavaScript Essentials',
    description: 'Build a solid foundation in JavaScript programming with practical examples.',
    duration: '4h 20m',
    level: 'Intermediate',
    image: 'https://via.placeholder.com/300x160?text=JavaScript+Essentials',
    progress: 30,
    completed: false
  },
  {
    id: 4,
    title: 'React Fundamentals',
    description: 'Learn to build dynamic UIs with React and understand core concepts like components and hooks.',
    duration: '5h 15m',
    level: 'Intermediate',
    image: 'https://via.placeholder.com/300x160?text=React+Fundamentals',
    progress: 0,
    completed: false
  },
  {
    id: 5,
    title: 'Responsive Web Design',
    description: 'Master techniques to create websites that work perfectly on any device size.',
    duration: '3h 10m',
    level: 'Beginner',
    image: 'https://via.placeholder.com/300x160?text=Responsive+Design',
    progress: 0,
    completed: false
  },
  {
    id: 6,
    title: 'Advanced React Patterns',
    description: 'Take your React skills to the next level with advanced patterns and optimization techniques.',
    duration: '6h 40m',
    level: 'Advanced',
    image: 'https://via.placeholder.com/300x160?text=Advanced+React',
    progress: 0,
    completed: false
  }
];

// Sample weekly schedule
const weeklySchedule = [
  { day: 'Monday', duration: '1.5h', topics: ['HTML Basics', 'Document Structure'] },
  { day: 'Tuesday', duration: '0h', topics: ['Rest Day'] },
  { day: 'Wednesday', duration: '2h', topics: ['CSS Layouts', 'Flexbox'] },
  { day: 'Thursday', duration: '1h', topics: ['CSS Grid', 'Responsive Design'] },
  { day: 'Friday', duration: '1.5h', topics: ['JavaScript Fundamentals'] },
  { day: 'Saturday', duration: '3h', topics: ['JavaScript Functions', 'DOM Manipulation'] },
  { day: 'Sunday', duration: '0h', topics: ['Rest Day'] }
];

const Dashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Calculate overall progress
  const overallProgress = courses.reduce((acc, course) => acc + course.progress, 0) / courses.length;
  const completedCourses = courses.filter(course => course.completed).length;

  const calculateTotalHours = () => {
    return weeklySchedule.reduce((total, day) => {
      const hours = parseFloat(day.duration.replace('h', ''));
      return total + hours;
    }, 0);
  };

  return (
    <Layout>
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, rgba(30,30,30,1) 0%, rgba(20,20,30,1) 100%)',
          minHeight: '100vh'
        }}
      >
        <Container maxWidth="xl">
          {/* Welcome Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Welcome back, {user?.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track your progress, continue learning, and discover new courses to enhance your front-end skills.
            </Typography>
          </Box>

          {/* Dashboard Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="dashboard tabs"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab icon={<MenuBookIcon />} iconPosition="start" label="Courses" />
              <Tab icon={<TimelineIcon />} iconPosition="start" label="Progress" />
              <Tab icon={<DateRangeIcon />} iconPosition="start" label="Schedule" />
            </Tabs>
          </Box>

          {/* Courses Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              {courses.map((course) => (
                <Grid item key={course.id} xs={12} sm={6} md={4}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      backgroundColor: 'background.paper',
                      borderRadius: 2,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={course.image}
                      alt={course.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Chip 
                          label={course.level} 
                          size="small" 
                          color={
                            course.level === 'Beginner' 
                              ? 'success' 
                              : course.level === 'Intermediate' 
                                ? 'primary' 
                                : 'error'
                          }
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <QueryBuilderIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {course.duration}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {course.description}
                      </Typography>
                      <Box sx={{ mt: 2, mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">
                            {course.progress}% Complete
                          </Typography>
                          {course.completed && (
                            <CheckCircleIcon color="success" fontSize="small" />
                          )}
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={course.progress} 
                          sx={{ 
                            mt: 1, 
                            height: 6, 
                            borderRadius: 3,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                          }} 
                        />
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        size="small" 
                        startIcon={<PlayCircleOutlineIcon />}
                        fullWidth
                      >
                        {course.progress > 0 ? 'Continue' : 'Start'} Course
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Progress Tab */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={4}>
              {/* Overall Progress */}
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    height: '100%',
                    backgroundColor: 'background.paper'
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Overall Learning Progress
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4, mb: 3 }}>
                    <Box
                      sx={{
                        position: 'relative',
                        display: 'inline-flex',
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        value={100}
                        size={180}
                        thickness={4}
                        sx={{ color: 'rgba(255, 255, 255, 0.1)' }}
                      />
                      <CircularProgress
                        variant="determinate"
                        value={overallProgress}
                        size={180}
                        thickness={4}
                        sx={{
                          color: 'primary.main',
                          position: 'absolute',
                          left: 0,
                        }}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column'
                        }}
                      >
                        <Typography
                          variant="h3"
                          component="div"
                          sx={{ fontWeight: 700 }}
                        >
                          {Math.round(overallProgress)}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Front-End Path
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {completedCourses} of {courses.length} courses completed
                    </Typography>
                    {user?.assessmentScore && (
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Latest Assessment Score
                        </Typography>
                        <Chip 
                          label={`${user.assessmentScore}%`} 
                          color={user.assessmentScore >= 70 ? 'success' : 'warning'} 
                          size="medium"
                        />
                      </Box>
                    )}
                  </Box>
                </Paper>
              </Grid>
              
              {/* Recommendations */}
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    height: '100%',
                    backgroundColor: 'background.paper'
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    AI Learning Recommendations
                  </Typography>
                  
                  <List sx={{ mt: 2 }}>
                    <ListItem sx={{ pb: 2 }}>
                      <ListItemIcon>
                        <StarIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Complete 'CSS3 Styling & Layouts'" 
                        secondary="You're 75% through this course. This will improve your styling skills."
                      />
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon>
                        <StarIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Move to JavaScript Essentials" 
                        secondary="You should continue with JS to build interactive websites."
                      />
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon>
                        <StarIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Retake Assessment" 
                        secondary="After completing these courses, try the assessment again for certification."
                      />
                    </ListItem>
                  </List>
                  
                  <Box sx={{ mt: 3 }}>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      startIcon={<AssignmentIcon />}
                      onClick={() => navigate('/assessment')}
                      fullWidth
                    >
                      Take Assessment
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Schedule Tab */}
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Paper
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: 'background.paper'
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                    Weekly Learning Schedule
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {weeklySchedule.map((day) => (
                      <Paper 
                        key={day.day} 
                        elevation={0}
                        sx={{ 
                          p: 2, 
                          borderRadius: 2, 
                          backgroundColor: day.duration === '0h' 
                            ? 'rgba(255, 255, 255, 0.03)' 
                            : 'rgba(63, 81, 181, 0.05)',
                          border: '1px solid',
                          borderColor: day.duration === '0h' 
                            ? 'rgba(255, 255, 255, 0.05)' 
                            : 'rgba(63, 81, 181, 0.15)'
                        }}
                      >
                        <Grid container alignItems="center">
                          <Grid item xs={3} sm={2}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {day.day}
                            </Typography>
                          </Grid>
                          <Grid item xs={3} sm={2}>
                            <Chip 
                              label={day.duration} 
                              size="small" 
                              color={day.duration === '0h' ? 'default' : 'primary'}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={6} sm={8}>
                            <Typography variant="body2" color="text.secondary">
                              {day.topics.join(', ')}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    height: '100%',
                    backgroundColor: 'background.paper'
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Study Statistics
                  </Typography>
                  
                  <List>
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon>
                        <QueryBuilderIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`${calculateTotalHours()} hours per week`} 
                        secondary="Total study time"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon>
                        <DateRangeIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`${weeklySchedule.filter(day => day.duration !== '0h').length} days per week`} 
                        secondary="Study frequency"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon>
                        <TimelineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Est. 4 weeks remaining" 
                        secondary="To complete current pathway"
                      />
                    </ListItem>
                  </List>
                  
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 2 }}
                    fullWidth
                  >
                    Adjust Schedule
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
        </Container>
      </Box>
    </Layout>
  );
};

// Add missing LinearProgress component import
const LinearProgress = ({ variant, value, sx }: { variant: "determinate"; value: number; sx?: any }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: sx?.height || '4px',
        borderRadius: sx?.borderRadius || '0',
        backgroundColor: sx?.backgroundColor || 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        ...sx
      }}
    >
      <Box
        sx={{
          width: `${value}%`,
          height: '100%',
          backgroundColor: 'primary.main',
          transition: 'width 0.3s ease'
        }}
      />
    </Box>
  );
};

export default Dashboard; 