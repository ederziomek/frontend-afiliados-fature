import React from 'react';
import { CheckCircle, AlertCircle, Gift } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'indication' | 'payment' | 'reward' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClick }) => {
  // Função para formatar a data no formato da imagem de referência
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'payment':
        return (
          <div className="w-12 h-12 rounded-full bg-green-900 flex items-center justify-center">
            <CheckCircle size={24} className="text-green-500" />
          </div>
        );
      case 'indication':
        return (
          <div className="w-12 h-12 rounded-full bg-green-900 flex items-center justify-center">
            <CheckCircle size={24} className="text-green-500" />
          </div>
        );
      case 'system':
        return (
          <div className="w-12 h-12 rounded-full bg-amber-900 flex items-center justify-center">
            <AlertCircle size={24} className="text-amber-500" />
          </div>
        );
      case 'reward':
        return (
          <div className="w-12 h-12 rounded-full bg-cyan-900 flex items-center justify-center">
            <Gift size={24} className="text-cyan-500" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
            <AlertCircle size={24} className="text-gray-500" />
          </div>
        );
    }
  };

  return (
    <div
      className={`p-4 border-b border-gray-800 flex items-start space-x-3 cursor-pointer hover:bg-gray-800/50 ${notification.read ? 'bg-transparent' : 'bg-primary/5'}`}
      onClick={onClick}
    >
      <div className="flex-shrink-0">{getIcon()}</div>
      <div className="flex-grow">
        <p className={`font-semibold text-base ${notification.read ? 'text-gray-300' : 'text-white'}`}>{notification.title}</p>
        <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-400'}`}>{notification.message}</p>
        <p className="text-gray-500 text-sm mt-1">{formatDate(notification.timestamp)}</p>
      </div>
      {!notification.read && (
        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
      )}
    </div>
  );
};

export default NotificationItem;
