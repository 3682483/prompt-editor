/**
 * PreviewGenerator 模块
 * 负责将各选项卡内容整合为完整的提示词
 */

export class PreviewGenerator {
  constructor(previewSelector, template = null) {
    this.previewElement = document.querySelector(previewSelector);
    this.template = template || this.getDefaultTemplate();
  }

  /**
   * 获取默认模板
   */
  getDefaultTemplate() {
    return `# Role
{role}

---

# Task
{task}

---

# Context
{context}

---

# Constraints
{constraints}

---

# Output Format
{format}

---

# Examples
{examples}`;
  }

  /**
   * 生成预览
   */
  generate(tabsContent) {
    let preview = this.template;

    // 替换占位符
    Object.entries(tabsContent).forEach(([key, value]) => {
      const placeholder = `{${key}}`;
      preview = preview.replace(placeholder, value || '(未填写)');
    });

    // 设置预览内容
    this.previewElement.textContent = preview;

    return preview;
  }

  /**
   * 更新模板
   */
  updateTemplate(newTemplate) {
    this.template = newTemplate;
  }

  /**
   * 获取纯文本
   */
  getPlainText() {
    return this.previewElement.textContent;
  }

  /**
   * 获取 Markdown 格式
   */
  getMarkdown() {
    return this.previewElement.textContent;
  }

  /**
   * 获取预览内容的统计信息
   */
  getStats() {
    const text = this.getPlainText();
    return {
      chars: text.length,
      lines: text.split('\n').length,
      words: text.trim() ? text.trim().split(/\s+/).length : 0
    };
  }
}
