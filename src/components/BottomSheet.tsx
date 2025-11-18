/*************************************************************
 * 바텀 시트 컴포넌트
 * - created by hwanee-k
 *************************************************************/
import { twMerge } from 'tailwind-merge';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

interface BottomSheetProps {
  isOpen: boolean; // 바텀 시트 열림 여부
  isHideHandle?: boolean; // 핸들 숨김 여부
  className?: string; // 바텀 시트 스타일
  wrapperClassName?: string; // 바텀 시트 래퍼 스타일
  children: React.ReactNode; // 바텀 시트 자식 컴포넌트
  onClose: () => void; // 바텀 시트 닫기 함수
}

export default function BottomSheet({
  isOpen,
  onClose,
  className,
  children,
  isHideHandle = false,
  wrapperClassName,
}: BottomSheetProps) {
  const [dragPosition, setDragPosition] = useState(0);
  const startY = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      setDragPosition(0);
    }
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (handleRef.current && handleRef.current.contains(e.target as Node)) {
      isDraggingRef.current = true;
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    if (diff > 0) {
      setDragPosition(diff);
    }
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;

    if (dragPosition > 100) {
      onClose();
    }
    setDragPosition(0);
    isDraggingRef.current = false;
  };

  return (
    <>
      {isOpen && (
        <div className={wrapperClassName}>
          {/* Backdrop */}
          <div onClick={onClose} className='bottomsheet-overlay fixed inset-0 z-50 bg-black opacity-50' />

          {/* Bottom Sheet */}
          <div
            ref={sheetRef}
            className={twMerge(
              'fixed right-0 bottom-0 left-0 z-50 max-h-[90vh] overflow-hidden rounded-t-[20px] bg-white shadow-xl transition-transform duration-300',
              className,
            )}
            style={{
              transform: `translateY(${dragPosition}px)`,
              transition: dragPosition ? 'none' : 'transform 0.3s ease-out',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Handle */}
            {!isHideHandle && (
              <div ref={handleRef} className='mx-auto w-full cursor-grab pt-2 pb-6 active:cursor-grabbing'>
                <div className='mx-auto mt-3 h-1 w-12 rounded-full bg-gray-300' />
              </div>
            )}
            <div className='bottomsheet-content px-3 pb-6'>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
