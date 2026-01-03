import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  employeeId: string;
  email: string;
  name: string;
  role: 'employee' | 'admin';
  phone?: string;
  address?: string;
  profilePicture?: string;
  department?: string;
  position?: string;
  joinDate?: string;
  salary?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => void;
  updateProfile: (data: Partial<User>) => void;
}

interface SignUpData {
  employeeId: string;
  email: string;
  password: string;
  name: string;
  role: 'employee' | 'admin';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: Array<User & { password: string }> = [
  {
    id: '1',
    employeeId: 'EMP001',
    email: 'john.doe@dayflow.com',
    password: 'password123',
    name: 'John Doe',
    role: 'employee',
    phone: '+1 234 567 8900',
    address: '123 Main St, New York, NY 10001',
    department: 'Engineering',
    position: 'Software Engineer',
    joinDate: '2023-01-15',
    salary: 75000,
  },
  {
    id: '2',
    employeeId: 'EMP002',
    email: 'admin@dayflow.com',
    password: 'admin123',
    name: 'Sarah Johnson',
    role: 'admin',
    phone: '+1 234 567 8901',
    address: '456 Oak Ave, New York, NY 10002',
    department: 'Human Resources',
    position: 'HR Manager',
    joinDate: '2022-06-01',
    salary: 95000,
  },
  {
    id: '3',
    employeeId: 'EMP003',
    email: 'jane.smith@dayflow.com',
    password: 'password123',
    name: 'Jane Smith',
    role: 'employee',
    phone: '+1 234 567 8902',
    address: '789 Pine St, New York, NY 10003',
    department: 'Marketing',
    position: 'Marketing Specialist',
    joinDate: '2023-03-20',
    salary: 65000,
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('dayflow_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('dayflow_user', JSON.stringify(userWithoutPassword));
  };

  const signUp = async (data: SignUpData) => {
    // Check if user already exists
    const existingUser = mockUsers.find(
      (u) => u.email === data.email || u.employeeId === data.employeeId
    );

    if (existingUser) {
      throw new Error('User with this email or employee ID already exists');
    }

    const newUser: User & { password: string } = {
      id: String(mockUsers.length + 1),
      employeeId: data.employeeId,
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role,
      department: 'Not Assigned',
      position: 'Not Assigned',
      joinDate: new Date().toISOString().split('T')[0],
      salary: 50000,
    };

    mockUsers.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('dayflow_user', JSON.stringify(userWithoutPassword));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('dayflow_user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('dayflow_user', JSON.stringify(updatedUser));
      
      // Update in mock database
      const userIndex = mockUsers.findIndex((u) => u.id === user.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...data };
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper function to get all users (for admin)
export function getAllUsers(): User[] {
  return mockUsers.map(({ password, ...user }) => user);
}
