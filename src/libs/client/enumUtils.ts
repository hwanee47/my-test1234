/*************************************************************
 * 상수 관련 유틸리티
 * - created by hwanee-k
 *************************************************************/

export const getEnumName = (
  type: any,
  value: string | number
): string | undefined => {
  const entry = Object.entries(type).find(([val]) => val === value);
  return entry ? entry[0] : undefined;
};
