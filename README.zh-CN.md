# Echarts-AI-Skill

<div align="center">

**一个面向 Codex 的 Skill 优先 ECharts 工具集，用来自动选图、生成稳定 option，并导出 HTML/SVG 图表产物。**

[![Release](https://img.shields.io/github/v/release/davaded/Echarts-AI-Skill)](https://github.com/davaded/Echarts-AI-Skill/releases)
[![License](https://img.shields.io/github/license/davaded/Echarts-AI-Skill)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ECharts](https://img.shields.io/badge/ECharts-5.x-AA344D)](https://echarts.apache.org/)
[![Codex Skill](https://img.shields.io/badge/Codex-Skill-111111)](./SKILL.md)

[English](./README.md) | 简体中文

</div>

## 项目简介

`Echarts-AI-Skill` 是一个轻量级 TypeScript 项目，面向“助手驱动的图表工作流”。
它接收一个简洁的 `ChartRequest`，自动推荐合适的图表类型，生成稳定的 ECharts option，并进一步导出可嵌入系统的 `HTML` 或服务端渲染 `SVG`。

当前项目优先服务于 **Codex 本地 Skill 工作流**，同时保持核心层足够干净，便于后续抽离成 MCP 服务。

## 当前已支持能力

- 支持 `line`、`bar`、`pie`、`scatter` 四类图表推荐
- 支持稳定的 `ChartRequest -> ChartSpec -> ECharts option` 转换链路
- 支持导出交互式 `HTML` 预览
- 支持导出适合报告、文档和嵌入场景的 `SVG`
- 支持 `desktop`、`home`、`~` 等友好的输出路径
- 自带可被 Codex 读取的技能说明 [`SKILL.md`](./SKILL.md)

## 快速开始

```powershell
npm install
npm run build
```

使用仓库内示例直接生成：

```powershell
node dist/cli/recommend-chart.js --input examples\study-progress.request.json
node dist/cli/generate-chart.js --input examples\study-progress.request.json
node dist/cli/render-chart.js --input ~\Desktop\option.json --format html
node dist/cli/render-chart.js --input ~\Desktop\option.json --format svg
```

## Demo 示例

- 产品化展示页：[`examples/product-demo.html`](./examples/product-demo.html)
- 学习趋势请求示例：[`examples/study-progress.request.json`](./examples/study-progress.request.json)
- 饼图请求示例：[`examples/pie-chart.request.json`](./examples/pie-chart.request.json)

如果你想看更像仓库首页展示的效果，直接在浏览器里打开 `examples/product-demo.html`。

## 请求示例

```json
{
  "title": "Study completion trend",
  "goal": "trend",
  "dataset": [
    { "day": "2026-03-01", "completionRate": 62, "targetRate": 75 },
    { "day": "2026-03-02", "completionRate": 68, "targetRate": 75 }
  ],
  "xField": "day",
  "series": [
    { "name": "Completion", "field": "completionRate" },
    { "name": "Target", "field": "targetRate" }
  ]
}
```

## 输出规则

- `--out`：写入精确文件路径
- `--out-dir`：写入指定目录，并自动使用默认文件名
- 输出路径支持 `desktop`、`home`、`~`
- 如果不提供输出路径，默认优先写到桌面；若桌面不存在则回退到用户主目录

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

## 当前范围与后续路线

### 当前范围

- 结构化图表输入
- 稳定的推荐与 option 生成
- HTML 与 SVG 导出
- Codex Skill 工作流

### 后续路线

- 自然语言转 `ChartRequest`
- 更丰富的图表类型和校验规则
- 图表解释与修正工作流
- MCP 服务封装

## 许可证

本项目采用 [MIT License](./LICENSE)。
