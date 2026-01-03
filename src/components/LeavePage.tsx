import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Plus, Clock, CheckCircle, XCircle } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'paid' | 'sick' | 'unpaid';
  startDate: string;
  endDate: string;
  remarks: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  reviewedBy?: string;
  reviewComments?: string;
}

export default function LeavePage() {
  const { user } = useAuth();
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'paid' as 'paid' | 'sick' | 'unpaid',
    startDate: '',
    endDate: '',
    remarks: '',
  });

  // Mock leave requests
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      employeeId: user?.employeeId || '',
      employeeName: user?.name || '',
      type: 'paid',
      startDate: '2026-01-15',
      endDate: '2026-01-17',
      remarks: 'Family vacation',
      status: 'approved',
      submittedDate: '2025-12-20',
      reviewedBy: 'Sarah Johnson',
      reviewComments: 'Approved. Enjoy your vacation!',
    },
    {
      id: '2',
      employeeId: user?.employeeId || '',
      employeeName: user?.name || '',
      type: 'sick',
      startDate: '2026-01-10',
      endDate: '2026-01-10',
      remarks: 'Medical appointment',
      status: 'pending',
      submittedDate: '2026-01-03',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRequest: LeaveRequest = {
      id: String(leaveRequests.length + 1),
      employeeId: user?.employeeId || '',
      employeeName: user?.name || '',
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      remarks: formData.remarks,
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0],
    };

    setLeaveRequests([newRequest, ...leaveRequests]);
    setFormData({ type: 'paid', startDate: '', endDate: '', remarks: '' });
    setShowApplyForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'paid': return 'bg-blue-100 text-blue-800';
      case 'sick': return 'bg-purple-100 text-purple-800';
      case 'unpaid': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl text-gray-900">Leave Management</h1>
            <p className="text-gray-600 mt-2">Manage your time off requests</p>
          </div>
          <button
            onClick={() => setShowApplyForm(!showApplyForm)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Apply for Leave
          </button>
        </div>

        {/* Leave Balance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Paid Leave</p>
            <p className="text-3xl text-gray-900">12 days</p>
            <p className="text-xs text-gray-500 mt-1">Remaining this year</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Sick Leave</p>
            <p className="text-3xl text-gray-900">8 days</p>
            <p className="text-xs text-gray-500 mt-1">Remaining this year</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Used</p>
            <p className="text-3xl text-gray-900">5 days</p>
            <p className="text-xs text-gray-500 mt-1">This year</p>
          </div>
        </div>

        {/* Apply Leave Form */}
        {showApplyForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-xl text-gray-900 mb-4">Apply for Leave</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Leave Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'paid' | 'sick' | 'unpaid' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="paid">Paid Leave</option>
                    <option value="sick">Sick Leave</option>
                    <option value="unpaid">Unpaid Leave</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  {/* Empty space for layout */}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                    min={formData.startDate}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">Remarks</label>
                  <textarea
                    value={formData.remarks}
                    onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Add any additional information..."
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplyForm(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Leave Requests */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl text-gray-900 mb-4">Leave Requests</h3>
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${getTypeColor(request.type)}`}>
                      {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Leave
                    </span>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {calculateDays(request.startDate, request.endDate)} {calculateDays(request.startDate, request.endDate) === 1 ? 'day' : 'days'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">From</p>
                    <p className="text-sm text-gray-900">
                      {new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">To</p>
                    <p className="text-sm text-gray-900">
                      {new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {request.remarks && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500">Remarks</p>
                    <p className="text-sm text-gray-900">{request.remarks}</p>
                  </div>
                )}

                {request.reviewComments && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">Review Comments</p>
                    <p className="text-sm text-gray-900">{request.reviewComments}</p>
                    {request.reviewedBy && (
                      <p className="text-xs text-gray-500 mt-1">Reviewed by {request.reviewedBy}</p>
                    )}
                  </div>
                )}

                <p className="text-xs text-gray-400 mt-3">
                  Submitted on {new Date(request.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
