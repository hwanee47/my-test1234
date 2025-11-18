/*************************************************************
 * 토글 컴포넌트
 * - created by hwanee-k
 * - updated with hamburger icon design
 *************************************************************/

import type React from 'react';
import { twMerge } from 'tailwind-merge';

interface ToggleProps {
  label?: string; // 라벨
  checked?: boolean; // 체크 여부
  disabled?: boolean; // 비활성화 여부
  placeholder?: string; // 플레이스홀더
  inputClassName?: string; // 인풋 클래스명
  labelClassName?: string; // 라벨 클래스명
  toggleIcon?: React.ReactNode; // 토글 아이콘
  onChange?: (checked: boolean) => void; // 변경 이벤트
}

export default function ToggleWithIcon({
  label,
  checked,
  disabled,
  onChange,
  placeholder,
  inputClassName,
  labelClassName,
  toggleIcon,
}: ToggleProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <label className='relative inline-flex cursor-pointer items-center'>
      <input
        type='checkbox'
        value=''
        className={twMerge('peer sr-only')}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <div
        className={twMerge(
          `relative flex w-14 items-center rounded-md transition-colors peer-checked:bg-blue-600 peer-focus:outline-none ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${checked ? 'bg-blue-600' : 'border-[#8F94A5 ] border-[1px] bg-white'}`,
          inputClassName,
        )}
      >
        {/* Toggle Icon */}
        <div
          className={twMerge(
            `absolute top-1/2 flex -translate-y-1/2 items-center justify-center transition-all duration-200 ${checked ? 'w-10 translate-x-[25px]' : 'translate-x-[3px]'}`,
          )}
        >
          {toggleIcon ? (
            toggleIcon
          ) : checked ? (
            <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'>
              <circle cx='7' cy='7' r='7' fill='white' />
            </svg>
          ) : (
            <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'>
              <circle cx='7' cy='7' r='7' fill='#8F94A5' />
            </svg>
          )}
        </div>

        {/* Text Label */}
        <span
          className={twMerge(
            `absolute pt-[1px] text-xs font-medium ${checked ? 'left-[8px] text-white' : 'right-2 text-[#8F94A5]'}`,
          )}
        >
          {placeholder && <span className='text-xs'>{placeholder}</span>}
        </span>
      </div>

      {label && (
        <span
          className={twMerge('ml-3 text-sm font-medium', disabled ? 'text-gray-400' : 'text-gray-900', labelClassName)}
        >
          {label}
        </span>
      )}
    </label>
  );
}
