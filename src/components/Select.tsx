/*************************************************************
 * 셀렉트 컴포넌트
 * - created by hwanee-k
 *************************************************************/
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type React from 'react';
import { type InputHTMLAttributes, useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { type Control, useController } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type selectMode = 'default' | 'bottom-sheet';

interface SelectProps {
  name: string; // 컨트롤명
  options: {
    icon?: React.ReactNode; // 아이콘
    name: string; // 코드이름
    code: string; // 코드
  }[];
  mode?: selectMode; // 모드 (기본 | 바텀시트)
  className?: string; // 클래스명
  optionClassName?: string; // 옵션 클래스명
  optionWrapperClassName?: string; // 옵션 래퍼 클래스명
  selectedClassName?: string; // 선택된 옵션 클래스명
  placeholder?: string; // 플레이스홀더
  value?: string | number | boolean; // 선택된 옵션
  size?: number; // 옵션 표시할 갯수
  errors?: string[]; // 에러 메시지
  errorClassName?: string; // 에러 메시지 클래스명
  control?: Control<any>; // React-hook-form 컨트롤
  disabled?: boolean; // 비활성화 여부
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // 변경 이벤트
}

const Select = forwardRef<{ openSelectComponent: () => void }, SelectProps>(function Select(
  {
    name,
    options = [],
    mode = 'default',
    className,
    optionClassName,
    optionWrapperClassName,
    selectedClassName = mode === 'default' ? 'bg-[#3262FE] text-white' : 'bg-zinc-100',
    placeholder = '선택',
    value,
    size = 5,
    errors = [],
    errorClassName,
    control,
    disabled,
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

  // Select ON/OFF를 외부에서 컨트롤
  useImperativeHandle(ref, () => ({
    openSelectComponent: () => {
      setIsOpen(true);
    },
  }));

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
    if (mode === 'default') {
      setIsOpen(false);
    }
  };

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mode === 'bottom-sheet' && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen && mode === 'bottom-sheet') {
      document.addEventListener('mousedown', handleClickOutside);
      // 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, mode]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mode === 'bottom-sheet') {
        setIsOpen(false);
      }
    };

    if (isOpen && mode === 'bottom-sheet') {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, mode]);

  // 바텀시트모드 열릴 때 선택된 옵션으로 스크롤
  useEffect(() => {
    if (isOpen && mode === 'bottom-sheet' && selectedOption) {
      selectedOptionRef.current?.scrollIntoView({ block: 'center' });
    }
  }, [isOpen, mode, selectedOption]);

  // 일반모드 화살표 클릭시 닫히지 않아서 추가.
  const toggleDropdown = () => {
    if (!disabled && mode === 'default') {
      setIsOpen((prev) => !prev);
    } else {
      setIsOpen(true);
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
      <span className={`font-normal ${selectedOption ? '' : 'text-[#AFAFAF]'} truncate`}>
        {selectedOption ? selectedOption : placeholder}
      </span>

      <span
        className={`svg-wrapper ml-auto translate-y-[1px] text-xl ${isOpen && mode === 'default' ? 'translate-y-[-3px] rotate-180' : ''}`}
      >
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
          <path
            d='M13.8291 6.40073L8.11279 12.0064C8.09469 12.0213 8.07466 12.0337 8.05324 12.0433L8.02205 12.066C7.95264 12.0923 7.87597 12.0923 7.80656 12.066L7.77537 12.0433C7.75395 12.0337 7.73393 12.0213 7.71582 12.0064L1.99954 6.40073C1.88758 6.29111 1.88567 6.11148 1.99529 5.99951C2.10491 5.88755 2.28454 5.88564 2.39651 5.99526L7.91431 11.4053L13.4321 5.99526C13.5441 5.88564 13.7237 5.88755 13.8333 5.99951C13.9429 6.11148 13.941 6.29111 13.8291 6.40073Z'
            fill={disabled ? '#AFAFAF' : '#3262FE'}
            stroke={disabled ? '#AFAFAF' : '#3262FE'}
            strokeWidth='1.2'
          />
        </svg>
      </span>
    </div>
  );

  const renderOptions = () =>
    mode === 'default' ? (
      <ul
        className={twMerge(
          `absolute top-[110%] z-50 w-full overflow-y-auto rounded-md border bg-white p-2 max-h-[${size * 40}px] [&>li]:flex [&>li]:cursor-pointer [&>li]:items-center [&>li]:gap-2 [&>li]:rounded-md [&>li]:p-2 [&>li:hover]:bg-gray-100 ${isOpen ? '' : 'hidden'}`,
          optionWrapperClassName,
        )}
        style={{ maxHeight: `${size * 50}px` }}
      >
        {options?.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionClick(option)}
            className={twMerge(
              'mt-1 px-4 py-1 hover:bg-gray-100',
              optionClassName,
              selectedOption === option.name ? selectedClassName : '',
            )}
          >
            {option.icon}
            {option.name}
          </li>
        ))}
      </ul>
    ) : (
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
            <div className='flex items-center justify-between border-b px-4 py-3'>
              <h2 className='text-base font-medium'>{placeholder}</h2>
              <span onClick={() => setIsOpen(false)} className='rounded-full p-2 transition-colors hover:bg-gray-100'>
                <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </span>
            </div>

            {/* Options */}
            <div className='max-h-[calc(80vh-60px)] overflow-y-auto'>
              <div className='p-2 pb-8'>
                {options?.map((option, index) => (
                  <div
                    key={index}
                    ref={selectedOption === option.name ? selectedOptionRef : null}
                    onClick={() => handleOptionClick(option)}
                    className={twMerge(
                      'flex w-full items-center justify-between px-4 py-3 text-base font-normal',
                      'rounded-md transition-all active:scale-[0.98]',
                      optionClassName,
                      selectedOption === option.name ? selectedClassName : '',
                    )}
                  >
                    <span className='flex items-center gap-2'>
                      {option.icon}
                      {option.name}
                    </span>
                    {selectedOption === option.name && (
                      <FontAwesomeIcon icon={faCheck} className='h-5 w-5 text-[#3262FE]' />
                    )}
                  </div>
                ))}
              </div>
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
