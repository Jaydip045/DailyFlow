import { useAuth } from '../contexts/AuthContext';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

interface PayrollDetail {
  id: string;
  month: string;
  year: number;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netPay: number;
  paymentDate: string;
  status: 'paid' | 'pending';
}

export default function PayrollPage() {
  const { user } = useAuth();

  // Mock payroll data
  const payrollHistory: PayrollDetail[] = [
    {
      id: '1',
      month: 'January',
      year: 2026,
      baseSalary: user?.salary ? user.salary / 12 : 0,
      allowances: 500,
      deductions: 1200,
      netPay: user?.salary ? (user.salary / 12) + 500 - 1200 : 0,
      paymentDate: '2026-01-31',
      status: 'pending',
    },
    {
      id: '2',
      month: 'December',
      year: 2025,
      baseSalary: user?.salary ? user.salary / 12 : 0,
      allowances: 500,
      deductions: 1200,
      netPay: user?.salary ? (user.salary / 12) + 500 - 1200 : 0,
      paymentDate: '2025-12-31',
      status: 'paid',
    },
    {
      id: '3',
      month: 'November',
      year: 2025,
      baseSalary: user?.salary ? user.salary / 12 : 0,
      allowances: 500,
      deductions: 1200,
      netPay: user?.salary ? (user.salary / 12) + 500 - 1200 : 0,
      paymentDate: '2025-11-30',
      status: 'paid',
    },
  ];

  const currentPayroll = payrollHistory[0];

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900">Payroll</h1>
          <p className="text-gray-600 mt-2">View your salary and payment details</p>
        </div>

        {/* Current Month Overview */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 mb-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-indigo-100">Current Month</p>
              <h2 className="text-3xl mt-1">{currentPayroll.month} {currentPayroll.year}</h2>
            </div>
            <div className={`px-4 py-2 rounded-lg ${currentPayroll.status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}`}>
              {currentPayroll.status === 'paid' ? 'Paid' : 'Pending'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-indigo-100 text-sm mb-1">Base Salary</p>
              <p className="text-2xl">${currentPayroll.baseSalary.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-indigo-100 text-sm mb-1">Allowances</p>
              <p className="text-2xl text-green-300">+${currentPayroll.allowances.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-indigo-100 text-sm mb-1">Deductions</p>
              <p className="text-2xl text-red-300">-${currentPayroll.deductions.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-indigo-100 text-sm mb-1">Net Pay</p>
              <p className="text-3xl">${currentPayroll.netPay.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Salary Breakdown */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl text-gray-900 mb-4">Salary Breakdown</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900">Base Salary</p>
                  <p className="text-sm text-gray-500">Monthly base compensation</p>
                </div>
              </div>
              <p className="text-lg text-gray-900">${currentPayroll.baseSalary.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-900">Allowances</p>
                  <p className="text-sm text-gray-500">Transportation, meals, etc.</p>
                </div>
              </div>
              <p className="text-lg text-green-600">+${currentPayroll.allowances.toLocaleString()}</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-900">Deductions</p>
                  <p className="text-sm text-gray-500">Tax, insurance, retirement</p>
                </div>
              </div>
              <p className="text-lg text-red-600">-${currentPayroll.deductions.toLocaleString()}</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-900">Net Pay</p>
                  <p className="text-sm text-gray-500">Total amount to be paid</p>
                </div>
              </div>
              <p className="text-2xl text-indigo-600">${currentPayroll.netPay.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl text-gray-900">Payment History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Period</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Base Salary</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Allowances</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Deductions</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Net Pay</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payrollHistory.map((payroll) => (
                  <tr key={payroll.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{payroll.month} {payroll.year}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">${payroll.baseSalary.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-green-600">+${payroll.allowances.toLocaleString()}</td>
                    <td className="px-6 py-4 text-red-600">-${payroll.deductions.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-900">${payroll.netPay.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        payroll.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Annual Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Annual Salary</p>
            <p className="text-3xl text-gray-900">${user?.salary?.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Gross Annual Income</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">YTD Earnings</p>
            <p className="text-3xl text-gray-900">${user?.salary ? ((user.salary / 12) * 1).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}</p>
            <p className="text-xs text-gray-500 mt-1">Year to Date (2026)</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Total Deductions</p>
            <p className="text-3xl text-gray-900">$1,200</p>
            <p className="text-xs text-gray-500 mt-1">This Month</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
