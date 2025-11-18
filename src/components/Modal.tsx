/*************************************************************
 * 모달 컴포넌트
 * - created by hwanee-k
 *************************************************************/
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { twMerge } from 'tailwind-merge';
interface ModalProps {
  isOpen: boolean; // 모달 열림 여부
  title?: string; // 모달 타이틀
  overlayClassName?: string; // 모달 오버레이 스타일
  containerClassName?: string; // 모달 컨테이너 스타일
  titleClassName?: string; // 모달 타이틀 스타일
  contentClassName?: string; // 모달 컨텐츠 스타일
  children: React.ReactNode; // 모달 자식 컴포넌트
  onClose: () => void;
}

export default function Modal({
  isOpen,
  title,
  titleClassName,
  overlayClassName,
  containerClassName,
  contentClassName,
  children,
  onClose,
}: ModalProps) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };
  return (
    <>
      {isOpen && (
        <div
          className={twMerge(
            'bg-opacity-50 fixed inset-0 z-50 flex flex-col items-center justify-center bg-black p-5',
            overlayClassName,
          )}
          onClick={handleOverlayClick}
        >
          <div className={twMerge('relative mx-auto w-auto min-w-72 rounded-md bg-white', containerClassName)}>
            {title && (
              <div className={twMerge('relative border-b border-slate-200 p-4 text-2xl font-semibold', titleClassName)}>
                <span>{title}</span>
                <FontAwesomeIcon
                  icon={faXmark}
                  className='x-mark absolute top-3 right-3 text-xl text-gray-400'
                  onClick={() => {
                    onClose();
                  }}
                />
              </div>
            )}
            <div className={twMerge('relative mx-auto w-auto rounded-lg bg-white p-6', contentClassName)}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
