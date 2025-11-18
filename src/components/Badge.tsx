/*************************************************************
 * 뱃지 컴포넌트
 * - created by hwanee-k
 *************************************************************/
import { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  title?: string; // 타이틀 텍스트
  containerClassName?: string; // 컴포넌트 스타일
  badgeClassName?: string; // 컴포넌트 스타일
  children?: React.ReactNode; // 자식 컴포넌트
  tooltipMessage?: string; // 툴팁 메시지
  tooltipPosition?: 'top' | 'right' | 'bottom' | 'left' | 'bottom-left' | 'bottom-right'; // 툴팁 표시 위치
  tooltipContainerClassName?: string; // 툴팁 컨테이너 스타일
}

export default function Badge({
  title = '',
  containerClassName = '',
  badgeClassName = '',
  children,
  tooltipMessage,
  tooltipPosition = 'top',
  tooltipContainerClassName = '',
}: BadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (badgeRef.current && !badgeRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getTooltipPositionClasses = () => {
    switch (tooltipPosition) {
      case 'top':
        return 'bottom-full left-[-4px] mb-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      case 'bottom':
        return 'top-full left-[-4px] mt-1.5';
      case 'bottom-left':
        return 'top-full right-[-8px] mt-1.5';
      case 'bottom-right':
        return 'top-full left-[-8px] mt-1.5';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
    }
  };

  const formatTooltipMessage = (message: string) => {
    return message.split('\\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < message.split('\\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div ref={badgeRef} className={twMerge('relative inline-flex', containerClassName)}>
      <span
        className={twMerge(
          'inline-flex cursor-pointer items-center justify-center rounded px-1 text-center text-sm text-white',
          badgeClassName,
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title ? title : children}
      </span>
      {tooltipMessage && (
        <div
          className={twMerge(
            'absolute rounded-[0.625rem] bg-[#2E3138] p-[0.625rem] text-sm break-words text-white transition-all duration-200',
            getTooltipPositionClasses(),
            isOpen ? 'visible opacity-100' : 'invisible opacity-0',
            tooltipContainerClassName,
          )}
        >
          {formatTooltipMessage(tooltipMessage)}
          <div
            className={twMerge(
              'absolute h-0 w-0',
              tooltipPosition === 'top' &&
                'bottom-[-6px] left-2.5 border-x-[5px] border-t-[8px] border-x-transparent border-t-[#2E3138]',
              tooltipPosition === 'right' &&
                'top-1/2 left-[-6px] -translate-y-1/2 border-y-[5px] border-r-[8px] border-y-transparent border-r-[#2E3138]',
              tooltipPosition === 'bottom' &&
                'top-[-6px] left-2.5 border-x-[5px] border-b-[8px] border-x-transparent border-b-[#2E3138]',
              tooltipPosition === 'bottom-left' &&
                'top-[-6px] right-3 border-x-[5px] border-b-[8px] border-x-transparent border-b-[#2E3138]',
              tooltipPosition === 'bottom-right' &&
                'top-[-6px] left-3 border-x-[5px] border-b-[8px] border-x-transparent border-b-[#2E3138]',
              tooltipPosition === 'left' &&
                'top-1/2 right-[-6px] -translate-y-1/2 border-y-[5px] border-l-[8px] border-y-transparent border-l-[#2E3138]',
            )}
          />
        </div>
      )}
    </div>
  );
}
