import type { ActivityComponentType } from '@stackflow/react';
import TuneIcon from '@mui/icons-material/Tune';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useFlow } from '@/stackManager';
import Layout from '@/pages/Layout';
import { Card, Badge, BottomSheet, Button, BottomSheetDatePicker, Select } from '@/components';
import { useToast } from '@/contexts';
import WebUtils from '@/libs/client/webUtils';
import { useState } from 'react';
import DateUtils from '@/libs/client/dateUtils';

const InboundStatusActivity: ActivityComponentType = () => {
  const { showToast } = useToast();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
  const [isEndCalendarOpen, setIsEndCalendarOpen] = useState(false);

  const default_options = [
    { name: '발주입고', code: 'order' },
    { name: '현장입고', code: 'site' },
  ];

  const data = [
    {
      id: 'IP202511070004',
      date: '2025-11-07',
      type: '발주입고',
      expectedQuantity: 0,
      inboundQuantity: 288,
      ownerCompany: '엠엔지컴퍼니',
      orderCompany: '키스뉴욕',
    },
    {
      id: 'IP202511070005',
      date: '2025-11-07',
      type: '발주입고',
      expectedQuantity: 3052,
      inboundQuantity: 3052,
      ownerCompany: '엠엔지컴퍼니',
      orderCompany: '키스뉴욕',
    },
    {
      id: 'IP202511110001',
      date: '2025-11-11',
      type: '현장입고',
      expectedQuantity: 617,
      inboundQuantity: 41,
      ownerCompany: '엠엔지컴퍼니',
      orderCompany: '대화씨엔에프',
    },
    {
      id: 'IP202511070005',
      date: '2025-11-07',
      type: '발주입고',
      expectedQuantity: 10,
      inboundQuantity: 0,
      ownerCompany: '엠엔지컴퍼니',
      orderCompany: '키스뉴욕',
    },
    {
      id: 'IP202511110001',
      date: '2025-11-11',
      type: '현장입고',
      expectedQuantity: 3052,
      inboundQuantity: 3052,
      ownerCompany: '엠엔지컴퍼니',
      orderCompany: '대화씨엔에프',
    },
    {
      id: 'IP202511070005',
      date: '2025-11-07',
      type: '발주입고',
      expectedQuantity: 100,
      inboundQuantity: 0,
      ownerCompany: '엠엔지컴퍼니',
      orderCompany: '키스뉴욕',
    },
    {
      id: 'IP202511110001',
      date: '2025-11-11',
      type: '현장입고',
      expectedQuantity: 13052,
      inboundQuantity: 13052,
      ownerCompany: '엠엔지컴퍼니',
      orderCompany: '대화씨엔에프',
    },
    {
      id: 'IP202511070005',
      date: '2025-11-07',
      type: '발주입고',
      expectedQuantity: 3052,
      inboundQuantity: 3052,
      ownerCompany: '엠엔지컴퍼니',
      orderCompany: '키스뉴욕',
    },
    {
      id: 'IP202511110001',
      date: '2025-11-11',
      type: '현장입고',
      expectedQuantity: 3052,
      inboundQuantity: 3052,
      ownerCompany: '엠엔지컴퍼니',
      orderCompany: '대화씨엔에프',
    },
  ];

  const renderRight = () => {
    return <TuneIcon onClick={() => setIsBottomSheetOpen(true)} />;
  };

  return (
    <Layout
      appBar={{ title: '입고 현황', renderRight: renderRight }}
      backgroundColor='#F8F9FA'
      onRefresh={() => {
        console.log('refresh');
      }}
    >
      <div className='flex flex-col gap-2 px-2 py-3'>
        {data.map((item, index) => (
          <div key={index}>
            <Card className='p-0'>
              <div className='flex items-center justify-between px-4 py-2'>
                <div className='flex items-center gap-1.5 text-xs text-[#565D6D]'>
                  <span>{item.id}</span>
                  <ContentCopyIcon
                    style={{ fontSize: 12 }}
                    onClick={() => {
                      WebUtils.copyToClipboard(item.id);
                      showToast('base', '복사되었습니다.');
                    }}
                  />
                </div>
                <div className='flex items-center gap-1.5 text-xs text-[#565D6D]'>
                  <span>{item.date}</span>
                  <Badge
                    title={item.type}
                    badgeClassName={`bg-[#F3F4F6] text-[10px] text-[#323743] py-0.5 px-2 rounded-full ${
                      item.type === '발주입고' ? 'bg-[#F3F4F6]' : 'bg-[#DEE1E6]'
                    }`}
                  />
                </div>
              </div>
              <div className='h-px flex-1 bg-[#F3F4F6]' />
              <div className='flex items-center justify-between px-4 py-2'>
                <div className='flex flex-col gap-1'>
                  <span className='text-sm font-bold text-[#171A1F]'>{item.ownerCompany}</span>
                  <span className='text-sm font-semibold text-[#9095A1]'>{item.orderCompany}</span>
                </div>
                <div className='flex flex-col gap-1 pr-1'>
                  <div className='flex items-center justify-between gap-3.5 text-xs text-[#9095A1]'>
                    <div className='flex min-w-[58px] flex-col items-center justify-between'>
                      <div className='text-right'>예정수량</div>
                      <div className='text-lg font-bold text-[#323743]'>{item.expectedQuantity.toLocaleString()}</div>
                    </div>
                    <div>/</div>
                    <div className='flex min-w-[58px] flex-col items-center justify-between'>
                      <div className='text-right'>입고수량</div>
                      <div className='text-lg font-bold text-[#323743]'>{item.inboundQuantity.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <BottomSheet
        className='[&>.bottomsheet-content]:p-0'
        isOpen={isBottomSheetOpen}
        isHideHandle={true}
        onClose={() => {
          setIsBottomSheetOpen(false);
        }}
      >
        <div className='flex flex-col'>
          {/* 헤더영역 */}
          <div className='relative w-full border-b border-[#DEE1E6] pt-3 pb-3 text-center font-medium'>
            <span>조회 조건</span>
            <div className='absolute top-3 right-4' onClick={() => setIsBottomSheetOpen(false)}>
              <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                <path d='M15 5L5 15M15 15L5 5' stroke='#AAAAAA' strokeWidth='2' strokeLinecap='round' />
              </svg>
            </div>
          </div>

          {/* 컨텐츠영역 */}
          <div className='flex w-full flex-col gap-4.5 pt-3 pb-5'>
            <div className='flex flex-col gap-2 px-5 pb-[10px] text-sm'>
              <span className='font-medium'>입고 일자</span>
              <div className='flex w-full items-center justify-center gap-2'>
                {/* 시작일자 */}
                <div
                  className='w-full gap-1 rounded-md border border-[#E2E2E2] bg-white px-3 py-1.5'
                  onClick={() => {
                    setIsStartCalendarOpen(true);
                  }}
                >
                  <div className='flex items-center justify-between text-xs' onClick={() => {}}>
                    <span className={`font-medium ${selectedStartDate ? 'text-[#000000]' : 'text-[#8F94A5]'}`}>
                      {selectedStartDate ? DateUtils.formatDate(selectedStartDate, 'YYYY.MM.DD') : '날짜 선택'}
                    </span>
                    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                      <path
                        d='M3.125 7.42854V6.35712C3.125 4.93697 4.24429 3.78571 5.625 3.78571H13.9583C15.339 3.78571 16.4583 4.93697 16.4583 6.35712V7.42854H3.125Z'
                        fill='black'
                      />
                      <path
                        d='M6.45833 14.3501V14.2857M10.2083 14.3501V14.2857M10.2083 10.8571V10.7927M13.5417 10.8571V10.7927M3.95833 7.42855H15.625M5.46627 2.5V3.78586M13.9583 2.5V3.78571M13.9583 3.78571H5.625C4.24429 3.78571 3.125 4.93697 3.125 6.35712V14.9286C3.125 16.3487 4.24429 17.5 5.625 17.5H13.9583C15.339 17.5 16.4583 16.3487 16.4583 14.9286L16.4583 6.35712C16.4583 4.93697 15.339 3.78571 13.9583 3.78571Z'
                        stroke='black'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                </div>
                <span className='text-[#DEE4F5]'>~</span>
                {/* 종료일자 */}
                <div
                  className='w-full gap-1 rounded-md border border-[#E2E2E2] bg-white px-3 py-1.5'
                  onClick={() => {
                    setIsEndCalendarOpen(true);
                  }}
                >
                  <div className='flex items-center justify-between text-xs' onClick={() => {}}>
                    <span className={`font-medium ${selectedEndDate ? 'text-[#000000]' : 'text-[#8F94A5]'}`}>
                      {selectedEndDate ? DateUtils.formatDate(selectedEndDate, 'YYYY.MM.DD') : '날짜 선택'}
                    </span>
                    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                      <path
                        d='M3.125 7.42854V6.35712C3.125 4.93697 4.24429 3.78571 5.625 3.78571H13.9583C15.339 3.78571 16.4583 4.93697 16.4583 6.35712V7.42854H3.125Z'
                        fill='black'
                      />
                      <path
                        d='M6.45833 14.3501V14.2857M10.2083 14.3501V14.2857M10.2083 10.8571V10.7927M13.5417 10.8571V10.7927M3.95833 7.42855H15.625M5.46627 2.5V3.78586M13.9583 2.5V3.78571M13.9583 3.78571H5.625C4.24429 3.78571 3.125 4.93697 3.125 6.35712V14.9286C3.125 16.3487 4.24429 17.5 5.625 17.5H13.9583C15.339 17.5 16.4583 16.3487 16.4583 14.9286L16.4583 6.35712C16.4583 4.93697 15.339 3.78571 13.9583 3.78571Z'
                        stroke='black'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-2 px-5 pb-[10px] text-sm'>
              <span className='font-medium'>입고 유형</span>
              <div className='flex w-full items-center justify-center gap-2'>
                <Select
                  name='default'
                  options={default_options}
                  className='rounded-md text-xs'
                  isInfinite={false}
                  onChange={(e) => {
                    // handleChange(e.target.value);
                    // setSelectedValue(e.target.value);
                  }}
                  // value={selectedValue}
                />
              </div>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div
            className='flex flex-col gap-2 px-5 py-4'
            style={{ boxShadow: '0px 1px 2.5px #171a1f12, 0px 0px 2px #171a1f14' }}
          >
            <Button
              className='rounded-lg bg-[#9095A1] py-1.5 text-sm font-semibold text-white'
              onClick={() => {
                // applyFilter();
              }}
            >
              적용
            </Button>
          </div>
        </div>
      </BottomSheet>

      <BottomSheetDatePicker
        title='날짜 선택'
        isOpen={isStartCalendarOpen}
        value={selectedStartDate ?? DateUtils.formatDate(DateUtils.addDays(new Date(), -60), 'YYYY-MM-DD')}
        onClose={() => setIsStartCalendarOpen(false)}
        onComplete={(date) => {
          setSelectedStartDate(date);
        }}
      />

      <BottomSheetDatePicker
        title='날짜 선택'
        isOpen={isEndCalendarOpen}
        value={selectedEndDate ?? DateUtils.formatDate(new Date(), 'YYYY-MM-DD')}
        onClose={() => setIsEndCalendarOpen(false)}
        onComplete={(date) => {
          setSelectedEndDate(date);
        }}
      />
    </Layout>
  );
};

export default InboundStatusActivity;
