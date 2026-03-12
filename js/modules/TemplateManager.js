/**
 * TemplateManager 模块
 * 负责预设模板和自定义模板的加载、保存、删除
 */

import { presetTemplates } from '../config/templates.js';

export class TemplateManager {
  constructor(storageKey = 'prompt-editor-templates') {
    this.storageKey = storageKey;
    this.presets = presetTemplates;
    this.custom = this.loadCustom();
  }

  /**
   * 加载自定义模板
   */
  loadCustom() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error('加载自定义模板失败:', err);
      return [];
    }
  }

  /**
   * 保存自定义模板
   */
  saveCustom() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.custom));
      return true;
    } catch (err) {
      console.error('保存自定义模板失败:', err);
      return false;
    }
  }

  /**
   * 获取所有模板（预设 + 自定义）
   */
  getAll() {
    return {
      presets: this.presets,
      custom: this.custom
    };
  }

  /**
   * 加载预设模板
   */
  loadPreset(id) {
    return this.presets.find(t => t.id === id);
  }

  /**
   * 添加自定义模板
   */
  addCustom(name, data) {
    const template = {
      id: `custom-${Date.now()}`,
      name: name,
      data: data,
      createdAt: new Date().toISOString()
    };

    this.custom.push(template);
    this.saveCustom();
    return template;
  }

  /**
   * 删除自定义模板
   */
  deleteCustom(id) {
    this.custom = this.custom.filter(t => t.id !== id);
    this.saveCustom();
  }

  /**
   * 更新自定义模板
   */
  updateCustom(id, name, data) {
    const template = this.custom.find(t => t.id === id);
    if (template) {
      template.name = name;
      template.data = data;
      template.updatedAt = new Date().toISOString();
      this.saveCustom();
      return template;
    }
    return null;
  }
}
