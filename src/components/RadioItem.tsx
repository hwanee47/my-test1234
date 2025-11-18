/*************************************************************
 * 라디오 컴포넌트
 * - created by hwanee-k
 *************************************************************/
import { twMerge } from 'tailwind-merge';
import { useRadioGroup } from './RadioGroup';

interface RadioItemProps {
  value: string | number; // 값
  label: string; // 라벨
  className?: string; // 스타일
}

export default function RadioItem({ value, label, className }: RadioItemProps) {
  const { name, value: selectedValue, onChange } = useRadioGroup();

  return (
    <label className={twMerge('radio-item flex cursor-pointer items-center space-x-2', className)}>
      <input
        type='radio'
        name={name}
        value={value}
        checked={value === selectedValue}
        onChange={() => onChange(value)}
        className='h-4 w-4 text-blue-600 transition duration-150 ease-in-out'
      />
      <span className='w-full text-[#8F94A5]'>{label}</span>
    </label>
  );
}
