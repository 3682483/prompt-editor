# Prompt 提示词编辑器

<div align="center">

✏️ 一款轻量级的提示词编写和管理工具

[在线演示](#) | [功能特性](#功能特性) | [快速开始](#快速开始) | [使用指南](#使用指南)

</div>

---

## 📖 项目简介

Prompt 提示词编辑器是一款轻量级 Web 工具，帮助 AI 应用用户通过**结构化表单**快速编写、管理和优化提示词。

### 核心价值

- 🎯 **降低门槛** - 表单化输入，无需记忆复杂语法
- ⚡ **提升效率** - 模板复用，快速生成提示词
- ✅ **保证质量** - 结构化组织，避免遗漏关键要素
- 🚀 **即开即用** - 无需安装，浏览器访问即可使用
- 🔒 **数据安全** - 本地存储，无需担心隐私泄露

---

## ✨ 功能特性

### 核心功能

- ✅ **6 个选项卡编辑系统** - Role, Task, Context, Constraints, Format, Examples
- ✅ **实时预览** - 编辑时即可看到最终提示词效果
- ✅ **本地存储** - 自动保存，刷新页面不丢失数据
- ✅ **5 个预设模板** - 代码审查、产品需求、内容创作等
- ✅ **导入/导出** - 支持 JSON 和 TXT 格式
- ✅ **一键复制** - 快速复制生成的提示词

### 高级功能

- 🌙 **暗黑模式** - 护眼和个性化体验
- ⌨️ **快捷键支持** - 提升编辑效率
- 📱 **响应式设计** - 支持桌面和移动端访问
- ♿ **无障碍支持** - 符合 WCAG 2.1 AA 标准

---

## 🚀 快速开始

### 在线访问

直接访问在线 Demo：[https://your-username.github.io/prompt-editor/](#)

### 本地运行

1. **克隆仓库**

```bash
git clone https://github.com/your-username/prompt-editor.git
cd prompt-editor
```

2. **启动本地服务器**

由于使用了 ES6 Modules，需要通过本地服务器运行：

```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx serve

# 或使用 VS Code Live Server 插件
```

3. **访问应用**

打开浏览器访问 `http://localhost:8000`

---

## 📚 使用指南

### 编辑提示词

1. 在左侧选择对应的选项卡（Role, Task 等）
2. 在文本框中输入内容
3. 右侧预览区会实时更新生成的提示词
4. 系统会自动保存（防抖 1 秒）

### 使用模板

1. 点击顶部的"选择模板"下拉框
2. 选择一个预设模板
3. 模板内容会自动填充到各选项卡
4. 可以继续编辑和自定义

### 导出提示词

- **复制到剪贴板**：点击"复制提示词"按钮
- **导出为 TXT**：点击"导出 TXT"按钮，下载 Markdown 文件
- **导出为 JSON**：点击"导出 JSON"按钮，包含所有编辑数据

### 导入数据

1. 点击"导入"按钮
2. 选择之前导出的 JSON 文件
3. 数据会自动恢复到编辑器

### 清除数据

1. 点击"清除"按钮
2. 确认对话框中点击"确认"
3. 所有数据将被清除（包括 localStorage）

---

## ⌨️ 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl/Cmd + S` | 手动保存 |
| `Ctrl/Cmd + Shift + C` | 复制预览内容 |
| `Ctrl/Cmd + 1-6` | 切换到对应选项卡 |
| `Ctrl/Cmd + E` | 导出 JSON |
| `Ctrl/Cmd + I` | 导入 JSON |
| `Ctrl/Cmd + D` | 切换主题 |

---

## 🛠️ 技术栈

- **前端框架**：原生 HTML5/CSS3/JavaScript (ES6+)
- **模块系统**：ES6 Modules
- **样式方案**：CSS3 + CSS Variables
- **存储方案**：localStorage API
- **部署平台**：GitHub Pages

### 项目结构

```
prompt-editor/
├── index.html              # 主页面
├── css/
│   ├── variables.css       # CSS 变量（主题）
│   ├── style.css          # 主样式
│   └── responsive.css     # 响应式样式
├── js/
│   ├── app.js             # 主应用入口
│   ├── modules/
│   │   ├── TabManager.js      # 选项卡管理
│   │   ├── PreviewGenerator.js # 预览生成
│   │   ├── StorageManager.js  # 存储管理
│   │   └── TemplateManager.js # 模板管理
│   ├── utils/
│   │   ├── debounce.js        # 防抖函数
│   │   ├── clipboard.js       # 剪贴板工具
│   │   └── formatter.js       # 格式化工具
│   └── config/
│       ├── tabs.js            # 选项卡配置
│       └── templates.js       # 预设模板
├── assets/
│   └── icons/                 # 图标资源
├── README.md                  # 项目说明
└── LICENSE                    # 开源协议
```

---

## 🎨 设计理念

本项目采用 **Apple 风格的现代极简主义设计**，核心理念：

> "最好的工具是让你忘记工具本身，专注于创造"

### 设计特点

- **极致简约** - 减少视觉噪音，突出内容本身
- **直觉性** - 零学习成本，一眼即懂
- **优雅性** - 每个像素都经过深思熟虑
- **高效性** - 减少认知负担，提升创作流

详细设计规范请查看 [UI 规范文档](.boss/prompt-editor/ui-spec.md)

---

## 🤝 贡献指南

欢迎贡献代码、报告 Bug 或提出新功能建议！

### 如何贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- JavaScript: 使用 ES6+ 语法
- CSS: 遵循 BEM 命名法
- Git: 遵循 [Conventional Commits](https://www.conventionalcommits.org/)

---

## 📝 开发计划

### Phase 1 - MVP ✅ (当前)

- [x] 6 个选项卡编辑系统
- [x] 实时预览
- [x] 本地存储
- [x] 预设模板
- [x] 导入/导出

### Phase 2 - 增强 (计划中)

- [ ] 自定义模板管理
- [ ] 更多预设模板
- [ ] 历史版本管理
- [ ] 导出为 PDF

### Phase 3 - 扩展 (未来)

- [ ] AI 提示词优化建议
- [ ] 提示词效果评分
- [ ] 社区模板库
- [ ] 云端同步

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 🙏 致谢

- 设计灵感来自 [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- 图标来自系统 Emoji
- 字体使用系统原生字体

---

<div align="center">

Made with ❤️ by [Your Name]

如果这个项目对你有帮助，请给一个 ⭐️ Star！

</div>
