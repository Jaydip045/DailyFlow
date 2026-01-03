import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, XCircle, Clock, MessageSquare } from 'lucide-react';
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

export default function AdminLeaveApprovals() {
  const { user } = useAuth();
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [reviewComments, setReviewComments] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Mock leave requests from all employees
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      type: 'paid',
      startDate: '2026-01-15',
      endDate: '2026-01-17',
      remarks: 'Family vacation',
      status: 'pending',
      submittedDate: '2026-01-03',
    },
    {
      id: '2',
      employeeId: 'EMP003',
      employeeName: 'Jane Smith',
      type: 'sick',
      startDate: '2026-01-10',
      endDate: '2026-01-11',
      remarks: 'Medical appointment',
      status: 'pending',
      submittedDate: '2026-01-02',
    },
    {
      id: '3',
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      type: 'paid',
      startDate: '2025-12-20',
      endDate: '2025-12-22',
      remarks: 'Personal reasons',
      status: 'approved',
      submittedDate: '2025-12-10',
      reviewedBy: user?.name,
      reviewComments: 'Approved',
    },
    {
      id: '4',
      employeeId: 'EMP003',
      employeeName: 'Jane Smith',
      type: 'unpaid',
      startDate: '2025-12-15',
      endDate: '2025-12-16',
      remarks: 'Personal commitment',
      status: 'rejected',
      submittedDate: '2025-12-05',
      reviewedBy: user?.name,
      reviewComments: 'Insufficient notice period',
    },
  ]);

  const handleApprove = (requestId: string) => {
    setLeaveRequests(leaveRequests.map(req =>
      req.id === requestId
        ? { ...req, status: 'approved', reviewedBy: user?.name, reviewComments }
        : req
    ));
    setSelectedRequest(null);
    setReviewComments('');
  };

  const handleReject = (requestId: string) => {
    setLeaveRequests(leaveRequests.map(req =>
      req.id === requestId
        ? { ...req, status: 'rejected', reviewedBy: user?.name, reviewComments }
        : req
    ));
    setSelectedRequest(null);
    setReviewComments('');
  };

  const filteredRequests = filterStatus === 'all'
    ? leaveRequests
    : leaveRequests.filter(req => req.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
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
      <div className="max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900">Leave Approvals</h1>
          <p className="text-gray-600 mt-2">Review and approve employee leave requests</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Pending Requests</p>
            <p className="text-3xl text-yellow-600">
              {leaveRequests.filter(r => r.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Approved</p>
            <p className="text-3xl text-green-600">
              {leaveRequests.filter(r => r.status === 'approved').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Rejected</p>
            <p className="text-3xl text-red-600">
              {leaveRequests.filter(r => r.status === 'rejected').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Total Requests</p>
            <p className="text-3xl text-gray-900">{leaveRequests.length}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filterStatus === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filterStatus === 'pending' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterStatus('approved')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filterStatus === 'approved' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilterStatus('rejected')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filterStatus === 'rejected' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Rejected
          </button>
        </div>

        {/* Leave Requests */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl text-gray-900 mb-4">Leave Requests ({filteredRequests.length})</h3>
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                      {request.employeeName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-gray-900">{request.employeeName}</p>
                      <p className="text-sm text-gray-500">{request.employeeId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${getTypeColor(request.type)}`}>
                      {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                  <div>
                    <p className="text-gray-500">From</p>
                    <p className="text-gray-900">
                      {new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">To</p>
                    <p className="text-gray-900">
                      {new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="text-gray-900">
                      {calculateDays(request.startDate, request.endDate)} {calculateDays(request.startDate, request.endDate) === 1 ? 'day' : 'days'}
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
                  <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Review Comments</p>
                    <p className="text-sm text-gray-900">{request.reviewComments}</p>
                    {request.reviewedBy && (
                      <p className="text-xs text-gray-500 mt-1">Reviewed by {request.reviewedBy}</p>
                    )}
                  </div>
                )}

                {request.status === 'pending' && (
                  <>
                    {selectedRequest?.id === request.id ? (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <label className="block text-sm text-gray-700 mb-2">Add Comments (Optional)</label>
                        <textarea
                          value={reviewComments}
                          onChange={(e) => setReviewComments(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-3"
                          placeholder="Add review comments..."
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                          <button
                            onClick={() => {
                              setSelectedRequest(null);
                              setReviewComments('');
                            }}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Review
                        </button>
                      </div>
                    )}
                  </>
                )}

                <p className="text-xs text-gray-400 mt-3">
                  Submitted on {new Date(request.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            ))}
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No {filterStatus !== 'all' ? filterStatus : ''} leave requests found.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
