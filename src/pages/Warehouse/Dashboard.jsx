import React from 'react';
import { LayoutDashboard, Map, User2, Truck } from 'lucide-react';

export default function Dashboard() {

  const drivers = [
    {
      id: 'DRV-001',
      vehicle: 'Toyota HiAce',
      status: 'En Route',
      location: 'Cebu City',
      destination: 'Mandaue',
      expectedArrival: '12:45 PM',
      actualArrival: '—',
      delayReason: '',
      reportedIssue: '',
      lastUpdate: '2 mins ago',
    },
    {
      id: 'DRV-002',
      vehicle: 'Isuzu Elf',
      status: 'Idle',
      location: 'Lapu-Lapu',
      destination: 'N/A',
      expectedArrival: '—',
      actualArrival: '—',
      delayReason: '',
      reportedIssue: '',
      lastUpdate: '15 mins ago',
    },
    {
      id: 'DRV-003',
      vehicle: 'Ford Ranger',
      status: 'Delayed',
      location: 'Talisay',
      destination: 'SM Seaside',
      expectedArrival: '1:00 PM',
      actualArrival: '1:45 PM',
      delayReason: 'Heavy Traffic',
      reportedIssue: 'Route congestion',
      lastUpdate: '3 mins ago',
    },
  ];


  return (
    <div className="flex min-h-screen bg-[#f5f6fb] text-[#1f1f2e]">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-xl font-bold text-[#3030ff]">Name</div>
        <nav className="px-6 space-y-4 mt-4 text-[15px] font-medium">
          <a
            href="#"
            className="flex items-center space-x-2 text-gray-600 hover:text-[#3030ff] hover:bg-[#eaeaff] px-3 py-2 rounded-md transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </a>

          <button
            type="button"
            onClick={() => navigate('/maps')}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#3030ff] hover:bg-[#eaeaff] px-3 py-2 rounded-md w-full text-left transition-colors"
          >
            <Map className="w-5 h-5" />
            <span>Maps</span>
          </button>

          <a
            href="#"
            className="flex items-center space-x-2 text-gray-600 hover:text-[#3030ff] hover:bg-[#eaeaff] px-3 py-2 rounded-md transition-colors"
          >
            <User2 className="w-5 h-5" />
            <span>Drivers</span>
          </a>

          <a
            href="#"
            className="flex items-center space-x-2 text-gray-600 hover:text-[#3030ff] hover:bg-[#eaeaff] px-3 py-2 rounded-md transition-colors"
          >
            <Truck className="w-5 h-5" />
            <span>Vehicles</span>
          </a>
        </nav>
      </aside>


      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-sm font-medium text-gray-500">Active Vehicles</h2>
            <p className="text-2xl font-bold mt-2">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-sm font-medium text-gray-500">Delayed Deliveries</h2>
            <p className="text-2xl font-bold mt-2">241</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-sm font-medium text-gray-500">Maintenance Cost</h2>
            <p className="text-2xl font-bold mt-2">312</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md overflow-auto">
          <h2 className="text-xl font-semibold mb-6">Driver Delay Insights</h2>
          <div className="w-full overflow-x-auto">
            <table className="min-w-[800px] w-full table-auto text-sm">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs sticky top-0">
                <tr>
                  <th className="py-3 px-4 text-left">Driver ID</th>
                  <th className="py-3 px-4 text-left">Vehicle</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Destination</th>
                  <th className="py-3 px-4 text-left">ETA / Actual</th>
                  <th className="py-3 px-4 text-left">Reported Issue</th>
                  <th className="py-3 px-4 text-left">Last Update</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {drivers.map((driver, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-50 border-b hover:bg-blue-50 transition-all">
                    <td className="py-3 px-4 font-semibold text-gray-900">{driver.id}</td>
                    <td className="py-3 px-4">{driver.vehicle}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        driver.status === 'En Route'
                          ? 'bg-blue-100 text-blue-600'
                          : driver.status === 'Idle'
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {driver.status}
                      </span>
                      {driver.delayReason && (
                        <div className="text-xs text-red-500 mt-1">{driver.delayReason}</div>
                      )}
                    </td>
                    <td className="py-3 px-4">{driver.location}</td>
                    <td className="py-3 px-4">{driver.destination}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm font-medium text-gray-800">{driver.expectedArrival}</div>
                      {driver.actualArrival ? (
                        <div className={`text-xs mt-1 font-semibold ${
                          driver.isDelayed ? 'text-red-500' : 'text-green-600'
                        }`}>
                          {driver.isDelayed ? `Delayed by ${driver.delayDuration}` : 'On time'}
                          <span className="ml-2 text-gray-500">({driver.actualArrival})</span>
                        </div>
                      ) : (
                        <div className="text-xs text-gray-400 italic mt-1">No data</div>
                      )}
                    </td>

                    <td className="py-3 px-4 text-xs text-gray-500">{driver.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


      </main>
    </div>
  );
}
