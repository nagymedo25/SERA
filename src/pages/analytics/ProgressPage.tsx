import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  useTheme,
  Tabs,
  Tab,
  Divider,
  Chip,
  Button,
  LinearProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import {
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const ProgressPage: React.FC = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('month');
  const [tabValue, setTabValue] = useState(0);

  // Sample data for progress charts
  const courseProgressData = [
    { name: 'HTML & CSS', completed: 100, total: 100 },
    { name: 'JavaScript', completed: 78, total: 100 },
    { name: 'React', completed: 45, total: 100 },
    { name: 'Node.js', completed: 23, total: 100 },
    { name: 'TypeScript', completed: 10, total: 100 }
  ];

  const skillRadarData = [
    { subject: 'HTML', A: 82 },
    { subject: 'CSS', A: 75 },
    { subject: 'JavaScript', A: 68 },
    { subject: 'React', A: 60 },
    { subject: 'Node.js', A: 45 },
    { subject: 'UI/UX', A: 55 },
    { subject: 'Responsiveness', A: 78 }
  ];

  const weeklyActivityData = [
    { name: 'Mon', hours: 1.5 },
    { name: 'Tue', hours: 2 },
    { name: 'Wed', hours: 0.5 },
    { name: 'Thu', hours: 1 },
    { name: 'Fri', hours: 2.5 },
    { name: 'Sat', hours: 3 },
    { name: 'Sun', hours: 0 }
  ];

  const monthlyProgressData = [
    { name: 'Week 1', progress: 10 },
    { name: 'Week 2', progress: 25 },
    { name: 'Week 3', progress: 38 },
    { name: 'Week 4', progress: 52 }
  ];

  const completionPieData = [
    { name: 'Completed', value: 24 },
    { name: 'In Progress', value: 3 },
    { name: 'Not Started', value: 15 }
  ];

  const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

  const completedCourses = [
    { id: 1, name: 'HTML Fundamentals', completedDate: '2023-09-15', score: 92 },
    { id: 2, name: 'CSS Layouts & Styling', completedDate: '2023-10-02', score: 88 },
    { id: 3, name: 'JavaScript Basics', completedDate: '2023-10-28', score: 78 },
    { id: 4, name: 'Responsive Web Design', completedDate: '2023-11-10', score: 95 }
  ];

  const inProgressCourses = [
    { id: 5, name: 'JavaScript Advanced', progress: 78 },
    { id: 6, name: 'React Fundamentals', progress: 45 },
    { id: 7, name: 'Node.js Basics', progress: 23 }
  ];

  const handleTimeRangeChange = (event: any) => {
    setTimeRange(event.target.value);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const calculateTotalProgress = () => {
    const totalCompleted = courseProgressData.reduce((acc, course) => acc + course.completed, 0);
    const totalPossible = courseProgressData.reduce((acc, course) => acc + course.total, 0);
    return Math.round((totalCompleted / totalPossible) * 100);
  };

  const totalProgress = calculateTotalProgress();
  const totalHours = weeklyActivityData.reduce((acc, day) => acc + day.hours, 0);

  return (
    <DashboardLayout>
      <Box>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <TimelineIcon sx={{ fontSize: 38, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" fontWeight={700}>
            Learning Progress
          </Typography>
        </Box>

        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="time-range-label">Time Range</InputLabel>
            <Select
              labelId="time-range-label"
              value={timeRange}
              onChange={handleTimeRangeChange}
              label="Time Range"
            >
              <MenuItem value="week">Last Week</MenuItem>
              <MenuItem value="month">Last Month</MenuItem>
              <MenuItem value="quarter">Last Quarter</MenuItem>
              <MenuItem value="year">Last Year</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Overview Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Overall Progress
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h4" fontWeight={700} sx={{ mr: 1 }}>
                    {totalProgress}%
                  </Typography>
                  <TrendingUpIcon sx={{ color: 'success.main' }} />
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={totalProgress} 
                  sx={{ height: 8, borderRadius: 4 }} 
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Completed Courses
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h4" fontWeight={700} sx={{ mr: 1 }}>
                    {completedCourses.length}
                  </Typography>
                  <CheckCircleIcon sx={{ color: 'success.main' }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Out of {completedCourses.length + inProgressCourses.length + 15} courses
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Study Hours This Week
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h4" fontWeight={700} sx={{ mr: 1 }}>
                    {totalHours}
                  </Typography>
                  <ScheduleIcon sx={{ color: 'info.main' }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {totalHours > 8 ? 'Excellent progress!' : 'Goal: 10 hours'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Assessment Score
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h4" fontWeight={700} sx={{ mr: 1 }}>
                    78%
                  </Typography>
                  <AssessmentIcon sx={{ color: 'warning.main' }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Last assessment: 2 weeks ago
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="progress tabs">
            <Tab label="Course Progress" />
            <Tab label="Skill Development" />
            <Tab label="Activity" />
          </Tabs>
        </Box>

        {/* Tab 1: Course Progress */}
        {tabValue === 0 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Course Completion Status
                </Typography>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={courseProgressData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" name="Completion %" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>

              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Weekly Progress
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={monthlyProgressData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="progress" name="Progress %" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Course Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={completionPieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {completionPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>

              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  In Progress Courses
                </Typography>
                
                {inProgressCourses.map((course) => (
                  <Box key={course.id} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" fontWeight={500}>
                        {course.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={course.progress} 
                      sx={{ height: 8, borderRadius: 4 }} 
                    />
                  </Box>
                ))}
                
                <Button 
                  variant="outlined" 
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  View All Courses
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Completed Courses
                </Typography>
                
                <TableContainer>
                  <Table aria-label="completed courses table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Course Name</TableCell>
                        <TableCell align="right">Completion Date</TableCell>
                        <TableCell align="right">Score</TableCell>
                        <TableCell align="right">Certificate</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {completedCourses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell component="th" scope="row">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CheckCircleIcon sx={{ color: 'success.main', mr: 1, fontSize: 18 }} />
                              {course.name}
                            </Box>
                          </TableCell>
                          <TableCell align="right">{course.completedDate}</TableCell>
                          <TableCell align="right">
                            <Chip 
                              label={`${course.score}%`} 
                              color={
                                course.score >= 90 ? 'success' : 
                                course.score >= 70 ? 'primary' : 
                                'warning'
                              }
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Button size="small" variant="outlined">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Tab 2: Skill Development */}
        {tabValue === 1 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Skill Radar
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Skills" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Skill Breakdown
                </Typography>
                
                {skillRadarData.map((skill) => (
                  <Box key={skill.subject} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" fontWeight={500}>
                        {skill.subject}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {skill.A}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={skill.A} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: skill.A > 70 ? 'success.main' : skill.A > 50 ? 'primary.main' : 'warning.main'
                        }
                      }} 
                    />
                  </Box>
                ))}
                
                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Recommended Focus Areas
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Based on your skill assessment, focus on improving these areas:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skillRadarData
                      .filter(skill => skill.A < 65)
                      .map(skill => (
                        <Chip 
                          key={skill.subject} 
                          label={skill.subject} 
                          color="primary" 
                          variant="outlined" 
                          size="small"
                        />
                      ))
                    }
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Tab 3: Activity */}
        {tabValue === 2 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Weekly Study Hours
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={weeklyActivityData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hours" name="Study Hours" fill="#3f51b5" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
              
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Activity Log
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                  {[
                    { date: 'Today, 10:45 AM', activity: 'Completed "JavaScript Arrays and Objects" lesson', duration: '45 min' },
                    { date: 'Today, 9:30 AM', activity: 'Started "Advanced CSS Techniques" course', duration: '30 min' },
                    { date: 'Yesterday, 8:15 PM', activity: 'Completed practice exercise on React Components', duration: '1 hr 15 min' },
                    { date: 'Yesterday, 4:30 PM', activity: 'Watched "TypeScript Interfaces" video tutorial', duration: '25 min' },
                    { date: '2 days ago', activity: 'Completed quiz on JavaScript Functions', duration: '20 min' }
                  ].map((log, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" fontWeight={500} color="text.secondary">
                          {log.date}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {log.duration}
                        </Typography>
                      </Box>
                      <Typography variant="body1">
                        {log.activity}
                      </Typography>
                      {index < 4 && <Divider sx={{ mt: 2 }} />}
                    </Box>
                  ))}
                </Box>
                
                <Button 
                  variant="text" 
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  View Full Activity History
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Learning Streaks
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
                  <Box
                    sx={{
                      position: 'relative',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <CircularProgressWithLabel value={85} />
                  </Box>
                </Box>
                
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h5" fontWeight={700}>
                    17 Days
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Current learning streak
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2">Longest Streak</Typography>
                    <Typography variant="body2" fontWeight={600}>32 Days</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2">Total Study Days</Typography>
                    <Typography variant="body2" fontWeight={600}>85 Days</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Study Consistency</Typography>
                    <Typography variant="body2" fontWeight={600}>Very Good</Typography>
                  </Box>
                </Box>
              </Paper>
              
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Study Habits
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Peak Study Hours
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Chip label="7-9 PM" size="small" sx={{ bgcolor: 'rgba(63, 81, 181, 0.1)' }} />
                    <Typography variant="body2" color="text.secondary">
                      42% of your study time
                    </Typography>
                  </Box>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Most Productive Day
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Chip label="Saturday" size="small" sx={{ bgcolor: 'rgba(63, 81, 181, 0.1)' }} />
                    <Typography variant="body2" color="text.secondary">
                      3 hours average
                    </Typography>
                  </Box>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Average Session Length
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Chip label="45 minutes" size="small" sx={{ bgcolor: 'rgba(63, 81, 181, 0.1)' }} />
                    <Typography variant="body2" color="text.secondary">
                      2.5 sessions/day
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </DashboardLayout>
  );
};

// Helper component for circular progress with label
function CircularProgressWithLabel(props: { value: number }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <Box
        sx={{
          color: '#f5f5f5',
          width: 120,
          height: 120,
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}
      >
        <svg viewBox="0 0 120 120" width="120" height="120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="12"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#3f51b5"
            strokeWidth="12"
            strokeDasharray={2 * Math.PI * 54}
            strokeDashoffset={2 * Math.PI * 54 * (1 - props.value / 100)}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
        </svg>
      </Box>
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
        }}
      >
        <Typography variant="h4" component="div" fontWeight={700}>
          {props.value}%
        </Typography>
      </Box>
    </Box>
  );
}

export default ProgressPage; 