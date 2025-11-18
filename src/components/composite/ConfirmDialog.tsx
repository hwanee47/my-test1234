/*************************************************************
 * 컨펌다이얼로그 컴포넌트
 * - created by hwanee-k
 *************************************************************/
import { BottomSheet, Button } from '@/components';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface ConfirmDialogContextType {
  openConfirmDialog: (options: ConfirmDialogOptions) => void;
  closeConfirmDialog: () => void;
}

interface ConfirmDialogOptions {
  title: string;
  message: string | React.ReactNode;
  isCancel?: boolean;
  isAutoClose?: boolean;
  confirmText?: string;
  cancelText?: string;
  className?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string | React.ReactNode;
  isCancel?: boolean;
  isAutoClose?: boolean;
  confirmText?: string;
  cancelText?: string;
  className?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose: () => void;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextType | null>(null);

export const ConfirmDialog = ({
  isOpen,
  title,
  message,
  isCancel = false,
  isAutoClose = true,
  confirmText = '확인',
  cancelText = '닫기',
  className,
  onConfirm,
  onCancel,
  onClose,
}: ConfirmDialogProps) => {
  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={handleCancel}
      isHideHandle={true}
      className={twMerge(
        'bottomsheet-content',
        className,
        '[&>.bottomsheet-content]:px-0 [&>.bottomsheet-content]:pb-0',
      )}
    >
      <>
        {/* 타이틀 영역 */}
        <div className='relative py-2.5'>
          <h2 className='text-center font-medium text-[#000]'>{title}</h2>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            className='absolute top-2.5 right-4'
            onClick={handleCancel}
          >
            <path d='M15 5L5 15M15 15L5 5' stroke='#AAAAAA' strokeWidth='2' strokeLinecap='round' />
          </svg>
        </div>
        {/* 컨텐츠 영역 */}
        <div className='content-wrapper flex min-h-[84px] items-center justify-center px-5 pt-2 pb-5 font-semibold text-[#000]'>
          {message}
        </div>
        {/* 버튼 영역 */}
        <div className='button-wrapper flex gap-1 border-t border-[#E5E7EB] px-5 py-2 shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.06)]'>
          <Button
            onClick={() => {
              onConfirm?.();
              if (isAutoClose) {
                onClose();
              }
            }}
            className='flex-1 rounded-lg border-none bg-[#3F51B5] py-3 font-semibold text-white'
          >
            {confirmText}
          </Button>
          {isCancel && (
            <Button
              onClick={handleCancel}
              className='flex-1 rounded-lg border-none bg-[#F3F5F9] py-3 font-semibold text-[#8F94A5]'
            >
              {cancelText}
            </Button>
          )}
        </div>
      </>
    </BottomSheet>
  );
};

export const ConfirmDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState<string | React.ReactNode>('');
  const [isCancel, setIsCancel] = useState(false);
  const [isAutoClose, setIsAutoClose] = useState(true);
  const [confirmText, setConfirmText] = useState('확인');
  const [cancelText, setCancelText] = useState('닫기');
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);
  const [onCancel, setOnCancel] = useState<(() => void) | null>(null);
  const [className, setClassName] = useState('');

  const openConfirmDialog = useCallback((options: ConfirmDialogOptions) => {
    setTitle(options.title);
    setMessage(options.message);
    setIsCancel(options.isCancel ?? false);
    setConfirmText(options.confirmText ?? '확인');
    setCancelText(options.cancelText ?? '닫기');
    setOnConfirm(() => options.onConfirm);
    setOnCancel(() => options.onCancel);
    setClassName(options.className ?? '');
    setIsOpen(true);
  }, []);

  const closeConfirmDialog = useCallback(() => {
    setIsOpen(false);
    setTitle('');
    setMessage('');
    setIsCancel(false);
    setIsAutoClose(true);
    setConfirmText('확인');
    setCancelText('닫기');
    setOnConfirm(null);
    setOnCancel(null);
    setClassName('');
  }, []);

  const handleClose = useCallback(() => {
    closeConfirmDialog();
  }, [closeConfirmDialog]);

  return (
    <ConfirmDialogContext.Provider value={{ openConfirmDialog, closeConfirmDialog }}>
      {children}
      <ConfirmDialog
        isOpen={isOpen}
        title={title}
        message={message}
        isCancel={isCancel}
        isAutoClose={isAutoClose}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={onConfirm ?? undefined}
        onCancel={onCancel ?? undefined}
        onClose={handleClose}
        className={className}
      />
    </ConfirmDialogContext.Provider>
  );
};

export const useConfirmDialog = () => {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error('useConfirmDialog must be used within a ConfirmDialogProvider');
  }
  return context;
};
