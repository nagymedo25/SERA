import { NavigateFunction } from 'react-router-dom';

/**
 * Check if user is authenticated and redirect to login if not
 * Returns true if user is authenticated, false otherwise
 */
export const requireAuth = (
  isAuthenticated: boolean, 
  navigate: NavigateFunction, 
  redirectPath: string = '/login'
): boolean => {
  if (!isAuthenticated) {
    // Store the intended destination in localStorage to redirect after login
    localStorage.setItem('authRedirect', window.location.pathname);
    
    // Redirect to login
    navigate(redirectPath, { 
      state: { 
        from: window.location.pathname,
        message: 'Please login to access this feature' 
      } 
    });
    return false;
  }
  return true;
};

/**
 * Handle redirection after successful login
 */
export const handleAuthRedirect = (navigate: NavigateFunction, user: any): void => {
  const redirectPath = localStorage.getItem('authRedirect');
  
  // Clear the stored redirect path
  localStorage.removeItem('authRedirect');
  
  // Determine where to navigate
  if (redirectPath) {
    navigate(redirectPath);
  } else if (!user.completedOnboarding) {
    navigate('/onboarding');
  } else {
    navigate('/dashboard');
  }
}; 