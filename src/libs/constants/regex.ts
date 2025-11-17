/** 상수 정의 파일, 매직 넘버 최소화 */

// 한글 정규식
export const REGEX_KOREAN = /^[가-힣]+$/;
// 숫자 정규식
export const REGEX_NUMBER = /^[0-9]+$/;
// 숫자 제외 정규식
export const REGEX_NOT_NUMBER = /[^0-9]/g;
// 영어 정규식
export const REGEX_ENGLISH = /^[a-zA-Z]+$/;
// 전화번호 정규식
export const REGEX_PHONE = /^01[016789]-\d{3,4}-\d{4}$/;
// 이메일 정규식
export const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// 특수문자 제거 정규식
export const REGEX_NOT_SPECIAL = /^[a-zA-Z0-9]*$/;
