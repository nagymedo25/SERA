import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Chip,
  Slider,
  Alert,
  CircularProgress,
  Divider,
  useTheme
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  School as SchoolIcon,
  AccessTime as TimeIcon,
  Psychology as AIIcon,
  Check as CheckIcon,
  CalendarMonth as CalendarIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon
} from '@mui/icons-material';

interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
  duration: number;
}

interface ScheduleOption {
  name: string;
  description: string;
  timeSlots: TimeSlot[];
  totalHours: number;
  completion: string;
}

const AIPlanner: React.FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [intensity, setIntensity] = useState<number>(3); // 1-5 scale
  const [schedule, setSchedule] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [preferredTimes, setPreferredTimes] = useState<{mornings: boolean, afternoons: boolean, evenings: boolean}>({
    mornings: false,
    afternoons: false,
    evenings: false
  });
  const [loading, setLoading] = useState(false);
  const [scheduleOptions, setScheduleOptions] = useState<ScheduleOption[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const courses = [
    { id: 'html-css', name: 'HTML & CSS Fundamentals', duration: '24 hours' },
    { id: 'javascript', name: 'JavaScript Essentials', duration: '32 hours' },
    { id: 'react', name: 'React Development', duration: '40 hours' },
    { id: 'node', name: 'Node.js Backend', duration: '36 hours' },
    { id: 'fullstack', name: 'Full Stack Development', duration: '60 hours' },
    { id: 'ui-ux', name: 'UI/UX Design', duration: '28 hours' }
  ];

  const steps = [
    'Select Course',
    'Preferences',
    'Available Time',
    'AI Recommendations',
    'Finalize Schedule'
  ];

  const handleNext = () => {
    if (activeStep === 2) {
      generateAIRecommendations();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleDayToggle = (day: string) => {
    setAvailableDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleTimePreferenceChange = (time: 'mornings' | 'afternoons' | 'evenings') => {
    setPreferredTimes(prev => ({
      ...prev,
      [time]: !prev[time]
    }));
  };

  const generateAIRecommendations = () => {
    setLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      // This would be replaced with actual AI algorithm
      const scheduleOptions: ScheduleOption[] = [
        {
          name: 'Balanced Schedule',
          description: 'Evenly distributed study sessions with regular intervals to maximize retention',
          timeSlots: generateTimeSlots('balanced'),
          totalHours: calculateTotalHours('balanced'),
          completion: estimateCompletion('balanced')
        },
        {
          name: 'Intensive Schedule',
          description: 'Concentrated learning periods for faster completion, requires more dedication',
          timeSlots: generateTimeSlots('intensive'),
          totalHours: calculateTotalHours('intensive'),
          completion: estimateCompletion('intensive')
        },
        {
          name: 'Flexible Schedule',
          description: 'Adaptable timing with lighter sessions, ideal for busy professionals',
          timeSlots: generateTimeSlots('flexible'),
          totalHours: calculateTotalHours('flexible'),
          completion: estimateCompletion('flexible')
        }
      ];
      
      setScheduleOptions(scheduleOptions);
      setLoading(false);
      setActiveStep(3);
    }, 2000);
  };

  // Helper function to generate time slots based on user preferences
  const generateTimeSlots = (type: 'balanced' | 'intensive' | 'flexible'): TimeSlot[] => {
    const result: TimeSlot[] = [];
    const selectedDays = availableDays.length > 0 ? availableDays : days.slice(0, 3);
    
    const courseHours = parseInt(courses.find(c => c.id === selectedCourse)?.duration || '30', 10);
    
    // Determine time preference
    let timeRange = { start: '', end: '' };
    if (preferredTimes.mornings) {
      timeRange = { start: '08:00', end: '12:00' };
    } else if (preferredTimes.afternoons) {
      timeRange = { start: '13:00', end: '17:00' };
    } else if (preferredTimes.evenings) {
      timeRange = { start: '18:00', end: '22:00' };
    } else {
      timeRange = { start: '18:00', end: '21:00' }; // Default evening
    }
    
    // Generate slots based on schedule type
    if (type === 'balanced') {
      selectedDays.forEach(day => {
        result.push({
          day,
          startTime: timeRange.start,
          endTime: addMinutesToTime(timeRange.start, 90),
          duration: 1.5 // 1.5 hours
        });
      });
    } else if (type === 'intensive') {
      selectedDays.slice(0, Math.min(selectedDays.length, 4)).forEach(day => {
        result.push({
          day,
          startTime: timeRange.start,
          endTime: addMinutesToTime(timeRange.start, 120),
          duration: 2 // 2 hours
        });
      });
    } else { // flexible
      selectedDays.slice(0, Math.min(selectedDays.length, 5)).forEach(day => {
        result.push({
          day,
          startTime: timeRange.start,
          endTime: addMinutesToTime(timeRange.start, 60),
          duration: 1 // 1 hour
        });
      });
    }
    
    return result;
  };

  const addMinutesToTime = (time: string, minutes: number): string => {
    const [hours, mins] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  };

  const calculateTotalHours = (type: 'balanced' | 'intensive' | 'flexible'): number => {
    const hoursPerWeek = type === 'balanced' ? 4.5 : type === 'intensive' ? 8 : 3;
    return hoursPerWeek;
  };

  const estimateCompletion = (type: 'balanced' | 'intensive' | 'flexible'): string => {
    const courseHours = parseInt(courses.find(c => c.id === selectedCourse)?.duration || '30', 10);
    const hoursPerWeek = calculateTotalHours(type);
    const weeks = Math.ceil(courseHours / hoursPerWeek);
    
    return `~${weeks} weeks`;
  };

  const finalizeSchedule = () => {
    if (selectedSchedule !== null) {
      // This would integrate with a calendar/scheduling system
      console.log("Finalizing schedule:", scheduleOptions[selectedSchedule]);
      setActiveStep(4);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select a course to schedule
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="course-select-label">Course</InputLabel>
              <Select
                labelId="course-select-label"
                value={selectedCourse}
                label="Course"
                onChange={(e) => setSelectedCourse(e.target.value as string)}
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Typography>{course.name}</Typography>
                      <Typography color="text.secondary">{course.duration}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            {selectedCourse && (
              <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="body2">
                  <strong>{courses.find(c => c.id === selectedCourse)?.name}</strong> requires approximately <strong>{courses.find(c => c.id === selectedCourse)?.duration}</strong> to complete.
                </Typography>
              </Alert>
            )}
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Learning preferences
            </Typography>
            
            <Grid container spacing={4} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Schedule Type
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="schedule-type-label">Schedule Type</InputLabel>
                  <Select
                    labelId="schedule-type-label"
                    value={schedule}
                    label="Schedule Type"
                    onChange={(e) => setSchedule(e.target.value as 'daily' | 'weekly' | 'monthly')}
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Learning Intensity
                </Typography>
                <Box sx={{ px: 3 }}>
                  <Slider
                    value={intensity}
                    onChange={(e, value) => setIntensity(value as number)}
                    min={1}
                    max={5}
                    step={1}
                    marks={[
                      { value: 1, label: 'Light' },
                      { value: 3, label: 'Moderate' },
                      { value: 5, label: 'Intense' }
                    ]}
                    valueLabelDisplay="auto"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Available days and times
            </Typography>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Days Available
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {days.map(day => (
                  <Chip
                    key={day}
                    label={day}
                    clickable
                    color={availableDays.includes(day) ? 'primary' : 'default'}
                    onClick={() => handleDayToggle(day)}
                    sx={{ mb: 1 }}
                  />
                ))}
              </Box>
            </Box>
            
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Preferred Time of Day
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={preferredTimes.mornings}
                        onChange={() => handleTimePreferenceChange('mornings')}
                      />
                    }
                    label="Mornings (8AM - 12PM)"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={preferredTimes.afternoons}
                        onChange={() => handleTimePreferenceChange('afternoons')}
                      />
                    }
                    label="Afternoons (1PM - 5PM)"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={preferredTimes.evenings}
                        onChange={() => handleTimePreferenceChange('evenings')}
                      />
                    }
                    label="Evenings (6PM - 10PM)"
                  />
                </Grid>
              </Grid>
            </Box>
            
            {(!availableDays.length || 
              (!preferredTimes.mornings && !preferredTimes.afternoons && !preferredTimes.evenings)) && (
              <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="body2">
                  If you don't select specific days or times, we'll create recommendations based on common availability patterns.
                </Typography>
              </Alert>
            )}
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              AI-generated schedule recommendations
            </Typography>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, mb: 4 }}>
                <CircularProgress />
                <Typography variant="body1" sx={{ ml: 2 }}>
                  Analyzing your availability and generating optimal schedules...
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3} sx={{ mt: 1 }}>
                {scheduleOptions.map((option, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Paper
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        height: '100%',
                        cursor: 'pointer',
                        border: '2px solid',
                        borderColor: selectedSchedule === index ? 'primary.main' : 'transparent',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                        }
                      }}
                      onClick={() => setSelectedSchedule(index)}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" fontWeight={600}>
                          {option.name}
                        </Typography>
                        {selectedSchedule === index && (
                          <CheckIcon color="primary" />
                        )}
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {option.description}
                      </Typography>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TimeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" fontWeight={500}>
                            {option.totalHours} hrs/week
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" fontWeight={500}>
                            {option.completion}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Schedule Preview:
                      </Typography>
                      
                      <Box sx={{ mt: 1 }}>
                        {option.timeSlots.map((slot, i) => (
                          <Box 
                            key={i} 
                            sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              p: 1,
                              mb: 0.5,
                              bgcolor: 'rgba(0, 0, 0, 0.03)',
                              borderRadius: 1
                            }}
                          >
                            <Typography variant="body2" fontWeight={500}>
                              {slot.day}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {slot.startTime} - {slot.endTime}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        );
      case 4:
        return (
          <Box>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              mb: 4
            }}>
              <CheckIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Your learning schedule has been created!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Your new schedule for <strong>{courses.find(c => c.id === selectedCourse)?.name}</strong> has been added to your calendar.
              </Typography>
            </Box>
            
            <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Schedule Summary
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Course
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {courses.find(c => c.id === selectedCourse)?.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Schedule Type
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {selectedSchedule !== null ? scheduleOptions[selectedSchedule].name : ''}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Weekly Time Commitment
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {selectedSchedule !== null ? `${scheduleOptions[selectedSchedule].totalHours} hours per week` : ''}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Estimated Completion
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {selectedSchedule !== null ? scheduleOptions[selectedSchedule].completion : ''}
                  </Typography>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Weekly Schedule
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                {selectedSchedule !== null && scheduleOptions[selectedSchedule].timeSlots.map((slot, i) => (
                  <Box 
                    key={i} 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      p: 2,
                      mb: 1,
                      bgcolor: 'rgba(0, 0, 0, 0.03)',
                      borderRadius: 2
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarIcon sx={{ mr: 1.5, color: 'primary.main' }} />
                      <Typography variant="body1" fontWeight={500}>
                        {slot.day}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">
                        {slot.startTime} - {slot.endTime}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button 
                variant="outlined" 
                color="primary"
                onClick={() => setActiveStep(0)}
                startIcon={<ScheduleIcon />}
              >
                Plan Another Course
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<SchoolIcon />}
                onClick={() => {/* Navigate to course */}}
              >
                Start Learning Now
              </Button>
            </Box>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        <AIIcon sx={{ fontSize: 38, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" fontWeight={700}>
          AI Learning Planner
        </Typography>
      </Box>
      
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          borderRadius: 3, 
          backgroundColor: theme.palette.background.paper,
          mb: 4
        }}
      >
        <Typography variant="body1" paragraph>
          Our AI-powered Learning Planner analyzes your schedule and preferences to create an optimal learning plan 
          customized to your availability and learning style. Get the most out of your study time with personalized scheduling.
        </Typography>
        
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box sx={{ mt: 5, minHeight: '300px' }}>
          {getStepContent(activeStep)}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 4 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0 || activeStep === 4}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? null : (
              activeStep === 3 ? (
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={finalizeSchedule}
                  disabled={selectedSchedule === null}
                  endIcon={<KeyboardArrowRightIcon />}
                >
                  Finalize Schedule
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  onClick={handleNext}
                  disabled={(activeStep === 0 && !selectedCourse) || (activeStep === 2 && loading)}
                  endIcon={<KeyboardArrowRightIcon />}
                >
                  {activeStep === 2 ? 'Generate Recommendations' : 'Next'}
                </Button>
              )
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AIPlanner; 