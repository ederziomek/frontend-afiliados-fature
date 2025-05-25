"use client"; // Needed for useState

import React, { useState } from 'react';
import NotificationItem, { Notification } from './notification_item';
import { Bell, X } from 'lucide-react';

// Placeholder data - replace with actual data fetching
const initialNotifications: Notification[] = [
  { id: 'n1', type: 'payment', title: 'Pagamento Recebido', message: 'Pagamento de R$ 50,00 (CPA) recebido!', timestamp: '2024-05-02 10:00', read: false }, // Alinhado com a interface
  { id: 'n2', type: 'indication', title: 'Indicação Validada', message: 'Nova indicação validada: ID 27292', timestamp: '2024-05-01 15:30', read: false }, // Alinhado com a interface
  { id: 'n3', type: 'system', title: 'Saque Disponível', message: 'Seu saque semanal via PIX está disponível.', timestamp: '2024-04-30 09:00', read: true }, // Alinhado com a interface
  { id: 'n4', type: 'reward', title: 'Recompensa Desbloqueada', message: 'Recompensa de Sequência Diária (3 dias) desbloqueada!', timestamp: '2024-04-29 08:00', read: true }, // Alinhado com a interface
];

interface NotificationPanelProps {
  className?: string;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const togglePanel = () => {
    setIsOpen(!isOpen);
    // Mark all as read when opening the panel (optional)
    if (!isOpen) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }
  };

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="relative">
      <button
        onClick={togglePanel}
        className="relative text-[rgb(18,201,185)] hover:text-[rgb(18,201,185)] p-2 rounded-full hover:bg-border"
        aria-label="Notificações"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-background"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-card rounded-lg shadow-lg border border-border z-50 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          <div className="flex justify-between items-center p-3 border-b border-border">
            <h4 className="font-semibold text-white">Notificações</h4>
            <button onClick={togglePanel} className="text-text-secondary hover:text-white">
              <X size={18} />
            </button>
          </div>
          <div className="divide-y divide-border">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onDismiss={() => dismissNotification(notification.id)}
                />
              ))
            ) : (
              <p className="text-sm text-text-secondary text-center p-4">Nenhuma notificação nova.</p>
            )}
          </div>
          {/* Optional: Add a "View All" link */}
          {/* <div className="p-2 text-center border-t border-border">
            <a href="#" className="text-sm text-primary hover:underline">Ver todas</a>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
