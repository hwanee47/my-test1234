/*************************************************************
 * 체크박스 컴포넌트
 * - created by hwanee-k
 *************************************************************/
import { twMerge } from 'tailwind-merge';

interface CheckboxProps {
  id?: string; // 체크박스 아이디
  label?: React.ReactNode; // 체크박스 라벨
  labelPosition?: 'left' | 'right'; // 라벨 위치
  containerClassName?: string; // 컨테이너 스타일
  labelClassName?: string; // 라벨 스타일
  checkboxClassName?: string; // 체크박스 스타일
  checked?: boolean; // 체크박스 체크 여부
  onChange?: (checked: boolean) => void; // 체크박스 변경 이벤트
}

export default function Checkbox({
  id,
  label,
  labelPosition = 'right',
  checked = false,
  containerClassName,
  checkboxClassName,
  labelClassName,
  onChange,
}: CheckboxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <div className={twMerge('inline-flex items-center leading-none', checked ? '' : '', containerClassName)}>
      {label && labelPosition === 'left' && (
        <label
          className={twMerge(
            'ml-1 flex cursor-pointer items-center text-sm text-slate-600',
            checked ? '' : 'text-[#8F94A5]',
            labelClassName,
          )}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <label className='relative flex cursor-pointer items-center' htmlFor={id}>
        <input
          type='checkbox'
          className={twMerge(
            'peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#F3F5F9] bg-[#F3F5F9] transition-all checked:bg-[#3262FE]',
            checkboxClassName,
          )}
          id={id}
          checked={checked}
          onChange={handleChange}
        />
        <span className='checkbox-icon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white peer-checked:opacity-100'>
          <svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 12 9' fill='none'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M10.1353 0.320151L4.36266 6.09283L1.86218 3.59235C1.43532 3.16548 0.74702 3.16548 0.320151 3.59235C-0.106717 4.01921 -0.106717 4.70751 0.320151 5.13438L3.59235 8.40657C3.80491 8.61913 4.08448 8.72559 4.36406 8.72559C4.64364 8.72559 4.92286 8.61913 5.13577 8.40657L11.6802 1.86218C12.1067 1.43532 12.1067 0.74702 11.6802 0.320151C11.2533 -0.106717 10.5646 -0.106717 10.1381 0.320151H10.1353Z'
              fill='white'
            />
          </svg>
        </span>
      </label>
      {label && labelPosition === 'right' && (
        <label
          className={twMerge(
            'ml-1 flex cursor-pointer items-center text-sm text-slate-600',
            checked ? '' : 'text-[#8F94A5]',
            labelClassName,
          )}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
}
