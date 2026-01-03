import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Users, Clock, Calendar, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

export default function AdminDashboard() {
  const { user } = useAuth();

  // Mock statistics
  const stats = [
    { label: 'Total Employees', value: '24', icon: <Users className="w-6 h-6" />, color: 'bg-blue-500' },
    { label: 'Present Today', value: '18', icon: <CheckCircle className="w-6 h-6" />, color: 'bg-green-500' },
    { label: 'Absent Today', value: '3', icon: <XCircle className="w-6 h-6" />, color: 'bg-red-500' },
    { label: 'Pending Requests', value: '5', icon: <AlertCircle className="w-6 h-6" />, color: 'bg-amber-500' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your workforce effectively</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
              <span className="text-3xl text-gray-900">{stat.value}</span>
            </div>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickActionCard
          to="/admin/employees"
          icon={<Users className="w-6 h-6" />}
          title="Employee Management"
          description="View and manage all employees"
          color="bg-blue-500"
        />
        <QuickActionCard
          to="/admin/leave-approvals"
          icon={<Calendar className="w-6 h-6" />}
          title="Leave Approvals"
          description="Review and approve leave requests"
          color="bg-purple-500"
        />
        <QuickActionCard
          to="/admin/attendance"
          icon={<Clock className="w-6 h-6" />}
          title="Attendance Records"
          description="View attendance of all employees"
          color="bg-green-500"
        />
      </div>
    </DashboardLayout>
  );
}

function QuickActionCard({ to, icon, title, description, color }: {
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
