import { useState } from 'react';
import { getAllUsers } from '../contexts/AuthContext';
import { Search, User, Mail, Briefcase, Calendar } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

export default function AdminEmployeeList() {
  const [searchQuery, setSearchQuery] = useState('');
  const employees = getAllUsers();

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900">Employee Management</h1>
          <p className="text-gray-600 mt-2">View and manage all employees</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, employee ID, or email..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Total Employees</p>
            <p className="text-3xl text-gray-900">{employees.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Departments</p>
            <p className="text-3xl text-gray-900">
              {new Set(employees.map(e => e.department)).size}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Admins</p>
            <p className="text-3xl text-gray-900">
              {employees.filter(e => e.role === 'admin').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Regular Employees</p>
            <p className="text-3xl text-gray-900">
              {employees.filter(e => e.role === 'employee').length}
            </p>
          </div>
        </div>

        {/* Employee List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl text-gray-900">All Employees ({filteredEmployees.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Employee</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Employee ID</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Department</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Position</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Join Date</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                          {employee.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-gray-900">{employee.name}</p>
                          <p className="text-sm text-gray-500">{employee.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{employee.employeeId}</td>
                    <td className="px-6 py-4 text-gray-900">{employee.department}</td>
                    <td className="px-6 py-4 text-gray-900">{employee.position}</td>
                    <td className="px-6 py-4 text-gray-900">
                      {employee.joinDate ? new Date(employee.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        employee.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {employee.role.charAt(0).toUpperCase() + employee.role.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No employees found matching your search.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
