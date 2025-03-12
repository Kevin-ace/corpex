import { createContext, useContext, useState, useCallback } from 'react';
import { Notification, NotificationSystem } from '../components/NotificationSystem';

interface NotificationContextType {
  showNotification: (message: string, type: Notification['type']) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((message: string, type: Notification['type']) => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, message, type }]);
  }, []);

  const handleClose = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <NotificationSystem notifications={notifications} onClose={handleClose} />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
} 