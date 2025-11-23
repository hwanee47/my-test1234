// 메뉴 리스트 정의
export const menuList = [
  {
    title: '입고',
    items: [
      {
        title: '입고 현황',
        activity: 'InboundStatusActivity',
      },
      {
        title: '입고 검수',
        activity: 'LoginActivity',
      },
      {
        title: '현장 입고',
        activity: 'HomeActivity',
      },
    ],
  },
  {
    title: '재고',
    items: [
      {
        title: '재고 조회',
        activity: 'HomeActivity',
      },
      {
        title: '재고 이동',
        activity: 'HomeActivity',
      },
    ],
  },
  {
    title: '출고',
    items: [
      {
        title: '업체 출고 검수',
        activity: 'HomeActivity',
      },
      {
        title: '현장 출고 처리',
        activity: 'HomeActivity',
      },
      {
        title: '피킹 조회',
        activity: 'HomeActivity',
      },
      {
        title: '송장 출고 검수',
        activity: 'HomeActivity',
      },
    ],
  },
  {
    title: '통계',
    items: [
      {
        title: '통계 메뉴 1',
        activity: 'HomeActivity',
      },
      {
        title: '통계 메뉴 2',
        activity: 'HomeActivity',
      },
    ],
  },
];
