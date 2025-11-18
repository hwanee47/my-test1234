/*************************************************************
 * 데이트피커 컴포넌트
 * - created by hwanee-k
 *************************************************************/
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import '@/components/styles/Datepicker.css';
import Button from '@/components/Button';

interface DatepickerProps {
  isOpen: boolean; // 달력 열기 여부
  value?: string | Date | null; // 선택된 날짜
  dateType?: 'year' | 'month' | 'day'; // 날짜 타입
  dateFormat?: string; // 날짜 포맷
  displayFormat?: string; // 표시할 날짜 포맷 (헤더에 표시되는 형식)
  minDate?: Date; // 최소 날짜
  maxDate?: Date; // 최대 날짜
  customClassName?: string; // 달력 클래스
  isPopup?: boolean; // 팝업 형태로 표시할지 여부
  onClose?: () => void; // 달력 닫기
  onDateSelect?: (date: string) => void; // 날짜 선택
}

export default function Datepicker({
  isOpen = false,
  value,
  dateType = 'day',
  dateFormat = dateType === 'year' ? 'yyyy' : dateType === 'month' ? 'yyyy-MM' : 'yyyy-MM-dd',
  displayFormat = 'yyyy년 MM월', // 기본 표시 형식
  minDate,
  maxDate,
  customClassName,
  isPopup = true,
  onClose,
  onDateSelect,
}: DatepickerProps) {
  const handleDateSelect = (date: Date) => {
    if (!onDateSelect) return;

    // dateType에 따라 날짜 조정
    let adjustedDate = new Date(date);

    if (dateType === 'year') {
      // 년도만 필요한 경우 월과 일을 1월 1일로 설정
      adjustedDate.setMonth(0);
      adjustedDate.setDate(1);
    } else if (dateType === 'month') {
      // 월까지만 필요한 경우 일을 1일로 설정
      adjustedDate.setDate(1);
    }

    const formattedDate = format(adjustedDate, dateFormat, { locale: ko });
    onDateSelect(formattedDate);
    onClose?.();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const renderDayContents = (day: number, date: Date) => {
    const isSelected = value && new Date(value).toDateString() === date.toDateString();
    return (
      <div className='relative flex h-full w-full items-center justify-center'>
        <span className='relative z-10'>{day}</span>
        {isSelected && <div className='absolute inset-[-5px] rounded-full bg-[#3F51B5]' />}
      </div>
    );
  };

  return (
    <>
      {isOpen &&
        (isPopup ? (
          <div
            className='bg-opacity-50 fixed inset-0 z-50 flex items-start justify-center bg-black'
            onClick={handleOverlayClick}
          >
            <div className='relative mt-[20vh] w-[300px]' onClick={(e) => e.stopPropagation()}>
              <DatePicker
                inline={true}
                closeOnScroll={true}
                locale={ko}
                selected={value as Date}
                dateFormat={dateFormat}
                showYearPicker={dateType === 'year'}
                showMonthYearPicker={dateType === 'month'}
                onChange={(date: Date | null) => {
                  if (date) handleDateSelect(date);
                }}
                renderDayContents={renderDayContents}
                renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                  <div className='mb-0 flex items-center justify-between py-1 [&>Button]:bg-white [&>Button]:text-gray-500'>
                    <Button onClick={decreaseMonth} className='h-8 w-8'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                        <path
                          d='M15 18L9 12L15 6'
                          stroke='#333333'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </Button>
                    <span className='text-base font-medium text-[#333]'>
                      {format(date, displayFormat, { locale: ko })}
                    </span>
                    <Button onClick={increaseMonth} className='h-8 w-8'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                        <path
                          d='M9 18L15 12L9 6'
                          stroke='#333333'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </Button>
                  </div>
                )}
                minDate={minDate}
                maxDate={maxDate}
                calendarClassName={customClassName}
              />
            </div>
          </div>
        ) : (
          <DatePicker
            inline={true}
            closeOnScroll={true}
            locale={ko}
            selected={value as Date}
            dateFormat={dateFormat}
            showYearPicker={dateType === 'year'}
            showMonthYearPicker={dateType === 'month'}
            onChange={(date: Date | null) => {
              if (date) handleDateSelect(date);
            }}
            renderDayContents={renderDayContents}
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
              <div className='mb-0 flex items-center justify-between py-1 [&>Button]:bg-white [&>Button]:text-gray-500'>
                <Button onClick={decreaseMonth} className='h-8 w-8'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M15 18L9 12L15 6'
                      stroke='#333333'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Button>
                <span className='text-base font-medium text-[#333]'>{format(date, displayFormat, { locale: ko })}</span>
                <Button onClick={increaseMonth} className='h-8 w-8'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M9 18L15 12L9 6'
                      stroke='#333333'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Button>
              </div>
            )}
            minDate={minDate}
            maxDate={maxDate}
            calendarClassName={customClassName}
          />
        ))}
    </>
  );
}
