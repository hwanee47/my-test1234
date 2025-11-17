/*************************************************************
 * 유효성 검사 유틸리티
 * - created by hwanee-k
 *************************************************************/

export default class ValidationUtils {
  // 주민등록번호 유효성 검사
  static isValidJumin(jumin: string): boolean {
    return isValidJumin(jumin);
  }

  // 외국인등록번호 유효성 검사
  static isValidForeignerNumber(foreignerNumber: string): boolean {
    return isValidForeignerNumber(foreignerNumber);
  }
}

// 주민등록번호 유효성 검사
const isValidJumin = (jumin: string) => {
  const cleanJumin = jumin.replace(/-/g, "");

  if (cleanJumin.length !== 13) return false;

  let checkSum = 0;
  for (let i = 0; i < 12; i++) {
    checkSum += parseInt(cleanJumin[i]) * ((i % 8) + 2);
  }

  const checkDigit = (11 - (checkSum % 11)) % 10;
  const lastDigit = parseInt(cleanJumin[12]);

  return checkDigit === lastDigit;
};

// 외국인등록번호 유효성 검사
const isValidForeignerNumber = (foreignerNumber: string) => {
  const cleanNumber = foreignerNumber.replace(/-/g, "");

  if (cleanNumber.length !== 13) return false;

  let checkSum = 0;
  for (let i = 0; i < 12; i++) {
    checkSum += parseInt(cleanNumber[i]) * ((i % 8) + 2);
  }

  const checkDigit = (13 - (checkSum % 11)) % 10;
  const lastDigit = parseInt(cleanNumber[12]);

  return checkDigit === lastDigit;
};
