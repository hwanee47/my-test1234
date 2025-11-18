/*************************************************************
 * 토스트 컴포넌트
 * - created by hwanee-k
 *************************************************************/
import { twMerge } from 'tailwind-merge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faInfoCircle,
  faExclamationTriangle,
  faTimesCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'base';

interface ToastProps {
  message: string; // 토스트 메세지
  type: ToastType; // 토스트 타입
  isVisible: boolean; // 토스트 표기 여부
  className?: string; // 토스트 클래스명
  onClose: () => void; // 토스트 닫기 함수
}

// style
const toastConfig = {
  success: { icon: faCheckCircle, bgColor: 'bg-green-500', textColor: 'text-green-50' },
  info: { icon: faInfoCircle, bgColor: 'bg-blue-500', textColor: 'text-blue-50' },
  warning: { icon: faExclamationTriangle, bgColor: 'bg-yellow-500', textColor: 'text-yellow-50' },
  error: { icon: faTimesCircle, bgColor: 'bg-red-500', textColor: 'text-red-50' },
  base: { icon: null, bgColor: 'bg-[rgba(0,0,0,0.70)]', textColor: 'text-white' },
};

export default function Toast({ message, type, isVisible = false, className, onClose }: ToastProps) {
  const { icon, bgColor, textColor } = toastConfig[type];

  return (
    <div
      className={twMerge(
        `fixed right-4 bottom-4 left-4 ${bgColor} ${textColor} transform rounded-lg px-4 py-1 shadow-lg transition-all duration-300 ease-in-out ${isVisible ? 'z-50 translate-y-0 opacity-100' : 'z-[-50] translate-y-2 opacity-0'} flex items-center justify-between`,
        className,
      )}
      role='alert'
      aria-live='assertive'
    >
      <div className='flex items-center'>
        {icon && <FontAwesomeIcon icon={icon} className='mr-2 h-5 w-5' />}
        <span className='text-sm font-medium whitespace-pre-line'>{message}</span>
      </div>
      <button
        onClick={onClose}
        className='hover:bg-opacity-20 rounded-full p-1 transition-colors duration-200 hover:bg-white'
        aria-label='Close'
      >
        <FontAwesomeIcon icon={faTimes} className='h-4 w-4' />
      </button>
    </div>
  );
}
