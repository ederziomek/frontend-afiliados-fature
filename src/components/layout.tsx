import React from 'react';
import Sidebar from './sidebar';
import NotificationPanel from './notifications/notification_panel'; // Import NotificationPanel

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-background text-text">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar Header */}
        <header className="bg-card shadow-md p-4 flex justify-between items-center flex-shrink-0 z-10 border-b border-border">
          {/* Placeholder for breadcrumbs or page title if needed */}
          <div>
             {/* Mobile menu button is handled inside Sidebar now */}
          </div>
          <div className="flex items-center space-x-4">
            {/* Saldo */}
            <div className="text-sm">
              <span className="text-white">Saldo:</span>{" "}
              <span className="text-[rgb(18,201,185)] font-semibold">R$ 50,30</span>
            </div>
            {/* Notification Panel */}
            <NotificationPanel />
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
