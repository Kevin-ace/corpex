import { useState, useEffect } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

export interface Notification {
  id: string;
  message: string;
  type: AlertColor;
  duration?: number;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onClose: (id: string) => void;
}

export function NotificationSystem({ notifications, onClose }: NotificationSystemProps) {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (notifications.length > 0 && !currentNotification) {
      setCurrentNotification(notifications[0]);
    }
  }, [notifications, currentNotification]);

  const handleClose = (id: string) => {
    setCurrentNotification(null);
    onClose(id);
  };

  if (!currentNotification) return null;

  return (
    <Snackbar
      open={true}
      autoHideDuration={currentNotification.duration || 6000}
      onClose={() => handleClose(currentNotification.id)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={() => handleClose(currentNotification.id)}
        severity={currentNotification.type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {currentNotification.message}
      </Alert>
    </Snackbar>
  );
} 