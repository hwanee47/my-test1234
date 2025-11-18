/*************************************************************
 * 아바타 컴포넌트
 * - created by hwanee-k
 *************************************************************/
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface AvatarProps {
  src: string; // 이미지 주소
  alt?: string; // 이미지 설명
  className?: string; // 컴포넌트 스타일
  tooltipContent?: string; // 툴팁 내용
  tooltipClassName?: string; // 툴팁 스타일
  tooltipPosition?: 'top' | 'bottom' | 'right' | 'left'; // 툴팁 위치
  children?: React.ReactNode; // 자식 컴포넌트
}

export default function Avatar({
  src,
  alt = 'avatar',
  className = '',
  tooltipContent = '',
  tooltipClassName = '',
  tooltipPosition = 'top',
  children,
}: AvatarProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const tooltipPositionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  };

  return (
    <div className='relative inline-block'>
      <img
        src={src}
        alt={alt}
        className={twMerge('h-12 w-12 rounded-full object-cover object-center', className)}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      />
      {isTooltipVisible && tooltipContent && (
        <div
          className={twMerge(
            'absolute rounded bg-gray-700 px-2 py-1 text-xs whitespace-nowrap text-white',
            tooltipClassName,
            tooltipPositionClasses[tooltipPosition],
          )}
        >
          {tooltipContent}
        </div>
      )}
      {children}
    </div>
  );
}
