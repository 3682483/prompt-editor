/**
 * 剪贴板工具
 * 支持复制文本到剪贴板（包含降级方案）
 */

/**
 * 复制文本到剪贴板
 * @param {string} text - 需要复制的文本
 * @returns {Promise<boolean>} - 是否成功
 */
export async function copyToClipboard(text) {
  try {
    // 优先使用 Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // 降级方案
    return fallbackCopy(text);
  } catch (err) {
    console.error('复制失败:', err);
    return false;
  }
}

/**
 * 降级复制方案
 * @param {string} text - 需要复制的文本
 * @returns {boolean} - 是否成功
 */
function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch (err) {
    console.error('降级复制失败:', err);
    document.body.removeChild(textarea);
    return false;
  }
}
