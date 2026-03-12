# Echarts-AI-Skill

<div align="center">

**给你的 AI Agent 一项图表技能。**

让 Agent 能根据结构化数据自动选图、生成稳定的 ECharts option，并导出 `HTML` / `SVG` 图表产物交付给用户。

[![Release](https://img.shields.io/github/v/release/davaded/Echarts-AI-Skill)](https://github.com/davaded/Echarts-AI-Skill/releases)
[![License](https://img.shields.io/github/license/davaded/Echarts-AI-Skill)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ECharts](https://img.shields.io/badge/ECharts-5.x-AA344D)](https://echarts.apache.org/)
[![Codex Skill](https://img.shields.io/badge/Codex-Skill-111111)](./SKILL.md)

[English](./README.md) | 简体中文

</div>

---

## 为什么做这个 Skill

现在的 AI Agent 已经很会写代码、改文档、跑流程了。
但用户一旦开始说：

- “用我这份销售数据生成一个饼图。”
- “把这组周数据做成柱状图对比一下。”
- “给我选一个合适的图，然后导出到桌面。”
- “把这个图导出成 SVG，我要塞进报告里。”

Agent 背后通常还缺一个稳定的图表执行层。

`Echarts-AI-Skill` 就是这层能力。

它给 Agent 提供一条确定性的链路：
**数据请求 -> 图表推荐 -> ECharts option -> 可交付图表产物**。

## 你的 Agent 现在能做什么

- 根据表格数据推荐 `line`、`bar`、`pie`、`scatter`
- 把 `ChartRequest -> ChartSpec -> ECharts option`
- 导出交互式 `HTML` 预览
- 导出适合报告、文档和嵌入场景的 `SVG`
- 支持 `desktop`、`home`、`~` 等友好的路径写法
- 按 [`SKILL.md`](./SKILL.md) 定义的 Codex Skill 工作流执行

## 用户可以怎么对 Agent 说

这类表达，才是这个仓库真正面向的使用方式：

- “用这份学习数据生成一个折线图。”
- “用我的分类汇总做一个饼图。”
- “帮我选最合适的图，然后把结果导出到桌面。”
- “把这个图渲染成 SVG，保存到我的报告目录。”

所以这个仓库的定位不是普通的 ECharts 封装库，
而是一个 **面向 Agent 的图表 Skill**。

## 快速开始

```powershell
npm install
npm run build
```

典型工作流：

```powershell
node dist/cli/recommend-chart.js --input examples\study-progress.request.json
node dist/cli/generate-chart.js --input examples\study-progress.request.json
node dist/cli/render-chart.js --input ~\Desktop\option.json --format html
node dist/cli/render-chart.js --input ~\Desktop\option.json --format svg
```

## Demo

- 产品化展示页：[`examples/product-demo.html`](./examples/product-demo.html)
- 学习趋势请求示例：[`examples/study-progress.request.json`](./examples/study-progress.request.json)
- 饼图请求示例：[`examples/pie-chart.request.json`](./examples/pie-chart.request.json)

如果你想看更像产品展示页的效果，直接在浏览器中打开 `examples/product-demo.html`。

## 面向 Agent 的请求示例

```json
{
  "title": "Category sales share",
  "chartType": "pie",
  "dataset": [
    { "category": "Books", "amount": 3200 },
    { "category": "Courses", "amount": 5100 },
    { "category": "Templates", "amount": 1700 }
  ],
  "categoryField": "category",
  "valueField": "amount"
}
```

这个请求更贴近用户真实会说的话：

> 用我的分类汇总数据生成一个饼图。

## 输出规则

- `--out`：写入精确文件路径
- `--out-dir`：写入指定目录，并自动使用默认文件名
- 输出路径支持 `desktop`、`home`、`~`
- 如果没有提供路径，默认优先输出到桌面；桌面不存在时回退到用户主目录

默认文件名：

- `recommend` -> `spec.json`
- `generate` -> `option.json`
- `render --format html` -> `preview.html`
- `render --format svg` -> `preview.svg`

## 项目结构

```text
src/
  cli/      命令行入口
  core/     推荐、构建和渲染核心
  types/    请求与规格类型
examples/   示例输入与展示页面
SKILL.md    Codex Skill 说明
```

## 范围

### 当前版本

- 结构化图表输入
- 图表推荐
- 稳定的 option 生成
- HTML 与 SVG 导出
- Codex Skill 工作流

### 下一步

- 自然语言转 `ChartRequest`
- 更丰富的图表类型和校验规则
- 图表解释与修正工作流
- MCP 服务封装

## 许可证

本项目采用 [MIT License](./LICENSE)。
