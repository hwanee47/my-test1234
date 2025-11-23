'use client';

/*************************************************************
 * 셀렉트 컴포넌트
 * - created by hwanee-k, 2025-02-10
 *************************************************************/
import type React from 'react';
import { type InputHTMLAttributes, useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { type Control, useController } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import type { WheelPickerOption } from '@ncdai/react-wheel-picker';
import { WheelPicker, WheelPickerWrapper } from '@/components/custom/wheel-picker';
import '@/components/custom/wheel-picker/style.css';

interface SelectProps {
  name: string; // 컨트롤명
  options: {
    icon?: React.ReactNode; // 아이콘
    name: string; // 코드이름
    code: string; // 코드
  }[];
  className?: string; // 클래스명
  optionClassName?: string; // 옵션 클래스명
  selectedClassName?: string; // 선택된 옵션 클래스명
  placeholder?: string; // 플레이스홀더
  value?: string | number | boolean; // 선택된 옵션
  size?: number; // 옵션 표시할 갯수
  errors?: string[]; // 에러 메시지
  errorClassName?: string; // 에러 메시지 클래스명
  control?: Control<any>; // React-hook-form 컨트롤
  disabled?: boolean; // 비활성화 여부
  isInfinite?: boolean; // 무한 스크롤 여부
  title?: string; // 타이틀 (모달 타이틀, 없다면 placeholder 표시)
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // 변경 이벤트
}

const Select = forwardRef<{ openSelectComponent: () => void }, SelectProps>(function Select(
  {
    name,
    options = [],
    className,
    optionClassName,
    placeholder = '선택',
    value,
    size = 5,
    errors = [],
    errorClassName,
    control,
    disabled,
    isInfinite = true,
    title,
    onChange,
    ...props
  }: SelectProps,
  ref,
) {
  const initialSelectedOption = options.find((option) => option.code === (value ?? ''))?.name || null;
  const [selectedOption, setSelectedOption] = useState<string | null>(initialSelectedOption);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const isControlled = useRef(!!control).current;
  const { field } = isControlled ? useController({ name, control, defaultValue: value ?? '' }) : { field: null };
  const selectedOptionRef = useRef<HTMLDivElement>(null);
  const [pickerValue, setPickerValue] = useState<string | null>(initialSelectedOption);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(initialSelectedOption);

  // Select ON/OFF를 외부에서 컨트롤
  useImperativeHandle(ref, () => ({
    openSelectComponent: () => {
      setIsOpen(true);
    },
  }));

  // isOpen 상태가 변경될 때 picker 값 초기화
  useEffect(() => {
    if (!isOpen) {
      setPickerValue(value as string);
      setSelectedLabel(initialSelectedOption);
    }
  }, [isOpen, value, initialSelectedOption]);

  // 옵션 클릭 시 처리
  const handleOptionClick = (option: { name: string; code: string }) => {
    if (disabled) return;

    setSelectedOption(option.name);
    setIsOpen(false);

    if (isControlled) {
      field?.onChange(option.code);
    }
    if (onChange) {
      onChange({ target: { value: option.code } } as React.ChangeEvent<HTMLSelectElement>);
    }
  };

  // 초기 선택된 옵션 설정
  useEffect(() => {
    setSelectedOption(initialSelectedOption);
  }, [initialSelectedOption]);

  // 포커스 아웃 시 닫기 (기본 모드에서만 사용)
  const handleBlur = () => {
    // setIsOpen(false);
  };

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        // setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    // 스크롤 방지
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  // 바텀시트모드 열릴 때 선택된 옵션으로 스크롤
  // useEffect(() => {
  //   if (isOpen && selectedOption) {
  //     selectedOptionRef.current?.scrollIntoView({ block: 'center' });
  //   }
  // }, [isOpen, selectedOption]);

  // 일반모드 화살표 클릭시 닫히지 않아서 추가.
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handlePickerChange = (value: string) => {
    setPickerValue(value);
    const selectedOption = options.find((option) => option.code === value);
    if (selectedOption) {
      setSelectedLabel(selectedOption.name);
    }
  };

  const renderTriggerButton = () => (
    <div
      className={twMerge(
        'flex cursor-pointer items-center rounded-lg border border-[#E2E2E2] bg-white px-4 py-3',
        disabled && 'cursor-not-allowed bg-[#EFEFEF4D] text-gray-500',
        className,
      )}
      onClick={toggleDropdown}
    >
      <span
        className={`placeholder-wrapper font-medium ${selectedOption ? '' : 'text-[#8F94A5]'} truncate text-[#000]`}
      >
        {selectedOption ? selectedOption : placeholder}
      </span>

      <span className={`ml-auto translate-y-[1px] text-xl ${isOpen ? '' : ''}`}>
        <svg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7' fill='none'>
          <path
            d='M1 1L6.00081 5.58L11 1'
            stroke={selectedOption ? '#000' : '#8F94A5'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </span>
    </div>
  );

  const optionsArray = (options: { name: string; code: string }[]): WheelPickerOption[] => {
    if (options.length === 0) return [{ label: '', value: '' }];
    const optionsArray = options.map((option) => ({
      label: option.name,
      value: option.code as string,
    }));
    return optionsArray;
  };

  useEffect(() => {
    console.log('value :: ', value);
  }, [value]);

  const options2 = [
    {
      label: 'nextjs',
      value: 'nextjs',
    },
    {
      label: 'angular',
      value: 'angular',
    },
  ];

  const renderOptions = () => (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role='dialog'
        aria-modal='true'
        aria-label={placeholder}
        className={`fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className='max-h-[80vh] overflow-hidden rounded-t-2xl bg-white'>
          {/* Header */}
          <div className='relative flex items-center justify-center px-4 py-2.5'>
            <h2 className='text-base font-medium text-[#333]'>{title || placeholder}</h2>
            <span
              onClick={() => setIsOpen(false)}
              className='absolute right-4 rounded-full p-2 transition-colors hover:bg-gray-100'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                <path d='M15 5L5 15M15 15L5 5' stroke='#AAAAAA' strokeWidth='2' strokeLinecap='round' />
              </svg>
            </span>
          </div>

          {/* Picker */}
          <div className='max-h-[calc(80vh-60px)] overflow-y-auto'>
            <div className=''>
              <WheelPickerWrapper key={isOpen ? 'open' : 'closed'}>
                <WheelPicker
                  options={optionsArray(options)}
                  {...(value ? { value: value as string } : {})}
                  onValueChange={handlePickerChange}
                  visibleCount={16}
                  optionItemHeight={40}
                  classNames={{
                    optionItem: 'text-[#333] font-medium',
                    highlightItem: 'text-[#3F51B5] bg-[#EFF2FF] font-medium',
                  }}
                  infinite={isInfinite}
                />
              </WheelPickerWrapper>
            </div>
          </div>

          <div className='flex items-center justify-center gap-2 border-t-[1px] border-t-[rgba(0,0,0,0.06)] px-5 py-3'>
            <button
              className='w-full rounded-lg bg-[#3F51B5] py-3 text-white'
              onClick={() => {
                handleOptionClick({ name: selectedLabel as string, code: pickerValue as string });
              }}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className='flex w-full flex-col gap-2'>
      <div className='text-md relative w-full font-normal' onBlur={handleBlur} tabIndex={0}>
        {renderTriggerButton()}
        {renderOptions()}
      </div>

      {errors.map((error, index) => (
        <span key={index} className={twMerge('ml-1 text-sm font-medium text-red-500', errorClassName)}>
          {error}
        </span>
      ))}
    </div>
  );
});

export default Select;
