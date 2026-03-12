/**
 * TabManager 模块
 * 负责选项卡的创建、切换、内容获取和设置
 */

export class TabManager {
  constructor(containerSelector, config) {
    this.container = document.querySelector(containerSelector);
    this.tabs = new Map();
    this.activeTab = null;
    this.config = config;
    this.onContentChange = null;
  }

  /**
   * 初始化所有选项卡
   */
  init() {
    // 创建选项卡栏
    const tabBar = document.createElement('div');
    tabBar.className = 'tab-bar';
    tabBar.setAttribute('role', 'tablist');
    tabBar.setAttribute('aria-label', '提示词编辑选项卡');

    // 创建选项卡内容容器
    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content';

    // 创建所有选项卡
    this.config.forEach((tabConfig, index) => {
      // 创建选项卡按钮
      const tabButton = this.createTabButton(tabConfig, index);
      tabBar.appendChild(tabButton);

      // 创建选项卡内容
      const tabPanel = this.createTabPanel(tabConfig, index);
      tabContent.appendChild(tabPanel);

      // 存储引用
      this.tabs.set(tabConfig.id, {
        button: tabButton,
        panel: tabPanel,
        config: tabConfig
      });
    });

    // 添加到容器
    this.container.appendChild(tabBar);
    this.container.appendChild(tabContent);

    // 激活第一个选项卡
    this.switchTab(this.config[0].id);

    // 绑定事件
    this.bindEvents();
  }

  /**
   * 创建选项卡按钮
   */
  createTabButton(config, index) {
    const button = document.createElement('button');
    button.className = 'tab-item';
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    button.setAttribute('aria-controls', `panel-${config.id}`);
    button.setAttribute('id', `tab-${config.id}`);
    button.dataset.tab = config.id;

    button.innerHTML = `
      <span class="tab-icon">${config.icon}</span>
      <span>${config.name}</span>
    `;

    return button;
  }

  /**
   * 创建选项卡内容
   */
  createTabPanel(config, index) {
    const panel = document.createElement('div');
    panel.className = 'tab-panel';
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `tab-${config.id}`);
    panel.setAttribute('id', `panel-${config.id}`);
    panel.dataset.tab = config.id;
    if (index === 0) {
      panel.classList.add('active');
    }

    panel.innerHTML = `
      <label class="label">
        <span class="label-text">${config.label}</span>
        <span class="label-hint">${config.hint}</span>
      </label>
      <textarea
        class="textarea"
        id="input-${config.id}"
        placeholder="${config.placeholder}"
        rows="8"
        aria-label="${config.label}"
      ></textarea>
      <div class="char-count">
        <span class="char-count-value">0</span> 字符
      </div>
    `;

    return panel;
  }

  /**
   * 绑定事件
   */
  bindEvents() {
    // 选项卡切换
    this.container.querySelector('.tab-bar').addEventListener('click', (e) => {
      const tabItem = e.target.closest('.tab-item');
      if (!tabItem) return;

      const tabId = tabItem.dataset.tab;
      this.switchTab(tabId);
    });

    // 文本框输入
    this.tabs.forEach((tab, tabId) => {
      const textarea = tab.panel.querySelector('.textarea');
      const charCount = tab.panel.querySelector('.char-count-value');

      textarea.addEventListener('input', () => {
        // 更新字数统计
        charCount.textContent = textarea.value.length;

        // 触发内容变化回调
        if (this.onContentChange) {
          this.onContentChange(tabId, textarea.value);
        }
      });
    });
  }

  /**
   * 切换选项卡
   */
  switchTab(id) {
    // 更新所有选项卡状态
    this.tabs.forEach((tab, tabId) => {
      const isActive = tabId === id;
      tab.button.classList.toggle('active', isActive);
      tab.button.setAttribute('aria-selected', isActive ? 'true' : 'false');
      tab.panel.classList.toggle('active', isActive);
    });

    this.activeTab = id;

    // 聚焦到输入框
    const activeTab = this.tabs.get(id);
    if (activeTab) {
      const textarea = activeTab.panel.querySelector('.textarea');
      textarea.focus();
    }
  }

  /**
   * 获取单个选项卡内容
   */
  getContent(id) {
    const tab = this.tabs.get(id);
    if (!tab) return '';

    const textarea = tab.panel.querySelector('.textarea');
    return textarea.value;
  }

  /**
   * 设置单个选项卡内容
   */
  setContent(id, content) {
    const tab = this.tabs.get(id);
    if (!tab) return;

    const textarea = tab.panel.querySelector('.textarea');
    const charCount = tab.panel.querySelector('.char-count-value');

    textarea.value = content;
    charCount.textContent = content.length;
  }

  /**
   * 获取所有选项卡内容
   */
  getAllContent() {
    const data = {};
    this.tabs.forEach((tab, id) => {
      data[id] = this.getContent(id);
    });
    return data;
  }

  /**
   * 设置所有选项卡内容
   */
  setAllContent(data) {
    Object.entries(data).forEach(([id, content]) => {
      this.setContent(id, content);
    });
  }

  /**
   * 清空所有内容
   */
  clearAll() {
    this.tabs.forEach((tab, id) => {
      this.setContent(id, '');
    });
  }
}
