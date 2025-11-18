/*************************************************************
 * 버튼 컴포넌트
 * - created by hwanee-k
 *************************************************************/
import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  children: React.ReactNode; // 자식 컴포넌트
  variant?: 'solid' | 'outline'; // 버튼 스타일
  className?: string; // 커스텀 스타일
}

export default function Button({
  children,
  variant = 'solid',
  className = '',
  disabled = false,
  ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type='button'
      className={twMerge(
        'bg-foreground text-background rounded-md border border-solid border-transparent whitespace-nowrap transition-colors',
        variant === 'outline' ? 'border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white' : '',
        disabled ? 'cursor-not-allowed' : '',
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
