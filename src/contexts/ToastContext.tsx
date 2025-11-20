import Toast, { ToastType } from '@/components/Toast';
import { createContext, useContext, useState, ReactNode, useRef } from 'react';

interface ToastContextType {
  toast: { message: string; type: ToastType; isVisible: boolean; duration: number };
  setToast?: React.Dispatch<
    React.SetStateAction<{ message: string; type: ToastType; isVisible: boolean; duration: number }>
  >;
  showToast: (type: ToastType, message: string, duration?: number, className?: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Provider
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const DEFAULT_DURATION = 5000;
  const [toast, setToast] = useState({
    message: '',
    type: 'info' as ToastType,
    isVisible: false,
    duration: DEFAULT_DURATION,
    className: '',
  });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (type: ToastType = 'info', message: string, duration?: number, className?: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setToast({ message, type, isVisible: true, duration: duration || DEFAULT_DURATION, className: className || '' });

    timeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
      timeoutRef.current = null;
    }, duration || DEFAULT_DURATION);
  };

  return (
    <ToastContext.Provider value={{ showToast, toast }}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type as ToastType}
        isVisible={toast.isVisible}
        className={toast.className}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </ToastContext.Provider>
  );
};

// Hook
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
