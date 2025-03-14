
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/hooks/use-toast";

type UserRole = 'brand' | 'creator';

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  companyName?: string;
  industry?: string;
  website?: string;
  specialty?: string;
  portfolioLink?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: UserRole, profileData: Partial<User>) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('adcreativex_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user', error);
        localStorage.removeItem('adcreativex_user');
      }
    }
    setLoading(false);
  }, []);

  // Simulated login function (replace with real auth in production)
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in a real app this would be a server call
      if (email && password) {
        // Check if user exists in localStorage (for demo purposes)
        const usersStr = localStorage.getItem('adcreativex_users');
        const users = usersStr ? JSON.parse(usersStr) : [];
        const foundUser = users.find((u: any) => u.email === email);
        
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem('adcreativex_user', JSON.stringify(foundUser));
          toast({
            title: "Login successful",
            description: `Welcome back, ${foundUser.name || foundUser.email}!`,
          });
        } else {
          throw new Error('Invalid credentials');
        }
      } else {
        throw new Error('Please provide email and password');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Simulated register function
  const register = async (email: string, password: string, role: UserRole, profileData: Partial<User>) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate required fields
      if (!email || !password || !role) {
        throw new Error('Please fill all required fields');
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        role,
        name: profileData.name || '',
        ...profileData
      };
      
      // Store in localStorage (for demo purposes)
      const usersStr = localStorage.getItem('adcreativex_users');
      const users = usersStr ? JSON.parse(usersStr) : [];
      
      // Check if email is already registered
      if (users.some((u: any) => u.email === email)) {
        throw new Error('Email already registered');
      }
      
      users.push(newUser);
      localStorage.setItem('adcreativex_users', JSON.stringify(users));
      
      // Log in the new user
      setUser(newUser);
      localStorage.setItem('adcreativex_user', JSON.stringify(newUser));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('adcreativex_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // Update user profile
  const updateProfile = async (profileData: Partial<User>) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!user) {
        throw new Error('Not logged in');
      }
      
      // Update user data
      const updatedUser = { ...user, ...profileData };
      
      // Update in localStorage (for demo purposes)
      const usersStr = localStorage.getItem('adcreativex_users');
      if (usersStr) {
        const users = JSON.parse(usersStr);
        const updatedUsers = users.map((u: User) => 
          u.id === user.id ? updatedUser : u
        );
        localStorage.setItem('adcreativex_users', JSON.stringify(updatedUsers));
      }
      
      // Update current user
      setUser(updatedUser);
      localStorage.setItem('adcreativex_user', JSON.stringify(updatedUser));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
