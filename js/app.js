/**
 * Prompt 提示词编辑器 - 主应用
 */

import { TabManager } from './modules/TabManager.js';
import { PreviewGenerator } from './modules/PreviewGenerator.js';
import { StorageManager } from './modules/StorageManager.js';
import { TemplateManager } from './modules/TemplateManager.js';
import { debounce } from './utils/debounce.js';
import { copyToClipboard } from './utils/clipboard.js';
import { formatTime, getTextStats } from './utils/formatter.js';
import { tabsConfig } from './config/tabs.js';

class PromptEditor {
  constructor() {
    // 初始化管理器
    this.tabManager = new TabManager('#editor-container', tabsConfig);
    this.previewGenerator = new PreviewGenerator('#preview-content');
    this.storageManager = new StorageManager();
    this.templateManager = new TemplateManager();

    // 状态
    this.lastSavedTime = null;

    // 初始化应用
    this.init();
  }

  /**
   * 初始化应用
   */
  init() {
    // 初始化选项卡
    this.tabManager.init();

    // 设置内容变化回调
    this.tabManager.onContentChange = debounce(() => {
      this.updatePreview();
      this.autoSave();
    }, 300);

    // 加载保存的数据
    this.loadSavedData();

    // 绑定事件
    this.bindEvents();

    // 初始生成预览
    this.updatePreview();

    // 加载主题
    this.loadTheme();

    // 更新最后保存时间
    this.updateLastSavedTime();
  }

  /**
   * 加载保存的数据
   */
  loadSavedData() {
    const saved = this.storageManager.load();
    if (saved && saved.tabs) {
      this.tabManager.setAllContent(saved.tabs);
      this.lastSavedTime = saved.metadata?.lastModified;
      this.showToast('已恢复上次编辑内容', 'success');
    }
  }

  /**
   * 绑定事件
   */
  bindEvents() {
    // 复制按钮
    const copyBtn = document.getElementById('btn-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.copyContent());
    }

    // 导出 JSON
    const exportJsonBtn = document.getElementById('btn-export-json');
    if (exportJsonBtn) {
      exportJsonBtn.addEventListener('click', () => this.exportJSON());
    }

    // 导出 TXT
    const exportTxtBtn = document.getElementById('btn-export-txt');
    if (exportTxtBtn) {
      exportTxtBtn.addEventListener('click', () => this.exportText());
    }

    // 导入
    const importBtn = document.getElementById('btn-import');
    if (importBtn) {
      importBtn.addEventListener('click', () => this.importData());
    }

    // 清除
    const clearBtn = document.getElementById('btn-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearData());
    }

    // 主题切换
    const themeBtn = document.getElementById('btn-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // 模板选择
    const templateSelect = document.getElementById('template-select');
    if (templateSelect) {
      templateSelect.addEventListener('change', (e) => {
        this.loadTemplate(e.target.value);
      });
    }

    // 页面卸载前保存
    window.addEventListener('beforeunload', () => {
      const content = this.tabManager.getAllContent();
      this.storageManager.save(content);
    });

    // 键盘快捷键
    this.bindKeyboardShortcuts();
  }

  /**
   * 绑定键盘快捷键
   */
  bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdKey = isMac ? e.metaKey : e.ctrlKey;

      if (cmdKey) {
        switch (e.key.toLowerCase()) {
          case 's':
            e.preventDefault();
            this.manualSave();
            break;
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
            e.preventDefault();
            const tabIndex = parseInt(e.key) - 1;
            const tabId = tabsConfig[tabIndex]?.id;
            if (tabId) {
              this.tabManager.switchTab(tabId);
            }
            break;
          case 'c':
            if (e.shiftKey) {
              e.preventDefault();
              this.copyContent();
            }
            break;
          case 'e':
            e.preventDefault();
            this.exportJSON();
            break;
          case 'i':
            e.preventDefault();
            this.importData();
            break;
          case 'd':
            e.preventDefault();
            this.toggleTheme();
            break;
        }
      }
    });
  }

  /**
   * 更新预览
   */
  updatePreview() {
    const content = this.tabManager.getAllContent();
    this.previewGenerator.generate(content);

    // 更新统计信息
    this.updateStats();
  }

  /**
   * 更新统计信息
   */
  updateStats() {
    const stats = this.previewGenerator.getStats();

    const totalChars = document.getElementById('total-chars');
    const totalLines = document.getElementById('total-lines');

    if (totalChars) {
      totalChars.textContent = stats.chars;
    }
    if (totalLines) {
      totalLines.textContent = stats.lines;
    }
  }

  /**
   * 自动保存
   */
  autoSave = debounce(() => {
    const content = this.tabManager.getAllContent();
    const success = this.storageManager.save(content);

    if (success) {
      this.lastSavedTime = new Date().toISOString();
      this.updateLastSavedTime();
    }
  }, 1000);

  /**
   * 手动保存
   */
  manualSave() {
    const content = this.tabManager.getAllContent();
    const success = this.storageManager.save(content);

    if (success) {
      this.lastSavedTime = new Date().toISOString();
      this.updateLastSavedTime();
      this.showToast('保存成功', 'success');
    } else {
      this.showToast('保存失败', 'error');
    }
  }

  /**
   * 更新最后保存时间
   */
  updateLastSavedTime() {
    const lastSavedElement = document.getElementById('last-saved');
    if (lastSavedElement && this.lastSavedTime) {
      lastSavedElement.textContent = formatTime(this.lastSavedTime);
    }
  }

  /**
   * 复制内容
   */
  async copyContent() {
    const previewContent = this.previewGenerator.getPlainText();
    const success = await copyToClipboard(previewContent);

    if (success) {
      this.showToast('已复制到剪贴板', 'success');
    } else {
      this.showToast('复制失败', 'error');
    }
  }

  /**
   * 导出 JSON
   */
  exportJSON() {
    const content = this.tabManager.getAllContent();
    const preview = this.previewGenerator.getPlainText();
    this.storageManager.exportJSON(content, preview);
    this.showToast('导出成功', 'success');
  }

  /**
   * 导出文本
   */
  exportText() {
    const preview = this.previewGenerator.getPlainText();
    this.storageManager.exportText(preview);
    this.showToast('导出成功', 'success');
  }

  /**
   * 导入数据
   */
  importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const data = await this.storageManager.importJSON(file);
        this.tabManager.setAllContent(data);
        this.updatePreview();
        this.showToast('导入成功', 'success');
      } catch (err) {
        this.showToast(`导入失败: ${err.message}`, 'error');
      }
    };

    input.click();
  }

  /**
   * 清除数据
   */
  clearData() {
    if (!confirm('确定要清除所有数据吗？此操作不可撤销。')) {
      return;
    }

    this.storageManager.clear();
    this.tabManager.clearAll();
    this.updatePreview();
    this.showToast('数据已清除', 'success');
  }

  /**
   * 加载模板
   */
  loadTemplate(templateId) {
    const template = this.templateManager.loadPreset(templateId);
    if (template) {
      this.tabManager.setAllContent(template.data);
      this.updatePreview();
      this.showToast(`已加载模板: ${template.name}`, 'success');
    }
  }

  /**
   * 切换主题
   */
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    this.storageManager.saveTheme(newTheme);
    this.updateThemeIcon(newTheme);

    this.showToast(`已切换到${newTheme === 'dark' ? '暗色' : '亮色'}主题`, 'success');
  }

  /**
   * 加载主题
   */
  loadTheme() {
    const savedTheme = this.storageManager.loadTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(savedTheme);
  }

  /**
   * 更新主题图标
   */
  updateThemeIcon(theme) {
    const themeBtn = document.getElementById('btn-theme');
    if (themeBtn) {
      const icon = themeBtn.querySelector('.icon');
      if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      }
    }
  }

  /**
   * 显示提示
   */
  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icon = type === 'success' ? '✓' : '✗';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span>${message}</span>
    `;

    document.body.appendChild(toast);

    // 触发动画
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // 3 秒后移除
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// 启动应用
document.addEventListener('DOMContentLoaded', () => {
  new PromptEditor();
});
