/**
 * 选项卡配置
 * 定义 6 个编辑选项卡的基本信息
 */

export const tabsConfig = [
  {
    id: 'role',
    name: 'Role',
    label: '角色定义 (Role)',
    icon: '👤',
    placeholder: '例如：你是一位资深产品经理，有 10 年互联网产品经验...',
    hint: '定义 AI 扮演的角色或身份'
  },
  {
    id: 'task',
    name: 'Task',
    label: '任务描述 (Task)',
    icon: '🎯',
    placeholder: '例如：帮我分析以下用户反馈，提取核心需求...',
    hint: '明确具体的任务或目标'
  },
  {
    id: 'context',
    name: 'Context',
    label: '上下文信息 (Context)',
    icon: 'ℹ️',
    placeholder: '例如：这是一个电商平台项目的用户调研数据...',
    hint: '提供必要的背景信息'
  },
  {
    id: 'constraints',
    name: 'Constraints',
    label: '约束条件 (Constraints)',
    icon: '🛡️',
    placeholder: '例如：回复不超过 200 字，使用专业但易懂的语言...',
    hint: '设定限制和要求'
  },
  {
    id: 'format',
    name: 'Format',
    label: '输出格式 (Format)',
    icon: '📋',
    placeholder: '例如：用表格呈现，包含 3 列：需求、优先级、用户痛点...',
    hint: '指定输出的形式和结构'
  },
  {
    id: 'examples',
    name: 'Examples',
    label: '参考示例 (Examples)',
    icon: '📄',
    placeholder: '例如：参考以下格式：\n\n## 需求 1\n**内容**：用户希望...\n**优先级**：高\n**痛点**：...',
    hint: '提供示例或样例输出'
  }
];
