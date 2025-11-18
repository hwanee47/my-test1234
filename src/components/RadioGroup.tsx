/*************************************************************
 * 라디오 그룹 컴포넌트
 * - created by hwanee-k
 *************************************************************/

import { createContext, useContext, useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface RadioGroupContextType {
  name: string; // 이름
  value: string | number; // 값 (고유)
  onChange: (value: string | number) => void; // 변경 이벤트
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);

export const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('useRadioGroup must be used within a RadioGroup');
  }
  return context;
};

interface RadioGroupProps {
  name: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  children: React.ReactNode;
  className?: string;
  shouldUpdateValue?: boolean; // 추가: setValue 사용 여부 제어
}

export default function RadioGroup({
  name,
  value: controlledValue,
  defaultValue = '',
  onChange,
  children,
  className,
  shouldUpdateValue = true, // 기본값 true
}: RadioGroupProps) {
  const [value, setValue] = useState(controlledValue || defaultValue);

  // value prop이 변경될 때 내부 value도 동기화
  useEffect(() => {
    if (controlledValue !== undefined && controlledValue !== value) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const handleChange = (newValue: string | number) => {
    if (shouldUpdateValue) {
      setValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <RadioGroupContext.Provider value={{ name, value, onChange: handleChange }}>
      <div className={className}>{children}</div>
    </RadioGroupContext.Provider>
  );
}
