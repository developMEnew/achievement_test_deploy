'use client';

import { Home, Eye, ListChecks, Calendar } from "lucide-react";
import { useState } from "react";
import { HomeTab } from "./components/home-tab";
import { ViewTab } from "./components/view-tab";
import { ManageTab } from "./components/manage-tab";
import { ProfileTab } from "./components/profile-tab";

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const UserTab = () => <div className="p-4">User Content</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'view' && <ViewTab />}
        {activeTab === 'manage' && <ManageTab />}
        {activeTab === 'calendar' && <ProfileTab />}
      </main>

      <nav className="fixed bottom-0 w-full border-t bg-white">
        <div className="grid grid-cols-4 h-16">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'view', icon: Eye, label: 'View' },
            { id: 'manage', icon: ListChecks, label: 'Manage' },
            { id: 'calendar', icon: Calendar, label: 'Calendar' }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center justify-center space-y-1 ${
                activeTab === id ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}