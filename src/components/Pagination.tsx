/*************************************************************
 * 페이지네이션 컴포넌트
 * - created by hwanee-k
 *************************************************************/
import { twMerge } from 'tailwind-merge';
import Button from '@/components/Button';

interface PaginationProps {
  currentPage: number; // 현재 페이지
  totalPages: number; // 총 페이지 수
  displayBtns?: number; // 표시할 버튼 수
  isBtn?: boolean; // 버튼 표시 여부
  isJumpBtn?: boolean; // 그룹 버튼 표시 여부
  className?: string; // 컴포넌트 추가 스타일
  selectedBtnClassName?: string; // 선택된 버튼 스타일
  onPageChange: (page: number) => void; // 페이지 변경 함수
}

export default function Pagination({
  currentPage,
  totalPages,
  displayBtns = 5,
  isBtn = true,
  isJumpBtn = false,
  className,
  selectedBtnClassName = 'bg-black text-white',
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, Math.floor((currentPage - 1) / displayBtns) * displayBtns + 1);
    const endPage = Math.min(startPage + displayBtns - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const goToPreviousGroup = () => {
    const previousGroupStart = Math.max(Math.floor((currentPage - 1) / displayBtns) * displayBtns - displayBtns + 1, 1);
    onPageChange(previousGroupStart);
  };

  const goToNextGroup = () => {
    const nextGroupStart = Math.min(Math.ceil(currentPage / displayBtns) * displayBtns + 1, totalPages);
    onPageChange(nextGroupStart);
  };

  // 다음 그룹 버튼 비활성화 조건
  const isNextGroupDisabled = Math.ceil(currentPage / displayBtns) * displayBtns >= totalPages;

  // 이전 그룹 버튼 비활성화 조건
  const isPreviousGroupDisabled = currentPage <= displayBtns;

  return (
    <nav
      className={twMerge(
        'pagination flex items-center justify-center space-x-2',
        '[&>button]:ring-offset-background [&>button]:inline-flex [&>button]:h-6 [&>button]:w-6 [&>button]:items-center [&>button]:justify-center [&>button]:gap-2 [&>button]:rounded-md [&>button]:border [&>button]:border-gray-200 [&>button]:font-medium [&>button]:whitespace-nowrap [&>button]:transition-colors [&>button]:disabled:text-gray-200 [&>button_svg]:pointer-events-none [&>button_svg]:size-5 [&>button_svg]:shrink-0',
        className,
      )}
    >
      {isJumpBtn && (
        <Button
          variant='outline'
          onClick={goToPreviousGroup}
          disabled={isPreviousGroupDisabled}
          className={`border-none bg-[#F3F5F9] text-[#161139] hover:bg-[#F3F5F9] hover:text-[#161139] ${isPreviousGroupDisabled ? 'cursor-not-allowed text-[#9095A7] hover:text-[#9095A7]' : ''}`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='11 17 6 12 11 7'></polyline>
            <polyline points='18 17 13 12 18 7'></polyline>
          </svg>
        </Button>
      )}

      {isBtn && (
        <Button
          variant='outline'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`border-none bg-[#F3F5F9] text-[#161139] hover:bg-[#F3F5F9] hover:text-[#161139] ${currentPage === 1 ? 'cursor-not-allowed text-[#9095A7] hover:text-[#9095A7]' : ''}`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='15 18 9 12 15 6'></polyline>
          </svg>
        </Button>
      )}

      {pageNumbers.map((number) => (
        <Button
          key={number}
          variant={currentPage === number ? 'solid' : 'outline'}
          onClick={() => onPageChange(number)}
          className={`text-[#161139] hover:bg-transparent hover:text-[#161139] ${currentPage === number ? selectedBtnClassName + ' border-none' : '!border-[#F3F5F9]'}`}
        >
          {number}
        </Button>
      ))}

      {isBtn && (
        <Button
          variant='outline'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`border-none bg-[#F3F5F9] text-[#161139] hover:bg-[#F3F5F9] hover:text-[#161139] ${currentPage === totalPages ? 'cursor-not-allowed text-[#9095A7] hover:text-[#9095A7]' : ''}`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='9 18 15 12 9 6'></polyline>
          </svg>
        </Button>
      )}

      {isJumpBtn && (
        <Button
          variant='outline'
          onClick={goToNextGroup}
          disabled={isNextGroupDisabled}
          className={`border-none bg-[#F3F5F9] text-[#161139] hover:bg-[#F3F5F9] hover:text-[#161139] ${isNextGroupDisabled ? 'cursor-not-allowed text-[#9095A7] hover:text-[#9095A7]' : ''}`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='13 17 18 12 13 7'></polyline>
            <polyline points='6 17 11 12 6 7'></polyline>
          </svg>
        </Button>
      )}
    </nav>
  );
}
