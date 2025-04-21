import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Divider,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { 
  AccessTime as TimeIcon,
  ArrowForward as ArrowForwardIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Flag as FlagIcon,
  School as SchoolIcon,
  Star as StarIcon,
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon,
  MenuBook as MenuBookIcon,
  Psychology as AIIcon,
  DonutLarge as DonutLargeIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';

// Sample data
const courses = [
  {
    id: 1,
    title: 'HTML5 & CSS3 Essentials',
    description: 'Master the fundamentals of modern web development',
    image: 'https://via.placeholder.com/300x160?text=HTML5+CSS3',
    progress: 78,
    completed: false,
    duration: '2h left',
    nextLesson: 'Responsive Layout Techniques'
  },
  {
    id: 2,
    title: 'JavaScript Fundamentals',
    description: 'Learn core JavaScript concepts and syntax',
    image: 'https://via.placeholder.com/300x160?text=JavaScript',
    progress: 32,
    completed: false,
    duration: '4h left',
    nextLesson: 'Working with Arrays and Objects'
  },
  {
    id: 3,
    title: 'React Development',
    description: 'Build dynamic user interfaces with React',
    image: 'https://via.placeholder.com/300x160?text=React',
    progress: 5,
    completed: false,
    duration: '8h left',
    nextLesson: 'Creating Your First Component'
  }
];

const upcomingTasks = [
  { 
    id: 1, 
    title: 'CSS Grid Assignment', 
    course: 'HTML5 & CSS3 Essentials', 
    dueDate: 'Today', 
    priority: 'High' 
  },
  { 
    id: 2, 
    title: 'JavaScript Quiz', 
    course: 'JavaScript Fundamentals', 
    dueDate: 'Tomorrow', 
    priority: 'Medium' 
  },
  { 
    id: 3, 
    title: 'React Project Setup', 
    course: 'React Development', 
    dueDate: '3 days', 
    priority: 'Low' 
  }
];

const skillData = [
  { name: 'HTML', value: 85 },
  { name: 'CSS', value: 78 },
  { name: 'JavaScript', value: 62 },
  { name: 'React', value: 45 },
  { name: 'Node.js', value: 30 }
];

const weeklyActivityData = [
  { day: 'Mon', hours: 1.5 },
  { day: 'Tue', hours: 2.0 },
  { day: 'Wed', hours: 0.5 },
  { day: 'Thu', hours: 1.8 },
  { day: 'Fri', hours: 1.0 },
  { day: 'Sat', hours: 3.2 },
  { day: 'Sun', hours: 1.0 }
];

const timeAvailabilityPie = [
  { name: 'Used', value: 10.5 },
  { name: 'Available', value: 14.5 }
];

const COLORS = ['#3f51b5', '#f5f5f5'];

const todaySchedule = [
  { time: '09:00 - 10:30', activity: 'CSS Grid Assignment', course: 'HTML5 & CSS3 Essentials' },
  { time: '13:00 - 14:00', activity: 'JavaScript Arrays', course: 'JavaScript Fundamentals' },
  { time: '19:30 - 21:00', activity: 'React Introduction', course: 'React Development' }
];

const NewDashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('overview');
  
  const totalCompletedTasks = 24;
  const totalTasks = 42;
  const completionRate = Math.round((totalCompletedTasks / totalTasks) * 100);
  
  const totalStudyHours = weeklyActivityData.reduce((acc, curr) => acc + curr.hours, 0);
  
  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 4 }}>
          Dashboard
        </Typography>
        
        {/* Overview Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Course Progress
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h4" fontWeight={700}>
                    {Math.round((courses.reduce((acc, course) => acc + course.progress, 0) / (courses.length * 100)) * 100)}%
                  </Typography>
                  <DonutLargeIcon color="primary" sx={{ fontSize: 36 }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Overall completion rate
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Tasks Completed
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h4" fontWeight={700}>
                    {totalCompletedTasks}/{totalTasks}
                  </Typography>
                  <CheckCircleIcon color="success" sx={{ fontSize: 36 }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {completionRate}% completion rate
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Weekly Study Hours
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h4" fontWeight={700}>
                    {totalStudyHours}h
                  </Typography>
                  <TimeIcon color="primary" sx={{ fontSize: 36 }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {totalStudyHours > 10 ? 'On track' : 'Below target'} (goal: 10h)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Next Assessment
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h4" fontWeight={700}>
                    3
                  </Typography>
                  <AssignmentIcon color="warning" sx={{ fontSize: 36 }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  days until JavaScript Fundamentals quiz
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Main Dashboard Content */}
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} lg={8}>
            {/* Active Courses */}
            <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  Active Courses
                </Typography>
                <Button 
                  variant="text" 
                  endIcon={<ArrowForwardIcon />} 
                  onClick={() => navigate('/courses/my-courses')}
                >
                  View All
                </Button>
              </Box>
              
              <Grid container spacing={3}>
                {courses.map((course) => (
                  <Grid item xs={12} sm={6} key={course.id}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        borderRadius: 2,
                        boxShadow: 'none',
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'all 0.3s',
                        '&:hover': { transform: 'translateY(-5px)', boxShadow: 3 }
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={course.image}
                        alt={course.title}
                      />
                      <CardContent sx={{ pb: 1 }}>
                        <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 600 }}>
                          {course.title}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Progress: {course.progress}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {course.duration}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ position: 'relative', height: 8, bgcolor: 'rgba(0, 0, 0, 0.1)', borderRadius: 4, mb: 2 }}>
                          <Box 
                            sx={{ 
                              position: 'absolute', 
                              top: 0, 
                              left: 0, 
                              height: '100%', 
                              borderRadius: 4,
                              width: `${course.progress}%`,
                              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`
                            }} 
                          />
                        </Box>
                        
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Next up:
                          </Typography>
                          <Typography variant="body2" fontWeight={500}>
                            {course.nextLesson}
                          </Typography>
                        </Box>
                      </CardContent>
                      <CardActions sx={{ px: 2, pb: 2 }}>
                        <Button 
                          variant="contained" 
                          size="small" 
                          fullWidth
                          onClick={() => navigate(`/courses/${course.id}`)}
                        >
                          Continue Learning
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
            
            {/* Weekly Activity */}
            <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Weekly Activity
              </Typography>
              
              <Box sx={{ height: 300, mt: 3 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyActivityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hours" name="Study Hours" fill={theme.palette.primary.main} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
            
            {/* Upcoming Tasks */}
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  Upcoming Tasks
                </Typography>
                <Button 
                  variant="text" 
                  endIcon={<ArrowForwardIcon />} 
                  onClick={() => navigate('/tasks')}
                >
                  View All
                </Button>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Task</TableCell>
                      <TableCell>Course</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {upcomingTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {task.title}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {task.course}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={task.dueDate} 
                            size="small" 
                            color={
                              task.dueDate === 'Today' ? 'error' : 
                              task.dueDate === 'Tomorrow' ? 'warning' : 
                              'default'
                            }
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={task.priority} 
                            size="small" 
                            color={
                              task.priority === 'High' ? 'error' : 
                              task.priority === 'Medium' ? 'warning' : 
                              'success'
                            }
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Button size="small" variant="outlined">
                            Start
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          
          {/* Right Column */}
          <Grid item xs={12} lg={4}>
            {/* Today's Schedule */}
            <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  Today's Schedule
                </Typography>
                <CalendarIcon color="primary" />
              </Box>
              
              {todaySchedule.map((item, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    p: 2, 
                    borderRadius: 2, 
                    bgcolor: 'rgba(0, 0, 0, 0.02)',
                    border: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Box sx={{ 
                      minWidth: 4, 
                      bgcolor: theme.palette.primary.main, 
                      borderRadius: 4,
                      mr: 2
                    }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {item.time}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {item.activity}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        {item.course}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
              
              <Button
                variant="outlined"
                fullWidth
                startIcon={<CalendarIcon />}
                onClick={() => navigate('/schedule')}
                sx={{ mt: 2 }}
              >
                View Full Schedule
              </Button>
            </Paper>
            
            {/* AI Learning Suggestions */}
            <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <AIIcon sx={{ color: theme.palette.primary.main, mr: 1.5 }} />
                <Typography variant="h6" fontWeight={600}>
                  AI Learning Recommendations
                </Typography>
              </Box>
              
              <List>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <StarIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Continue CSS Grid Assignment" 
                    secondary="You're making good progress, just 2 exercises left" 
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <StarIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Review JavaScript Arrays" 
                    secondary="Recommended before taking the upcoming quiz" 
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <StarIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Update Your Learning Schedule" 
                    secondary="You have 4.5 hours of free time this week" 
                  />
                </ListItem>
              </List>
              
              <Button
                variant="contained"
                fullWidth
                startIcon={<AIIcon />}
                onClick={() => navigate('/ai-planner')}
                sx={{ mt: 2 }}
              >
                Open AI Planner
              </Button>
            </Paper>
            
            {/* Skill Progress */}
            <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Skill Progress
              </Typography>
              
              {skillData.map((skill) => (
                <Box key={skill.name} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {skill.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {skill.value}%
                    </Typography>
                  </Box>
                  <Box sx={{ position: 'relative', height: 8, bgcolor: 'rgba(0, 0, 0, 0.05)', borderRadius: 4 }}>
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        height: '100%', 
                        borderRadius: 4,
                        width: `${skill.value}%`,
                        bgcolor: skill.value > 70 ? 'success.main' : skill.value > 40 ? 'primary.main' : 'warning.main'
                      }} 
                    />
                  </Box>
                </Box>
              ))}
              
              <Button
                variant="text"
                color="primary"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/analytics/skill-map')}
                sx={{ mt: 2 }}
              >
                View Detailed Skill Map
              </Button>
            </Paper>
            
            {/* Time Availability */}
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Weekly Time Availability
              </Typography>
              
              <Box sx={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={timeAvailabilityPie}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {timeAvailabilityPie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ position: 'absolute', textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight={700}>
                    {Math.round((timeAvailabilityPie[1].value / (timeAvailabilityPie[0].value + timeAvailabilityPie[1].value)) * 100)}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Available
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight={600}>
                    {timeAvailabilityPie[0].value}h
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Used
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight={600}>
                    {timeAvailabilityPie[1].value}h
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Available
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight={600}>
                    {timeAvailabilityPie[0].value + timeAvailabilityPie[1].value}h
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total
                  </Typography>
                </Box>
              </Box>
              
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/ai-planner')}
                sx={{ mt: 3 }}
              >
                Optimize My Schedule
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default NewDashboard; 