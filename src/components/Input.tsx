/*************************************************************
 * 인풋 컴포넌트
 * - created by hwanee-k
 *************************************************************/
import { forwardRef, InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { REGEX_NOT_NUMBER } from '@/libs/constants/regex';

interface InputProps {
  name: string; // 인풋 이름
  type?: string; // 인풋 타입
  maxLength?: number; // 최대 입력 길이
  errors?: string[]; // 에러 메시지
  className?: string; // 컴포넌트 스타일
  wrapperClassName?: string;
  errorClassName?: string; // 에러 메시지 스타일
  control?: Control<any>; // React-hook-form 컨트롤
  value?: string; // 기본값
  leftElement?: React.ReactNode; // 좌측 요소
  rightElement?: React.ReactNode; // 우측 요소
  leftElementClassName?: string; // 좌측 요소 스타일
  rightElementClassName?: string; // 우측 요소 스타일
}

// react-hook-form을 위해 forwardRef 사용
const Input = forwardRef<HTMLInputElement, InputProps & InputHTMLAttributes<HTMLInputElement>>(
  (
    {
      name,
      type = 'text',
      maxLength = 99999999999,
      errors = [],
      className,
      wrapperClassName,
      errorClassName,
      control,
      value,
      disabled = false,
      onChange,
      leftElement,
      rightElement,
      leftElementClassName,
      rightElementClassName,
      ...rest
    },
    ref,
  ) => {
    const { field } = control ? useController({ name, control, defaultValue: value || '' }) : { field: null };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === 'custom-only-number') {
        const numericValue = e.target.value.replace(REGEX_NOT_NUMBER, '');
        if (numericValue.length <= maxLength) {
          e.target.value = numericValue;
          field?.onChange(e);
          onChange?.(e);
        }
      } else {
        field?.onChange(e);
        onChange?.(e);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    };

    return (
      <div className={twMerge('flex flex-col', wrapperClassName)}>
        <div className='relative flex items-center'>
          {leftElement && (
            <div className={twMerge('absolute left-3 flex items-center', leftElementClassName)}>{leftElement}</div>
          )}
          <input
            ref={ref}
            name={name}
            type={type}
            className={twMerge(
              'w-full rounded-lg border border-[#E0E0E0] px-4 py-3 text-base font-normal text-[#000] outline-none placeholder:text-base placeholder:font-normal placeholder:text-[#AFAFAF] focus:border-gray-400',
              `${disabled ? 'text-gray-500' : ''}`,
              leftElement ? 'pl-10' : '',
              rightElement ? 'pr-10' : '',
              className,
            )}
            maxLength={maxLength}
            value={field?.value || value}
            disabled={disabled}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            {...rest}
          />
          {rightElement && (
            <div className={twMerge('absolute right-3 flex items-center', rightElementClassName)}>{rightElement}</div>
          )}
        </div>

        <div>
          {errors.map((error, index) => (
            <p key={index} className={twMerge('ml-1 text-sm font-medium text-red-500', errorClassName)}>
              {error}
            </p>
          ))}
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
