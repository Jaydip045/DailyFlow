import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Clock, Calendar, DollarSign, LogOut, Bell } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

export default function EmployeeDashboard() {
  const { user } = useAuth();

  // Mock recent activities
  const recentActivities = [
    { id: 1, type: 'attendance', message: 'Checked in at 9:00 AM', time: 'Today' },
    { id: 2, type: 'leave', message: 'Leave request approved', time: 'Yesterday' },
    { id: 3, type: 'profile', message: 'Profile updated', time: '2 days ago' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your account today.</p>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <QuickAccessCard
          to="/profile"
          icon={<User className="w-6 h-6" />}
          title="My Profile"
          description="View and edit your profile"
          color="bg-blue-500"
        />
        <QuickAccessCard
          to="/attendance"
          icon={<Clock className="w-6 h-6" />}
          title="Attendance"
          description="Track your attendance"
          color="bg-green-500"
        />
        <QuickAccessCard
          to="/leave"
          icon={<Calendar className="w-6 h-6" />}
          title="Leave Requests"
          description="Manage your time off"
          color="bg-purple-500"
        />
        <QuickAccessCard
          to="/payroll"
          icon={<DollarSign className="w-6 h-6" />}
          title="Payroll"
          description="View salary details"
          color="bg-amber-500"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-5 h-5 text-gray-700" />
          <h2 className="text-xl text-gray-900">Recent Activity</h2>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-gray-900">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

function QuickAccessCard({ to, icon, title, description, color }: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <Link
      to={to}
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  );
}
