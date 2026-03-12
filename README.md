# Echarts-AI-Skill

> AI-assisted ECharts skill for Codex and scriptable chart generation.  
> 面向 Codex 的 ECharts 图表技能项目，支持自动选图、结构化出图与 HTML/SVG 导出。

## Overview | 项目简介

**English**

`Echarts-AI-Skill` is a skill-first TypeScript project that turns lightweight chart requests into deterministic ECharts options and exportable artifacts. It is designed for local assistant workflows first, while keeping the core clean enough to evolve into an MCP server later.

**中文**

`Echarts-AI-Skill` 是一个以 Skill 为优先形态的 TypeScript 项目。它把轻量级图表请求转换成稳定的 ECharts option，并支持导出 HTML 和 SVG。当前重点是本地助手工作流，后续可以平滑演进为 MCP 服务。

## Highlights | 核心能力

**English**

- Recommends `line`, `bar`, `pie`, and `scatter` from tabular input
- Converts `ChartRequest -> ChartSpec -> ECharts option`
- Exports embeddable `HTML` and server-rendered `SVG`
- Supports friendly output paths like `desktop`, `home`, and `~`
- Ships with a Codex-readable [`SKILL.md`](./SKILL.md)

**中文**

- 支持根据表格数据自动推荐 `line`、`bar`、`pie`、`scatter`
- 支持 `ChartRequest -> ChartSpec -> ECharts option` 的稳定转换
- 支持导出可嵌入系统的 `HTML` 与服务端渲染 `SVG`
- 支持 `desktop`、`home`、`~` 等友好的输出路径写法
- 自带可被 Codex 直接读取的 [`SKILL.md`](./SKILL.md)

## Product Demo | 产品化示例

**English**

Open [`examples/product-demo.html`](./examples/product-demo.html) to see a more product-like showcase page with three chart panels, positioning copy, and a visual treatment that fits a repo homepage demo.

**中文**

打开 [`examples/product-demo.html`](./examples/product-demo.html) 可以看到一个更像产品首页展示的 demo：包含三块图表面板、产品定位文案和更完整的视觉包装，适合作为仓库首页示例。

## Repository Structure | 目录结构

```text
src/
  cli/      command entrypoints | 命令行入口
  core/     recommendation, option building, rendering | 推荐、构建与渲染核心
  types/    request/spec types | 请求与规格类型
examples/   sample inputs and demo pages | 示例输入与演示页面
SKILL.md    skill instructions for Codex | Codex 技能说明
```

## Quick Start | 快速开始

```powershell
npm install
npm run build
```

### Example Commands | 示例命令

```powershell
node dist/cli/recommend-chart.js --input examples\study-progress.request.json
node dist/cli/generate-chart.js --input examples\study-progress.request.json
node dist/cli/render-chart.js --input ~\Desktop\option.json --format html
node dist/cli/render-chart.js --input ~\Desktop\option.json --format svg
```

### Output Rules | 输出规则

**English**

- `--out` writes to an exact file path
- `--out-dir` writes to a specific directory using the default output filename
- `desktop`, `home`, and `~` are supported in output paths
- if no path is provided, the tool defaults to Desktop and falls back to the user home directory

**中文**

- `--out` 用于写入精确文件路径
- `--out-dir` 用于指定输出目录，文件名自动使用默认值
- 输出路径支持 `desktop`、`home`、`~`
- 如果没有提供输出路径，默认优先写到桌面，不存在桌面时回退到用户主目录

## ChartRequest Example | 请求示例

```json
{
  "title": "Study completion trend",
  "dataset": [
    { "day": "2026-03-01", "completionRate": 62, "targetRate": 75 },
    { "day": "2026-03-02", "completionRate": 68, "targetRate": 75 }
  ],
  "goal": "trend",
  "xField": "day",
  "series": [
    { "name": "Completion", "field": "completionRate" },
    { "name": "Target", "field": "targetRate" }
  ]
}
```

## Roadmap | 后续计划

**English**

- natural language to `ChartRequest`
- richer chart families and validation
- explanation and refinement workflows
- MCP server packaging

**中文**

- 自然语言转 `ChartRequest`
- 更丰富的图表类型与校验能力
- 图表解释与修正工作流
- 演进为 MCP 服务

## License | 许可证

This project is released under the [MIT License](./LICENSE).
本项目采用 [MIT License](./LICENSE)。
