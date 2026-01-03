import { useState } from 'react';
import { getAllUsers } from '../contexts/AuthContext';
import { Calendar, CheckCircle, XCircle, Clock, Search } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

interface AttendanceRecord {
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'half-day' | 'leave';
  hours?: number;
}

export default function AdminAttendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const employees = getAllUsers();

  // Mock attendance data for all employees
  const attendanceRecords: AttendanceRecord[] = [
    { employeeId: 'EMP001', employeeName: 'John Doe', date: selectedDate, checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'present', hours: 8.5 },
    { employeeId: 'EMP002', employeeName: 'Sarah Johnson', date: selectedDate, checkIn: '08:45 AM', checkOut: '05:45 PM', status: 'present', hours: 9 },
    { employeeId: 'EMP003', employeeName: 'Jane Smith', date: selectedDate, status: 'leave' },
  ];

  const filteredRecords = attendanceRecords.filter((record) =>
    record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'half-day': return 'bg-yellow-100 text-yellow-800';
      case 'leave': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'absent': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const stats = {
    present: attendanceRecords.filter(r => r.status === 'present').length,
    absent: attendanceRecords.filter(r => r.status === 'absent').length,
    leave: attendanceRecords.filter(r => r.status === 'leave').length,
    halfDay: attendanceRecords.filter(r => r.status === 'half-day').length,
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900">Attendance Records</h1>
          <p className="text-gray-600 mt-2">View attendance records of all employees</p>
        </div>

        {/* Date Selector */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-gray-600" />
            <label className="text-sm text-gray-700">Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <span className="text-gray-600 ml-auto">
              {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Present</p>
                <p className="text-3xl text-green-600">{stats.present}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Absent</p>
                <p className="text-3xl text-red-600">{stats.absent}</p>
              </div>
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">On Leave</p>
                <p className="text-3xl text-blue-600">{stats.leave}</p>
              </div>
              <Calendar className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Half Day</p>
                <p className="text-3xl text-yellow-600">{stats.halfDay}</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or employee ID..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Employee</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Employee ID</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Check In</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Check Out</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Hours</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRecords.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                          {record.employeeName.charAt(0)}
                        </div>
                        <span className="text-gray-900">{record.employeeName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{record.employeeId}</td>
                    <td className="px-6 py-4 text-gray-900">{record.checkIn || '-'}</td>
                    <td className="px-6 py-4 text-gray-900">{record.checkOut || '-'}</td>
                    <td className="px-6 py-4 text-gray-900">{record.hours ? `${record.hours} hrs` : '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(record.status)}`}>
                        {getStatusIcon(record.status)}
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No attendance records found.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
