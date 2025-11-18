/*************************************************************
 * 프로그래스바 컴포넌트
 * - created by hwanee-k
 *************************************************************/
import { twMerge } from 'tailwind-merge';

interface ProgressBarProps {
  step: number;
  totalStep: number;
  className?: string;
}

export default function ProgressBar({ step, totalStep, className }: ProgressBarProps) {
  return (
    <div className={twMerge('w-full bg-white', className)}>
      <div className='progress-bar-inactive h-2 w-full rounded-full bg-gray-200'>
        <div
          className='progress-bar-active h-full rounded-full bg-blue-500 transition-all duration-300'
          style={{ width: `${(step / totalStep) * 100}%` }}
        />
      </div>
    </div>
  );
}
