/**
 * StorageManager 模块
 * 负责数据的保存、加载、清除、导入、导出
 */

export class StorageManager {
  constructor(storageKey = 'prompt-editor-data') {
    this.storageKey = storageKey;
  }

  /**
   * 保存数据
   */
  save(data) {
    try {
      const payload = {
        tabs: data,
        metadata: {
          lastModified: new Date().toISOString(),
          version: '1.0'
        }
      };
      localStorage.setItem(this.storageKey, JSON.stringify(payload));
      return true;
    } catch (err) {
      console.error('保存失败:', err);
      return false;
    }
  }

  /**
   * 加载数据
   */
  load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.error('加载失败:', err);
      return null;
    }
  }

  /**
   * 清除数据
   */
  clear() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (err) {
      console.error('清除失败:', err);
      return false;
    }
  }

  /**
   * 导出为 JSON 文件
   */
  exportJSON(data, previewContent) {
    const exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      tabs: data,
      preview: previewContent
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * 导入 JSON 文件
   */
  async importJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);

          // 验证格式
          if (!data.version || !data.tabs) {
            throw new Error('无效的文件格式');
          }

          resolve(data.tabs);
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = () => reject(new Error('文件读取失败'));
      reader.readAsText(file);
    });
  }

  /**
   * 导出为纯文本
   */
  exportText(previewContent) {
    const blob = new Blob([previewContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * 保存主题偏好
   */
  saveTheme(theme) {
    try {
      localStorage.setItem('prompt-editor-theme', theme);
      return true;
    } catch (err) {
      console.error('保存主题失败:', err);
      return false;
    }
  }

  /**
   * 加载主题偏好
   */
  loadTheme() {
    try {
      return localStorage.getItem('prompt-editor-theme') || 'light';
    } catch (err) {
      console.error('加载主题失败:', err);
      return 'light';
    }
  }
}
