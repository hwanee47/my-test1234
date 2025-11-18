/*************************************************************
 * 토글 컴포넌트
 * - created by hwanee-k
 *************************************************************/
import { twMerge } from 'tailwind-merge';

interface ToggleProps {
  label?: string; // 라벨
  checked?: boolean; // 체크 여부
  disabled?: boolean; // 비활성화 여부
  placeholder?: string; // 플레이스홀더
  inputClassName?: string; // 인풋 클래스명
  labelClassName?: string; // 라벨 클래스명
  onChange?: (checked: boolean) => void; // 변경 이벤트
}

export default function Toggle({
  label,
  checked,
  disabled,
  onChange,
  placeholder,
  inputClassName,
  labelClassName,
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
          `peer h-6 ${placeholder ? 'min-w-11 text-white' : 'w-11'} rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:right-[-2px] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800`,
          inputClassName,
        )}
      >
        {placeholder}
      </div>
      <span
        className={twMerge('ml-3 text-sm font-medium', disabled ? 'text-gray-400' : 'text-gray-900', labelClassName)}
      >
        {label}
      </span>
    </label>
  );
}
