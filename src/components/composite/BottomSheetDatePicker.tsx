/*************************************************************
 * 바텀시트데이트피커 컴포넌트
 * - created by hwanee-k
 *************************************************************/
import DateUtils from '@/libs/client/dateUtils';
import { BottomSheet, Button, Datepicker } from '@/components';
import { useState, useEffect } from 'react';

interface BottomSheetDatePickerProps {
  title: string; // 타이틀
  value?: string; // 값
  isOpen: boolean; // 모달 열림 여부
  format?: string; // 포맷
  onClose: () => void; // 닫기 이벤트
  onComplete?: (date: string) => void; // 완료 이벤트
}

export default function BottomSheetDatePicker({
  title,
  value,
  isOpen,
  format,
  onClose,
  onComplete,
}: BottomSheetDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    DateUtils.formatDate(value || DateUtils.getToday(), 'YYYY-MM-DD'),
  );

  useEffect(() => {
    if (value) {
      setSelectedDate(DateUtils.formatDate(value, 'YYYY-MM-DD'));
    }
  }, [value]);

  const handleComplete = () => {
    onComplete?.(DateUtils.formatDate(new Date(selectedDate), format || 'YYYY-MM-DD'));
    onClose();
  };

  const handleClose = () => {
    // 닫을 때는 원래 값으로 되돌리기
    if (value) {
      setSelectedDate(DateUtils.formatDate(value, 'YYYY-MM-DD'));
    }
    onClose();
  };

  return (
    <BottomSheet
      className='z-[51] min-h-[55vh] [&>.bottomsheet-content]:p-0'
      wrapperClassName='[&>.bottomsheet-overlay]:z-[51]'
      isOpen={isOpen}
      isHideHandle={true}
      onClose={handleClose}
    >
      {/* Header */}
      <div className='relative flex items-center justify-center px-4 py-2.5'>
        <h2 className='text-base font-medium text-[#000]'>{title}</h2>
        <span onClick={handleClose} className='absolute right-3 rounded-full transition-colors hover:bg-gray-100'>
          <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <path d='M15 5L5 15M15 15L5 5' stroke='#AAAAAA' strokeWidth='2' strokeLinecap='round' />
          </svg>
        </span>
      </div>
      <Datepicker
        isOpen={true}
        isPopup={false}
        onDateSelect={(date) => {
          setSelectedDate(date);
        }}
        value={selectedDate}
        customClassName='px-6 py-0 !border-none'
      />
      <div className='bg-white shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.06)]'>
        <div className='px-5 py-2' onClick={handleComplete}>
          <Button className='w-full border-none bg-[#3F51B5] py-3 font-semibold text-white'>확인</Button>
        </div>
      </div>
    </BottomSheet>
  );
}
