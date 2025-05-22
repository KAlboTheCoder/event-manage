"use client";

export default function DashboardPage() {
  // Sample data - replace with real data from your backend
  const upcomingEvents = [
    {
      id: 1,
      name: "University Week",
      date: "June 1, 2025",
      location: "Main Campus",
      attendees: 500,
    },
    {
      id: 2,
      name: "Graduation Ceremony",
      date: "July 15, 2025",
      location: "University Auditorium",
      attendees: 1000,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Create Event
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500">Total Events</div>
          <div className="text-3xl font-bold text-gray-800">24</div>
          <div className="text-sm text-green-500">↑ 12% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500">Upcoming Events</div>
          <div className="text-3xl font-bold text-gray-800">8</div>
          <div className="text-sm text-blue-500">Next event in 3 days</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500">Total Attendees</div>
          <div className="text-3xl font-bold text-gray-800">1.5k</div>
          <div className="text-sm text-green-500">↑ 18% from last month</div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
              <div>
                <h3 className="font-semibold text-gray-800">{event.name}</h3>
                <div className="text-sm text-gray-500 space-x-4">
                  <span>{event.date}</span>
                  <span>•</span>
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {event.attendees} attendees
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
