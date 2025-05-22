"use client";

import { api } from "~/trpc/react";
import { useState } from "react";

export default function UserDashboard() {
  const { data: events, isLoading: eventsLoading } = api.event.getAll.useQuery();
  const [activeTab, setActiveTab] = useState("upcoming");

  // Define event types for type safety
  type BaseEvent = {
    id: number;
    title: string;
    date: Date;
    location: string;
    status: string;
  };

  type UpcomingEvent = BaseEvent & {
    description: string;
  };

  type RegisteredEvent = BaseEvent & {
    registrationDate: Date;
  };

  type PastEvent = BaseEvent & {
    feedback: string;
  };

  // Mock data for user dashboard with proper typing
  const mockEvents: {
    upcoming: UpcomingEvent[];
    registered: RegisteredEvent[];
    past: PastEvent[];
  } = {
    upcoming: [
      {
        id: 1,
        title: "Annual University Fair",
        date: new Date("2025-06-15T10:00:00Z"),
        location: "Main Campus Grounds",
        status: "upcoming",
        description: "Join us for the annual university fair featuring all departments"
      },
      {
        id: 2,
        title: "Engineering Department Symposium",
        date: new Date("2025-07-10T09:00:00Z"),
        location: "Engineering Building, Room 101",
        status: "upcoming",
        description: "A showcase of the latest research from our engineering students"
      },
      {
        id: 3,
        title: "Career Fair 2025",
        date: new Date("2025-08-05T11:00:00Z"),
        location: "Student Center",
        status: "upcoming",
        description: "Connect with potential employers from various industries"
      }
    ],
    registered: [
      {
        id: 1,
        title: "Annual University Fair",
        date: new Date("2025-06-15T10:00:00Z"),
        location: "Main Campus Grounds",
        status: "upcoming",
        registrationDate: new Date("2025-05-01T14:30:00Z")
      },
      {
        id: 4,
        title: "Computer Science Workshop",
        date: new Date("2025-06-20T13:00:00Z"),
        location: "CS Building, Lab 204",
        status: "upcoming",
        registrationDate: new Date("2025-05-10T09:15:00Z")
      }
    ],
    past: [
      {
        id: 5,
        title: "Spring Orientation",
        date: new Date("2025-04-05T09:00:00Z"),
        location: "University Auditorium",
        status: "completed",
        feedback: "Attended"
      },
      {
        id: 6,
        title: "Student Club Fair",
        date: new Date("2025-03-15T10:00:00Z"),
        location: "Student Union",
        status: "completed",
        feedback: "Attended"
      }
    ]
  };

  if (eventsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Use mock data instead of API data for now
  const displayEvents = mockEvents[activeTab as keyof typeof mockEvents] || [];
  
  // Type guard functions to check event types
  const isUpcomingEvent = (event: UpcomingEvent | RegisteredEvent | PastEvent): event is UpcomingEvent => 
    'description' in event;
  
  const isRegisteredEvent = (event: UpcomingEvent | RegisteredEvent | PastEvent): event is RegisteredEvent => 
    'registrationDate' in event;
    
  const isPastEvent = (event: UpcomingEvent | RegisteredEvent | PastEvent): event is PastEvent => 
    'feedback' in event;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Events Dashboard</h1>
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500">Upcoming Events</div>
          <div className="text-3xl font-bold text-gray-800">{mockEvents.upcoming.length}</div>
          <div className="text-sm text-blue-500">Next event in {Math.floor(Math.random() * 7) + 1} days</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500">Registered Events</div>
          <div className="text-3xl font-bold text-gray-800">{mockEvents.registered.length}</div>
          <div className="text-sm text-green-500">Ready to attend</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500">Past Events</div>
          <div className="text-3xl font-bold text-gray-800">{mockEvents.past.length}</div>
          <div className="text-sm text-gray-500">Events attended</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`${activeTab === "upcoming" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab("registered")}
            className={`${activeTab === "registered" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            My Registrations
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`${activeTab === "past" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Past Events
          </button>
        </nav>
      </div>

      {/* Event List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="divide-y divide-gray-200">
          {displayEvents.length > 0 ? (
            displayEvents.map((event) => (
              <div key={event.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <h3 className="font-semibold text-gray-800">{event.title}</h3>
                  <div className="text-sm text-gray-500 space-x-4">
                    <span>{event.date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span>•</span>
                    <span>{event.location}</span>
                  </div>
                  {isUpcomingEvent(event) && (
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  )}
                  {isRegisteredEvent(event) && (
                    <p className="text-sm text-green-600 mt-1">Registered on: {event.registrationDate.toLocaleDateString()}</p>
                  )}
                  {isPastEvent(event) && (
                    <p className="text-sm text-gray-600 mt-1">Status: {event.feedback}</p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${event.status === 'upcoming' ? 'bg-green-100 text-green-800' : event.status === 'completed' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800 mt-2">
                    {activeTab === "upcoming" ? "Register →" : activeTab === "registered" ? "View Details →" : "View Certificate →"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No events found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
