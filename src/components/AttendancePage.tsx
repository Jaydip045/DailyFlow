import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Clock, Calendar, CheckCircle, XCircle } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

interface AttendanceRecord {
  id: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'half-day' | 'leave';
  hours?: number;
}

export default function AttendancePage() {
  const { user } = useAuth();
  const [view, setView] = useState<'daily' | 'weekly'>('daily');
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  // Mock attendance data
  const [attendanceRecords] = useState<AttendanceRecord[]>([
    { id: '1', date: '2026-01-03', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'present', hours: 8.5 },
    { id: '2', date: '2026-01-02', checkIn: '09:15 AM', checkOut: '05:45 PM', status: 'present', hours: 8.5 },
    { id: '3', date: '2026-01-01', status: 'leave' },
    { id: '4', date: '2025-12-31', checkIn: '09:00 AM', checkOut: '02:00 PM', status: 'half-day', hours: 5 },
    { id: '5', date: '2025-12-30', checkIn: '08:45 AM', checkOut: '05:30 PM', status: 'present', hours: 8.75 },
    { id: '6', date: '2025-12-27', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'present', hours: 8.5 },
    { id: '7', date: '2025-12-26', checkIn: '09:10 AM', checkOut: '05:40 PM', status: 'present', hours: 8.5 },
  ]);

  const handleCheckIn = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setCheckInTime(timeString);
    setCheckedIn(true);
  };

  const handleCheckOut = () => {
    setCheckedIn(false);
    setCheckInTime(null);
  };

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

  const todayRecord = attendanceRecords[0];

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900">Attendance</h1>
          <p className="text-gray-600 mt-2">Track your daily and weekly attendance</p>
        </div>

        {/* Check In/Out Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl text-gray-900 mb-2">Today's Attendance</h3>
              <p className="text-gray-600">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="flex items-center gap-4">
              {checkedIn ? (
                <>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Checked in at</p>
                    <p className="text-lg text-gray-900">{checkInTime}</p>
                  </div>
                  <button
                    onClick={handleCheckOut}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Check Out
                  </button>
                </>
              ) : (
                <button
                  onClick={handleCheckIn}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Check In
                </button>
              )}
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView('daily')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              view === 'daily' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Daily View
          </button>
          <button
            onClick={() => setView('weekly')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              view === 'weekly' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Weekly View
          </button>
        </div>

        {/* Attendance Records */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Date</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Check In</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Check Out</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Hours</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {attendanceRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">
                          {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </td>
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

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">This Month</p>
            <p className="text-2xl text-gray-900">18 days</p>
            <p className="text-xs text-green-600 mt-1">Present</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Absent</p>
            <p className="text-2xl text-gray-900">2 days</p>
            <p className="text-xs text-red-600 mt-1">This Month</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Half Days</p>
            <p className="text-2xl text-gray-900">1 day</p>
            <p className="text-xs text-yellow-600 mt-1">This Month</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Avg. Hours</p>
            <p className="text-2xl text-gray-900">8.5 hrs</p>
            <p className="text-xs text-blue-600 mt-1">Per Day</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
