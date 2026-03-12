# Echarts-AI-Skill

<div align="center">

**A skill-first ECharts toolkit for Codex that recommends charts, generates deterministic options, and exports HTML/SVG artifacts.**

[![Release](https://img.shields.io/github/v/release/davaded/Echarts-AI-Skill)](https://github.com/davaded/Echarts-AI-Skill/releases)
[![License](https://img.shields.io/github/license/davaded/Echarts-AI-Skill)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ECharts](https://img.shields.io/badge/ECharts-5.x-AA344D)](https://echarts.apache.org/)
[![Codex Skill](https://img.shields.io/badge/Codex-Skill-111111)](./SKILL.md)

English | [简体中文](./README.zh-CN.md)

</div>

## Overview

`Echarts-AI-Skill` is a lightweight TypeScript project for assistant-driven chart workflows.
It takes a compact `ChartRequest`, recommends a suitable chart type, converts it into a deterministic ECharts option, and exports embeddable `HTML` or server-rendered `SVG`.

The current project is optimized for **local skill usage in Codex** while keeping the core clean enough to evolve into an MCP server later.

## What It Supports Today

- Chart recommendation for `line`, `bar`, `pie`, and `scatter`
- Deterministic pipeline: `ChartRequest -> ChartSpec -> ECharts option`
- Export to `HTML` for interactive preview
- Export to `SVG` for reports, docs, and embedding
- Friendly output path handling with `desktop`, `home`, and `~`
- A Codex-readable workflow definition in [`SKILL.md`](./SKILL.md)

## Quick Start

```powershell
npm install
npm run build
```

Generate from the bundled example:

```powershell
node dist/cli/recommend-chart.js --input examples\study-progress.request.json
node dist/cli/generate-chart.js --input examples\study-progress.request.json
node dist/cli/render-chart.js --input ~\Desktop\option.json --format html
node dist/cli/render-chart.js --input ~\Desktop\option.json --format svg
```

## Demo

- Product-style showcase page: [`examples/product-demo.html`](./examples/product-demo.html)
- Study trend request: [`examples/study-progress.request.json`](./examples/study-progress.request.json)
- Pie chart request: [`examples/pie-chart.request.json`](./examples/pie-chart.request.json)

If you want a repo-homepage-style local demo, open `examples/product-demo.html` in a browser.

## Example Request

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

## Output Rules

- `--out` writes to an exact file path
- `--out-dir` writes to a directory using the default output filename
- `desktop`, `home`, and `~` are supported in path resolution
- If no path is provided, output defaults to Desktop and falls back to the user home directory

Default filenames:

- `recommend` -> `spec.json`
- `generate` -> `option.json`
- `render --format html` -> `preview.html`
- `render --format svg` -> `preview.svg`

## Project Structure

```text
src/
  cli/      command entrypoints
  core/     recommendation, option building, rendering
  types/    request/spec types
examples/   sample inputs and demo pages
SKILL.md    Codex skill instructions
```

## Current Scope vs Roadmap

### In Scope

- Structured chart input
- Deterministic recommendation and option generation
- HTML and SVG export
- Codex skill workflow

### Planned

- Natural language to `ChartRequest`
- More chart families and validation rules
- Chart explanation and refinement workflows
- MCP server packaging

## License

Released under the [MIT License](./LICENSE).
