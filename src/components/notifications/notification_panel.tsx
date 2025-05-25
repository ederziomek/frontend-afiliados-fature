"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import NotificationItem, { Notification } from './notification_item';
import { Bell, X } from 'lucide-react';

// Dados mockados - ordenados cronologicamente (mais recentes primeiro)
const initialNotifications: Notification[] = [
  { 
    id: 'n1', 
    type: 'payment', 
    title: 'Pagamento Recebido', 
    message: 'Pagamento de R$ 50,00 (CPA) recebido!', 
    timestamp: '2024-05-02 10:00', 
    read: false 
  },
  { 
    id: 'n2', 
    type: 'indication', 
    title: 'Indicação Validada', 
    message: 'Nova indicação validada: ID 27292', 
    timestamp: '2024-05-02 09:30', 
    read: false 
  },
  { 
    id: 'n3', 
    type: 'system', 
    title: 'Saque Disponível', 
    message: 'Seu saque semanal via PIX está disponível.', 
    timestamp: '2024-04-30 09:00', 
    read: true 
  },
  { 
    id: 'n4', 
    type: 'reward', 
    title: 'Recompensa Desbloqueada', 
    message: 'Recompensa de Sequência Diária (3 dias) desbloqueada!', 
    timestamp: '2024-04-29 08:00', 
    read: true 
  },
];

interface NotificationPanelProps {
  className?: string;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é dispositivo móvel
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Função para verificar se é mobile
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      
      // Verificar inicialmente
      checkIfMobile();
      
      // Adicionar listener para redimensionamento
      window.addEventListener('resize', checkIfMobile);
      
      // Limpar listener
      return () => window.removeEventListener('resize', checkIfMobile);
    }
  }, []);

  // Criar um elemento para o portal quando o componente montar
  useEffect(() => {
    // Verificar se estamos no navegador
    if (typeof document !== 'undefined') {
      // Verificar se já existe um container para o portal
      let container = document.getElementById('notification-portal');
      
      // Se não existir, criar um novo
      if (!container) {
        container = document.createElement('div');
        container.id = 'notification-portal';
        document.body.appendChild(container);
      }
      
      setPortalContainer(container);
      
      // Limpar quando o componente desmontar
      return () => {
        if (container && container.parentNode) {
          container.parentNode.removeChild(container);
        }
      };
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const togglePanel = () => {
    setIsOpen(!isOpen);
    
    // Forçar verificação de mobile ao abrir o painel
    if (!isOpen && typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 768);
    }
  };

  const handleNotificationClick = (id: string) => {
    // Aqui seria implementada a lógica de redirecionamento para a página específica
    console.log(`Redirecionando para detalhes da notificação: ${id}`);
    
    // Marcar como lida
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  // Ordenar notificações cronologicamente (mais recentes primeiro)
  const sortedNotifications = [...notifications].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Estilos inline para garantir que o overlay fique acima de tudo
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 99999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0
  };

  const panelStyle: React.CSSProperties = {
    width: isMobile ? '100%' : '350px',
    height: isMobile ? '100%' : 'auto',
    maxHeight: isMobile ? '100%' : 'calc(100vh - 120px)',
    backgroundColor: '#1e2029',
    borderRadius: isMobile ? 0 : '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    border: isMobile ? 'none' : '1px solid #2a2a3a',
    overflow: 'hidden',
    zIndex: 100000,
    display: 'flex',
    flexDirection: 'column',
    position: isMobile ? 'fixed' : 'relative',
    top: isMobile ? 0 : 'auto',
    left: isMobile ? 0 : 'auto',
    right: isMobile ? 0 : 'auto',
    bottom: isMobile ? 0 : 'auto'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    borderBottom: '1px solid #2a2a3a'
  };

  const contentStyle: React.CSSProperties = {
    overflowY: 'auto',
    flex: 1,
    padding: isMobile ? '16px 0' : 0
  };

  return (
    <div className="relative">
      <button
        onClick={togglePanel}
        className="relative text-[rgb(18,201,185)] hover:text-[rgb(18,201,185)] p-2"
        aria-label="Notificações"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#1e2029]"></span>
        )}
      </button>

      {isOpen && portalContainer && createPortal(
        <div 
          style={overlayStyle} 
          onClick={togglePanel}
          className="notification-overlay"
        >
          <div 
            style={panelStyle}
            onClick={(e) => e.stopPropagation()}
            className="notification-panel"
          >
            <div style={headerStyle}>
              <h4 className="font-semibold text-white text-xl">Notificações</h4>
              <button onClick={togglePanel} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div style={contentStyle}>
              {sortedNotifications.length > 0 ? (
                sortedNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={() => handleNotificationClick(notification.id)}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center p-4">Nenhuma notificação nova.</p>
              )}
            </div>
          </div>
        </div>,
        portalContainer
      )}
    </div>
  );
};

export default NotificationPanel;
