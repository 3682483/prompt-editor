/**
 * 格式化工具
 * 提供各种格式化功能
 */

/**
 * 格式化时间
 * @param {Date|string} date - 日期对象或字符串
 * @returns {string} - 格式化后的时间字符串
 */
export function formatTime(date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  const now = new Date();
  const diff = now - date;
  
  // 小于 1 分钟
  if (diff < 60000) {
    return '刚刚';
  }
  
  // 小于 1 小时
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes} 分钟前`;
  }
  
  // 小于 24 小时
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours} 小时前`;
  }
  
  // 显示具体日期
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hour}:${minute}`;
}

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @returns {string} - 格式化后的文件大小
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * 计算文本统计信息
 * @param {string} text - 文本内容
 * @returns {Object} - 统计信息
 */
export function getTextStats(text) {
  const chars = text.length;
  const lines = text.split('\n').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  
  return {
    chars,
    lines,
    words
  };
}
