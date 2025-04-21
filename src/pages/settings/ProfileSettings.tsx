import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Avatar,
  IconButton,
  Divider,
  Tab,
  Tabs,
  InputAdornment,
  Switch,
  FormControlLabel,
  Alert,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  PhotoCamera as PhotoCameraIcon,
  AccountCircle as AccountCircleIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

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
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
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

const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  
  // Profile form state
  const [formData, setFormData] = useState({
    name: user?.name || 'User Name',
    email: user?.email || 'user@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Front-end developer passionate about creating beautiful and responsive user interfaces. Currently learning React and TypeScript.',
    location: 'San Francisco, CA',
    occupation: 'Web Developer',
    company: 'Tech Company Inc.',
    website: 'https://myportfolio.com'
  });
  
  // Security settings
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    loginNotifications: true
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    assignmentReminders: true,
    courseUpdates: true,
    weeklyProgress: true,
    specialOffers: false
  });
  
  // Preferences settings
  const [preferences, setPreferences] = useState({
    language: 'English',
    timezone: 'UTC-8 (Pacific Time)',
    darkMode: true,
    compactView: false,
    autoPause: true
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleToggleEdit = () => {
    setEditMode(!editMode);
    if (editMode) {
      // Save logic would go here
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === 'twoFactorEnabled' || name === 'loginNotifications') {
      setSecurityData({ ...securityData, [name]: checked });
    } else {
      setSecurityData({ ...securityData, [name]: value });
    }
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings({ ...notificationSettings, [name]: checked });
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;
    if (name === 'language' || name === 'timezone') {
      setPreferences({ ...preferences, [name]: value });
    } else {
      setPreferences({ ...preferences, [name]: checked });
    }
  };

  const handleSavePassword = () => {
    // Password validation and update logic would go here
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
    setSecurityData({
      ...securityData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <DashboardLayout>
      <Box>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <AccountCircleIcon sx={{ fontSize: 38, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" fontWeight={700}>
            Profile & Settings
          </Typography>
        </Box>

        {showSaved && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Your changes have been saved successfully!
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Sidebar with user info */}
          <Grid item xs={12} md={4} lg={3}>
            <Card sx={{ borderRadius: 2, mb: 3 }}>
              <CardContent sx={{ textAlign: 'center', pb: 3 }}>
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                  <Avatar
                    src={user?.photoURL}
                    alt={formData.name}
                    sx={{ width: 120, height: 120, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}
                  >
                    {formData.name.charAt(0)}
                  </Avatar>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'background.paper',
                      border: '2px solid',
                      borderColor: 'divider',
                      '&:hover': { bgcolor: 'background.default' }
                    }}
                    size="small"
                  >
                    <PhotoCameraIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Typography variant="h5" fontWeight={600} gutterBottom>
                  {formData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {formData.email}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {formData.occupation}
                  {formData.company && ` at ${formData.company}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formData.location}
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Account Status
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Account Type
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    Premium
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Member Since
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    March 2023
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Last Assessment
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    2 weeks ago
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Main content area */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
                  <Tab icon={<AccountCircleIcon />} iconPosition="start" label="Profile" />
                  <Tab icon={<SecurityIcon />} iconPosition="start" label="Security" />
                  <Tab icon={<NotificationsIcon />} iconPosition="start" label="Notifications" />
                  <Tab icon={<LanguageIcon />} iconPosition="start" label="Preferences" />
                </Tabs>
              </Box>

              {/* Profile Tab */}
              <TabPanel value={tabValue} index={0}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                  <Button
                    variant={editMode ? "contained" : "outlined"}
                    startIcon={editMode ? <SaveIcon /> : <EditIcon />}
                    onClick={handleToggleEdit}
                  >
                    {editMode ? "Save Changes" : "Edit Profile"}
                  </Button>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      disabled={!editMode}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      disabled={!editMode}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      disabled={!editMode}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      disabled={!editMode}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleFormChange}
                      disabled={!editMode}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Company"
                      name="company"
                      value={formData.company}
                      onChange={handleFormChange}
                      disabled={!editMode}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Website"
                      name="website"
                      value={formData.website}
                      onChange={handleFormChange}
                      disabled={!editMode}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleFormChange}
                      disabled={!editMode}
                      margin="normal"
                      variant="outlined"
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Security Tab */}
              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom>
                  Password
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      name="currentPassword"
                      type="password"
                      value={securityData.currentPassword}
                      onChange={handleSecurityChange}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="New Password"
                      name="newPassword"
                      type="password"
                      value={securityData.newPassword}
                      onChange={handleSecurityChange}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={securityData.confirmPassword}
                      onChange={handleSecurityChange}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick={handleSavePassword}
                      disabled={!securityData.currentPassword || !securityData.newPassword || securityData.newPassword !== securityData.confirmPassword}
                    >
                      Update Password
                    </Button>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h6" gutterBottom>
                  Two Factor Authentication
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={securityData.twoFactorEnabled}
                      onChange={handleSecurityChange}
                      name="twoFactorEnabled"
                    />
                  }
                  label="Enable two-factor authentication"
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                  Add an extra layer of security by requiring a verification code in addition to your password.
                </Typography>

                <Typography variant="h6" gutterBottom>
                  Login Notifications
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={securityData.loginNotifications}
                      onChange={handleSecurityChange}
                      name="loginNotifications"
                    />
                  }
                  label="Receive email notifications for new sign-ins"
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Get notified when someone signs in to your account from an unrecognized device.
                </Typography>
              </TabPanel>

              {/* Notifications Tab */}
              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom>
                  Email Notifications
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationChange}
                      name="emailNotifications"
                    />
                  }
                  label="Enable email notifications"
                />
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="subtitle1" gutterBottom fontWeight={500}>
                  Learning Notifications
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.assignmentReminders}
                          onChange={handleNotificationChange}
                          name="assignmentReminders"
                        />
                      }
                      label="Assignment reminders and due dates"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.courseUpdates}
                          onChange={handleNotificationChange}
                          name="courseUpdates"
                        />
                      }
                      label="Course updates and new content"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.weeklyProgress}
                          onChange={handleNotificationChange}
                          name="weeklyProgress"
                        />
                      }
                      label="Weekly progress reports"
                    />
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="subtitle1" gutterBottom fontWeight={500}>
                  Marketing Notifications
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.specialOffers}
                          onChange={handleNotificationChange}
                          name="specialOffers"
                        />
                      }
                      label="Special offers and promotions"
                    />
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setShowSaved(true);
                      setTimeout(() => setShowSaved(false), 3000);
                    }}
                  >
                    Save Notification Settings
                  </Button>
                </Box>
              </TabPanel>

              {/* Preferences Tab */}
              <TabPanel value={tabValue} index={3}>
                <Typography variant="h6" gutterBottom>
                  Language & Region
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Language"
                      name="language"
                      value={preferences.language}
                      onChange={handlePreferenceChange as any}
                      margin="normal"
                      variant="outlined"
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Mandarin">Mandarin</option>
                      <option value="Arabic">Arabic</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Timezone"
                      name="timezone"
                      value={preferences.timezone}
                      onChange={handlePreferenceChange as any}
                      margin="normal"
                      variant="outlined"
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TimeIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    >
                      <option value="UTC-8 (Pacific Time)">UTC-8 (Pacific Time)</option>
                      <option value="UTC-7 (Mountain Time)">UTC-7 (Mountain Time)</option>
                      <option value="UTC-6 (Central Time)">UTC-6 (Central Time)</option>
                      <option value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time)</option>
                      <option value="UTC+0 (GMT)">UTC+0 (GMT)</option>
                      <option value="UTC+1 (Central European Time)">UTC+1 (Central European Time)</option>
                      <option value="UTC+8 (China Standard Time)">UTC+8 (China Standard Time)</option>
                    </TextField>
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="h6" gutterBottom>
                  Appearance
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={preferences.darkMode}
                          onChange={handlePreferenceChange}
                          name="darkMode"
                        />
                      }
                      label="Dark Mode"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={preferences.compactView}
                          onChange={handlePreferenceChange}
                          name="compactView"
                        />
                      }
                      label="Compact View"
                    />
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="h6" gutterBottom>
                  Learning Preferences
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={preferences.autoPause}
                          onChange={handlePreferenceChange}
                          name="autoPause"
                        />
                      }
                      label="Auto-pause videos when switching tabs"
                    />
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setShowSaved(true);
                      setTimeout(() => setShowSaved(false), 3000);
                    }}
                  >
                    Save Preferences
                  </Button>
                </Box>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default ProfileSettings; 