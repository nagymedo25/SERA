import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAuthRedirect } from '../utils/authUtils';

interface User {
  id: string;
  name: string;
  email: string;
  completedOnboarding: boolean;
  assessmentScore?: number;
  certifications: string[];
  learningPath?: {
    courses: string[];
    progress: number;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
  updateAssessmentScore: (score: number) => void;
  addCertification: (certification: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // In a real app, these would make API calls
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock login
      setTimeout(() => {
        const mockUser: User = {
          id: '1',
          name: 'Test User',
          email,
          completedOnboarding: false,
          certifications: [],
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setLoading(false);
        
        // Use utility function to handle redirection after login
        handleAuthRedirect(navigate, mockUser);
      }, 1000);
    } catch (error) {
      setLoading(false);
      throw new Error('Login failed');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Mock registration
      setTimeout(() => {
        const newUser: User = {
          id: Date.now().toString(),
          name,
          email,
          completedOnboarding: false,
          certifications: [],
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        setLoading(false);
        navigate('/onboarding');
      }, 1000);
    } catch (error) {
      setLoading(false);
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const completeOnboarding = () => {
    if (user) {
      const updatedUser = { ...user, completedOnboarding: true };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const updateAssessmentScore = (score: number) => {
    if (user) {
      const updatedUser = { ...user, assessmentScore: score };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const addCertification = (certification: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        certifications: [...user.certifications, certification]
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    completeOnboarding,
    updateAssessmentScore,
    addCertification
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 