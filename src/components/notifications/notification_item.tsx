import React from 'react';
import { Bell, CheckCircle, AlertCircle, Gift } from 'lucide-react'; // Example icons

export interface Notification {
  id: string;
  type: 'indication' | 'payment' | 'reward' | 'system';
  title: string;
  message: string;
  timestamp: string; // Or Date object
  read: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void; // Optional action
  onDismiss?: (id: string) => void; // Add onDismiss prop
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'indication':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'payment':
        return <CheckCircle size={18} className="text-primary" />;
      case 'reward':
        return <Gift size={18} className="text-yellow-500" />;
      case 'system':
        return <AlertCircle size={18} className="text-orange-500" />;
      default:
        return <Bell size={18} className="text-text-secondary" />;
    }
  };

  return (
    <div
      className={`p-3 border-b border-border flex items-start space-x-3 ${notification.read ? 'opacity-60' : 'bg-card hover:bg-border/50'}`}
      onClick={() => onMarkAsRead && !notification.read && onMarkAsRead(notification.id)}
      role="button"
      tabIndex={0}
    >
      <div className="flex-shrink-0 pt-1">{getIcon()}</div>
      <div className="flex-grow">
        <p className={`font-semibold text-sm ${notification.read ? 'text-text-secondary' : 'text-white'}`}>{notification.title}</p>
        <p className={`text-xs ${notification.read ? 'text-text-secondary' : 'text-text-secondary'}`}>{notification.message}</p>
        <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
      </div>
      {!notification.read && (
        <div className="flex-shrink-0 pt-1">
          <span className="block w-2 h-2 bg-primary rounded-full" title="Não lida"></span>
        </div>
      )}
    </div>
  );
};

export default NotificationItem;

