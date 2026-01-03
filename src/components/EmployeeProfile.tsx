import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, DollarSign, Edit2, Save, X } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

export default function EmployeeProfile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl text-gray-900">My Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Profile Picture */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-3xl">
              {user?.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl text-gray-900">{user?.name}</h2>
              <p className="text-gray-600">{user?.position}</p>
              <p className="text-sm text-gray-500">Employee ID: {user?.employeeId}</p>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl text-gray-900 mb-4">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-900">
                  <User className="w-4 h-4 text-gray-400" />
                  {user?.name}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <div className="flex items-center gap-2 text-gray-900">
                <Mail className="w-4 h-4 text-gray-400" />
                {user?.email}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-900">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {user?.phone || 'Not provided'}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Address</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-900">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {user?.address || 'Not provided'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl text-gray-900 mb-4">Job Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Department</label>
              <div className="flex items-center gap-2 text-gray-900">
                <Briefcase className="w-4 h-4 text-gray-400" />
                {user?.department}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Position</label>
              <div className="flex items-center gap-2 text-gray-900">
                <Briefcase className="w-4 h-4 text-gray-400" />
                {user?.position}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Join Date</label>
              <div className="flex items-center gap-2 text-gray-900">
                <Calendar className="w-4 h-4 text-gray-400" />
                {user?.joinDate ? new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Employee ID</label>
              <div className="text-gray-900">{user?.employeeId}</div>
            </div>
          </div>
        </div>

        {/* Salary Structure */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl text-gray-900 mb-4">Salary Structure</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Annual Salary</label>
              <div className="flex items-center gap-2 text-gray-900">
                <DollarSign className="w-4 h-4 text-gray-400" />
                ${user?.salary?.toLocaleString()}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Monthly Salary</label>
              <div className="flex items-center gap-2 text-gray-900">
                <DollarSign className="w-4 h-4 text-gray-400" />
                ${user?.salary ? (user.salary / 12).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '0'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
