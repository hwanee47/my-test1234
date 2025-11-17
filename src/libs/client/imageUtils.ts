/*************************************************************
 * 이미지 유틸리티
 * - created by hwanee-k
 *************************************************************/

export default class ImageUtils {
  // Base64 인코딩 문자열을 File 객체로 변환
  static convertToFile(
    base64: string,
    filename: string = `file_${Date.now()}`
  ): File | null {
    return convertToFile(base64, filename);
  }

  /**
   * 이미지 압축 함수
   * @param file - 압축할 이미지 파일
   * @param maxWidth - 최대 너비 (기본값: 1920)
   * @param maxHeight - 최대 높이 (기본값: 1080)
   * @param quality - 이미지 품질 (0-1, 기본값: 0.8)
   * @returns Promise<File> - 압축된 이미지 파일
   */
  static async compressImage(
    file: File,
    maxWidth: number = 1920,
    maxHeight: number = 1080,
    quality: number = 0.8
  ): Promise<File> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // 이미지 크기 조정
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          // 압축된 이미지를 Blob으로 변환
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                reject(new Error("이미지 압축 실패"));
              }
            },
            "image/jpeg",
            quality
          );
        };
        img.onerror = () => reject(new Error("이미지 로드 실패"));
      };
      reader.onerror = () => reject(new Error("파일 읽기 실패"));
    });
  }
}

/**
 * Base64 인코딩 문자열을 File 객체로 변환
 * @param base64     - Base64 인코딩 문자열
 * @param filename   - 파일 이름
 * @returns          - File 객체
 */
const convertToFile = (base64: string, filename: string): File | null => {
  if (!base64) return null;

  const arr = base64.split(","); // Base64 문자열을 분리
  const mime = arr[0].match(/:(.*?);/)?.[1]; // MIME 타입 추출
  const bstr = atob(arr[1]); // Base64 디코딩
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};
