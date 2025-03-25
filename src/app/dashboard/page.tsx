'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#0a0a0a]">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <nav className="mt-8 space-y-4">
            <Link href="/dashboard" className="block text-gray-700 hover:text-black font-medium transition-colors">Home</Link>
            <Link href="/dashboard/profile" className="block text-gray-700 hover:text-black font-medium transition-colors">Profile</Link>
            <Link href="/dashboard/settings" className="block text-gray-700 hover:text-black font-medium transition-colors">Settings</Link>
            <Link href="/login" className="block text-gray-700 hover:text-black font-medium transition-colors">Logout</Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-lg p-6 flex items-center justify-between">
          <button
            className="md:hidden text-black focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
          <div className="w-6 md:hidden" /> {/* Spacer for mobile */}
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-800">Overview</h3>
              <p className="mt-2 text-gray-700">Total Accounts: 150</p>
              <p className="text-gray-700">Active Users: 120</p>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
              <p className="mt-2 text-gray-700">Last Login: 3 hours ago</p>
              <p className="text-gray-700">New Messages: 5</p>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
              <button className="mt-4 w-full text-white rounded-lg py-2 font-medium transition-all duration-300">
                Add New Item
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}