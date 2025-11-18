/*************************************************************
 * 날짜 관련 유틸리티
 * - created by hwanee-k
 *************************************************************/

export default class DateUtils {
  /**
   * 날짜를 지정된 format 형식의 문자열로 변환
   * @param date - 변환할 날짜
   * @param format - 날짜 형식 (기본값: 'YYYY-MM-DD')
   * @returns 형식화된 날짜 문자열
   * @example formatDate(new Date()) => '2025-03-04'
   * @example formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') => '2025-03-04 00:00:00'
   * @example formatDate(new Date(), 'YY-MM') => '25-03'
   *
   * 지원되는 형식:
   * - YYYY: 연도 4자리
   * - YY: 연도 2자리
   * - MM: 월 2자리
   * - M: 월 1자리
   * - DD: 일 2자리
   * - D: 일 1자리
   * - HH: 시간 2자리 (24시간)
   * - H: 시간 1자리 (24시간)
   * - hh: 시간 2자리 (12시간)
   * - h: 시간 1자리 (12시간)
   * - mm: 분 2자리
   * - m: 분 1자리
   * - ss: 초 2자리
   * - s: 초 1자리
   */
  static formatDate(date: Date | string, format?: string): string {
    if (typeof date === 'string') {
      date = parseDate(date);
    }
    return formatDate(date, format);
  }

  /**
   * 문자열을 Date 객체로 변환
   * @param dateStr - 변환할 날짜 문자열
   * @returns Date 객체
   * @example parseDate('2025-03-04') => new Date('2025-03-04')
   * @example parseDate('2025-03-04 00:00:00') => new Date('2025-03-04 00:00:00')
   * @example parseDate('20250304') => new Date('2025-03-04')
   * @example parseDate('25-03') => new Date('2025-03-01')
   *
   */
  static parseDate(dateStr: string): Date {
    return parseDate(dateStr);
  }

  /**
   * 두 날짜 사이의 일수 차이를 계산
   * @param date1 - 첫 번째 날짜
   * @param date2 - 두 번째 날짜
   * @returns 두 날짜 사이의 일수 차이
   * @example getDaysDifference(new Date('2025-03-04'), new Date('2025-03-05')) => 1
   * @example getDaysDifference(new Date('2025-03-04'), new Date('2025-03-04')) => 0
   *
   */
  static getDaysDifference(date1: Date, date2: Date): number {
    return getDaysDifference(date1, date2);
  }

  /**
   * 주어진 날짜에 개월 수를 더하거나 뺌
   * @param date - 기준 날짜
   * @param months - 더하거나 뺄 개월 수 (음수 가능)
   * @returns 계산된 새로운 Date 객체
   *
   * 참고: 월의 마지막 날짜를 고려하여 계산
   * 예시) 1월 31일에 1달을 더하면 2월 28일(또는 29일)이 됨
   */
  static addMonths(date: Date, months: number): Date {
    return addMonths(date, months);
  }

  /**
   * 주어진 날짜에 일수를 더하거나 뺌
   * @param date - 날짜
   * @param days - 일수
   * @returns 일수를 더한 날짜 또는 뺀 날짜
   * @example addDays(new Date('2025-03-04'), 1) => new Date('2025-03-05')
   * @example addDays(new Date('2025-03-04'), -1) => new Date('2025-03-03')
   *
   */
  static addDays(date: Date, days: number): Date {
    return addDays(date, days);
  }

  /**
   * 날짜가 유효한지 확인
   * @param date - 확인할 날짜
   * @returns 날짜가 유효한지 여부
   * @example isValidDate(new Date('2025-03-04')) => true
   * @example isValidDate(new Date('2025-03-04 00:00:00')) => true
   * @example isValidDate(new Date('25-03')) => true
   *
   */
  static isValidDate(date: Date): boolean {
    return isValidDate(date);
  }

  /**
   * 주어진 날짜가 속한 달의 마지막 날짜를 반환
   * @param date - 기준 날짜 (기본값: 현재 날짜)
   * @returns 해당 월의 마지막 날짜
   * @example getLastDayOfMonth(new Date('2025-03-04')) => new Date('2025-03-31')
   *
   */
  static getLastDayOfMonth(date: Date = new Date()): Date {
    return getLastDayOfMonth(date);
  }

  /**
   * 주어진 날짜가 속한 달의 마지막 일자를 숫자로 반환
   * @param date - 기준 날짜 (기본값: 현재 날짜)
   * @returns 해당 월의 마지막 일자 (숫자)
   * @example getLastDateOfMonth(new Date('2025-03-04')) => 31
   * @example getLastDateOfMonth() => 31
   */
  static getLastDateOfMonth(date: Date = new Date()): number {
    return getLastDateOfMonth(date);
  }

  /**
   * 오늘 날짜를 반환
   * @returns 오늘 날짜
   * @example getToday() => '2025-03-04'
   */
  static getToday(format = 'YYYY-MM-DD'): string {
    return formatDate(new Date(), format);
  }

  /**
   * 주어진 날짜가 속한 주의 월요일 날짜를 반환
   * @param date - 기준 날짜 (기본값: 현재 날짜)
   * @returns 해당 주의 월요일 날짜
   * @example getMondayOfWeek(new Date('2025-03-04')) => new Date('2025-03-03')
   * @example getMondayOfWeek() => new Date('2025-03-03')
   */
  static getMondayOfWeek(date: Date = new Date()): Date {
    return getMondayOfWeek(date);
  }

  static getNextMonday(): Date {
    return getNextMonday();
  }
}

// 날짜 포맷
const formatDate = (date: Date, format: string = 'YYYY-MM-DD'): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const tokens: { [key: string]: string } = {
    YYYY: String(year),
    YY: String(year).slice(-2),
    MM: String(month).padStart(2, '0'),
    M: String(month),
    DD: String(day).padStart(2, '0'),
    D: String(day),
    HH: String(hours24).padStart(2, '0'),
    H: String(hours24),
    hh: String(hours12).padStart(2, '0'),
    h: String(hours12),
    mm: String(minutes).padStart(2, '0'),
    m: String(minutes),
    ss: String(seconds).padStart(2, '0'),
    s: String(seconds),
    tt: hours24 < 12 ? '오전' : '오후',
  };

  return format.replace(/YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|tt/g, (match) => tokens[match]);
};

// 문자열 Date 객체로 변환
const parseDate = (dateStr: string): Date => {
  // 1) MS‐JSON 포맷 -- 쪽지함 RegistryDate
  const ms = /^\/Date\((\d+)\)\/$/.exec(dateStr);
  if (ms) return new Date(+ms[1]);
  // '20250304' 형식 처리 (YYYYMMDD)
  if (/^\d{8}$/.test(dateStr)) {
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6)) - 1; // 월은 0부터 시작
    const day = parseInt(dateStr.substring(6, 8));
    return new Date(year, month, day);
  }

  // '25-03' 형식 처리 (YY-MM)
  if (/^\d{2}-\d{2}$/.test(dateStr)) {
    const [yearStr, monthStr] = dateStr.split('-');
    const year = 2000 + parseInt(yearStr);
    const month = parseInt(monthStr) - 1;
    return new Date(year, month, 1); // 해당 월의 첫째 날로 설정
  }

  // 기존 형식들 처리
  return new Date(dateStr);
};

// 두 날짜 사이의 일수 차이를 계산
const getDaysDifference = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// 주어진 날짜에 개월 수를 더하거나 뺌
const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  const currentDate = date.getDate();

  // 월 설정
  result.setMonth(result.getMonth() + months);

  // 원래 일자와 결과의 일자가 다르면 (월말 일자 조정이 필요한 경우)
  if (currentDate !== result.getDate()) {
    // 해당 월의 마지막 날짜로 설정
    result.setDate(0);
  }

  return result;
};

// 주어진 날짜에 일수를 더하거나 뺌
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// 날짜가 유효한지 확인
const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

// 주어진 날짜가 속한 달의 마지막 날짜를 반환
const getLastDayOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

// 주어진 날짜가 속한 달의 마지막 일자를 숫자로 반환
const getLastDateOfMonth = (date: Date): number => {
  return getLastDayOfMonth(date).getDate();
};

// 주어진 날짜가 속한 주의 월요일 날짜를 반환
const getMondayOfWeek = (date: Date): Date => {
  const result = new Date(date);
  const day = result.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
  const diff = day === 0 ? -6 : 1 - day; // 일요일이면 6일 전, 그 외에는 1-day만큼 이동
  result.setDate(result.getDate() + diff);
  return result;
};

// 오늘 이후의 가장 가까운 월요일 반환
const getNextMonday = () => {
  const today = new Date();
  const day = today.getDay(); // 0(일) ~ 6(토), 1이 월요일
  // 오늘이 월요일(day === 1)이면 7일 뒤, 아니면 다음 월요일까지 남은 일수
  const diff = (8 - day) % 7 || 7;
  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + diff);
  return nextMonday;
};
