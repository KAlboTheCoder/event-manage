"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Enhanced mock data for admin dashboard
  const mockData = {
    stats: {
      totalEvents: 24,
      upcomingEvents: 8,
      ongoingEvents: 2,
      completedEvents: 12,
      cancelledEvents: 2,
      totalUsers: 1250,
      newUsersThisMonth: 78,
      totalRegistrations: 1876,
      averageAttendance: 85, // percentage
      revenue: 12500, // if applicable
    },
    upcomingEvents: [
      {
        id: 1,
        name: "Annual University Fair",
        date: new Date("2025-06-15T10:00:00Z"),
        location: "Main Campus Grounds",
        organizer: "Academic Affairs Office",
        attendees: 500,
        capacity: 800,
        registrationRate: 62.5, // percentage
        status: "upcoming",
      },
      {
        id: 2,
        name: "Engineering Department Symposium",
        date: new Date("2025-07-10T09:00:00Z"),
        location: "Engineering Building, Room 101",
        organizer: "Engineering Faculty",
        attendees: 120,
        capacity: 150,
        registrationRate: 80, // percentage
        status: "upcoming",
      },
      {
        id: 3,
        name: "Graduation Ceremony",
        date: new Date("2025-07-15T09:00:00Z"),
        location: "University Auditorium",
        organizer: "Office of the Registrar",
        attendees: 1000,
        capacity: 1200,
        registrationRate: 83.3, // percentage
        status: "upcoming",
      },
      {
        id: 4,
        name: "Career Fair 2025",
        date: new Date("2025-08-05T11:00:00Z"),
        location: "Student Center",
        organizer: "Career Development Center",
        attendees: 350,
        capacity: 500,
        registrationRate: 70, // percentage
        status: "upcoming",
      },
    ],
    ongoingEvents: [
      {
        id: 5,
        name: "Summer Research Exhibition",
        startDate: new Date("2025-05-20T09:00:00Z"),
        endDate: new Date("2025-05-25T18:00:00Z"),
        location: "Science Complex",
        organizer: "Research Department",
        currentAttendees: 85,
        totalRegistered: 130,
        status: "ongoing",
      },
      {
        id: 6,
        name: "International Conference on AI",
        startDate: new Date("2025-05-22T08:30:00Z"),
        endDate: new Date("2025-05-24T17:00:00Z"),
        location: "Conference Center",
        organizer: "Computer Science Department",
        currentAttendees: 112,
        totalRegistered: 150,
        status: "ongoing",
      },
    ],
    recentUsers: [
      {
        id: "user_123",
        name: "John Smith",
        email: "john.smith@example.com",
        registeredEvents: 3,
        joinedDate: new Date("2025-05-01T14:30:00Z"),
      },
      {
        id: "user_124",
        name: "Emily Johnson",
        email: "emily.j@example.com",
        registeredEvents: 2,
        joinedDate: new Date("2025-05-05T09:15:00Z"),
      },
      {
        id: "user_125",
        name: "Michael Brown",
        email: "michael.b@example.com",
        registeredEvents: 1,
        joinedDate: new Date("2025-05-10T11:45:00Z"),
      },
      {
        id: "user_126",
        name: "Sarah Davis",
        email: "sarah.d@example.com",
        registeredEvents: 4,
        joinedDate: new Date("2025-05-12T16:20:00Z"),
      },
      {
        id: "user_127",
        name: "David Wilson",
        email: "david.w@example.com",
        registeredEvents: 2,
        joinedDate: new Date("2025-05-15T10:30:00Z"),
      },
    ],
    popularEvents: [
      { name: "Graduation Ceremony", registrations: 1000 },
      { name: "Annual University Fair", registrations: 500 },
      { name: "Career Fair 2025", registrations: 350 },
      { name: "Engineering Department Symposium", registrations: 120 },
      { name: "International Conference on AI", registrations: 150 },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Create Event
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`${activeTab === "overview" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`${activeTab === "events" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Events Management
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`${activeTab === "users" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            User Management
          </button>
        </nav>
      </div>

      {activeTab === "overview" && (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500">Total Events</div>
              <div className="text-3xl font-bold text-gray-800">{mockData.stats.totalEvents}</div>
              <div className="text-sm text-green-500">↑ 12% from last month</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500">Upcoming Events</div>
              <div className="text-3xl font-bold text-gray-800">{mockData.stats.upcomingEvents}</div>
              <div className="text-sm text-blue-500">Next event in 3 days</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500">Total Users</div>
              <div className="text-3xl font-bold text-gray-800">{mockData.stats.totalUsers}</div>
              <div className="text-sm text-green-500">↑ {Math.round(mockData.stats.newUsersThisMonth / mockData.stats.totalUsers * 100)}% this month</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500">Total Registrations</div>
              <div className="text-3xl font-bold text-gray-800">{mockData.stats.totalRegistrations}</div>
              <div className="text-sm text-green-500">Avg. attendance: {mockData.stats.averageAttendance}%</div>
            </div>
          </div>

          {/* Event Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {mockData.upcomingEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                    <div>
                      <h3 className="font-semibold text-gray-800">{event.name}</h3>
                      <div className="text-sm text-gray-500 space-x-4">
                        <span>{event.date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span>•</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {event.attendees}/{event.capacity} registered
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}
                <div className="p-4 text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    View All Events →
                  </button>
                </div>
              </div>
            </div>

            {/* Popular Events */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Most Popular Events</h2>
              </div>
              <div className="p-6">
                {mockData.popularEvents.map((event, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{event.name}</span>
                      <span className="text-sm text-gray-500">{event.registrations} registrations</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${Math.min(100, (event.registrations / 1000) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Recent Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Events</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockData.recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.joinedDate.toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.registeredEvents}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === "events" && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Events Management</h2>
          <p className="text-gray-500">This tab would contain a full events management interface with filtering, sorting, and CRUD operations.</p>
        </div>
      )}

      {activeTab === "users" && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">User Management</h2>
          <p className="text-gray-500">This tab would contain a full user management interface with filtering, sorting, and user operations.</p>
        </div>
      )}
    </div>
  );
}
