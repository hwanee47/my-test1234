import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GridOptions } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// AG Grid 모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);

// 샘플 데이터 타입
interface SampleData {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  date: string;
}

const HomeActivity: ActivityComponentType = () => {
  // 샘플 데이터 생성
  const [rowData] = useState<SampleData[]>([
    { id: 1, name: '홍길동', email: 'hong@example.com', phone: '010-1234-5678', status: '활성', date: '2024-01-15' },
    { id: 2, name: '김철수', email: 'kim@example.com', phone: '010-2345-6789', status: '활성', date: '2024-01-16' },
    { id: 3, name: '이영희', email: 'lee@example.com', phone: '010-3456-7890', status: '비활성', date: '2024-01-17' },
    { id: 4, name: '박민수', email: 'park@example.com', phone: '010-4567-8901', status: '활성', date: '2024-01-18' },
    { id: 5, name: '정수진', email: 'jung@example.com', phone: '010-5678-9012', status: '활성', date: '2024-01-19' },
    { id: 6, name: '최동현', email: 'choi@example.com', phone: '010-6789-0123', status: '비활성', date: '2024-01-20' },
    { id: 7, name: '강미영', email: 'kang@example.com', phone: '010-7890-1234', status: '활성', date: '2024-01-21' },
    { id: 8, name: '윤태호', email: 'yoon@example.com', phone: '010-8901-2345', status: '활성', date: '2024-01-22' },
    { id: 9, name: '임지은', email: 'lim@example.com', phone: '010-9012-3456', status: '비활성', date: '2024-01-23' },
    { id: 10, name: '한소희', email: 'han@example.com', phone: '010-0123-4567', status: '활성', date: '2024-01-24' },
  ]);

  // 모바일에 최적화된 컬럼 정의
  const columnDefs = useMemo(
    () =>
      [
        {
          field: 'id',
          headerName: 'ID',
          width: 80,
          pinned: 'left',
          lockPosition: true,
          cellStyle: { textAlign: 'center' },
        },
        {
          field: 'name',
          headerName: '이름',
          width: 100,
          cellStyle: { fontWeight: 'bold' },
        },
        {
          field: 'email',
          headerName: '이메일',
          width: 180,
          cellStyle: { fontSize: '0.875rem' },
        },
        {
          field: 'phone',
          headerName: '전화번호',
          width: 140,
        },
        {
          field: 'status',
          headerName: '상태',
          width: 100,
          cellStyle: (params) => {
            if (params.value === '활성') {
              return { color: '#10b981', fontWeight: 'bold' };
            }
            return { color: '#ef4444', fontWeight: 'bold' };
          },
        },
        {
          field: 'date',
          headerName: '날짜',
          width: 120,
        },
      ] as ColDef<SampleData>[],
    [],
  );

  // 모바일에 최적화된 그리드 옵션
  const gridOptions = useMemo<GridOptions<SampleData>>(
    () => ({
      // 모바일 터치 스크롤 지원
      suppressScrollOnNewData: true,
      // 행 높이 조정 (모바일에서 터치하기 쉽게)
      rowHeight: 50,
      // 헤더 높이
      headerHeight: 40,
      // 가로 스크롤 활성화 (모바일에서 필요)
      suppressHorizontalScroll: false,
      // 세로 스크롤 활성화
      suppressVerticalScroll: false,
      // 셀 선택 비활성화 (모바일에서 의도치 않은 선택 방지)
      suppressCellFocus: false,
      // 애니메이션 비활성화 (성능 향상)
      animateRows: false,
      // 기본 정렬 비활성화
      defaultColDef: {
        sortable: true,
        filter: false,
        resizable: true,
        flex: 0,
      },
    }),
    [],
  );

  return (
    <AppScreen appBar={{ title: 'AG Grid 모바일 예제' }}>
      <div className='flex h-full w-full flex-col p-2'>
        <div className='mb-2 text-sm text-gray-600'>총 {rowData.length}개의 데이터</div>
        <div className='ag-theme-alpine w-full flex-1' style={{ height: 'calc(100vh - 120px)', minHeight: '400px' }}>
          <AgGridReact<SampleData>
            rowData={rowData}
            columnDefs={columnDefs}
            gridOptions={gridOptions}
            domLayout='normal'
            enableCellTextSelection={true}
            ensureDomOrder={true}
          />
        </div>
      </div>
    </AppScreen>
  );
};

export default HomeActivity;
