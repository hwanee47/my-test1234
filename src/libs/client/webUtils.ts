/*************************************************************
 * 웹 유틸리티
 * - created by hwanee-k
 *************************************************************/

export default class WebUtils {
  // 클립보드 복사
  static copyToClipboard(text: string): Promise<void> {
    return copyToClipboard(text);
  }
}

const copyToClipboard = async (text: string): Promise<void> => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // 화면 밖으로 위치시킴
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
  }
};
