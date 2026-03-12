# Echarts-AI-Skill

<div align="center">

**Give your AI agent a charting skill.**

Turn structured data into the right chart, generate stable ECharts options, and export `HTML` / `SVG` artifacts your agent can hand back to users.

[![Release](https://img.shields.io/github/v/release/davaded/Echarts-AI-Skill)](https://github.com/davaded/Echarts-AI-Skill/releases)
[![License](https://img.shields.io/github/license/davaded/Echarts-AI-Skill)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ECharts](https://img.shields.io/badge/ECharts-5.x-AA344D)](https://echarts.apache.org/)
[![Codex Skill](https://img.shields.io/badge/Codex-Skill-111111)](./SKILL.md)

English | [简体中文](./README.zh-CN.md)

</div>

---

## Why This Skill Exists

AI agents are already good at writing code, editing docs, and automating workflows.
But when a user says:

- "Use my sales data and generate a pie chart."
- "Compare these weekly metrics and give me a bar chart."
- "Render this chart to SVG and save it to my Desktop."
- "Pick a suitable chart type from this table and export an HTML preview."

most agents still need a stable chart layer underneath.

`Echarts-AI-Skill` is that layer.

It gives your agent a deterministic path from **data request -> chart recommendation -> ECharts option -> exportable artifact**.

## What Your Agent Can Do Today

- Recommend `line`, `bar`, `pie`, and `scatter` from tabular data
- Convert `ChartRequest -> ChartSpec -> ECharts option`
- Export interactive `HTML` previews
- Export server-rendered `SVG` for docs, reports, and embedding
- Resolve friendly paths like `desktop`, `home`, and `~`
- Use a Codex-readable workflow defined in [`SKILL.md`](./SKILL.md)

## What Users Can Say To The Agent

Examples of the intended interaction style:

- "Use this study dataset and generate a line chart."
- "Use my category totals and make a pie chart."
- "Choose the best chart for this table, then export the result to my Desktop."
- "Render the chart as SVG and save it in my report folder."

This repo is not positioned as a generic ECharts wrapper.
It is positioned as an **agent skill for chart work**.

## Quick Start

```powershell
npm install
npm run build
```

Typical workflow:

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

If you want a more product-like local preview, open `examples/product-demo.html` in a browser.

## Example Agent-Oriented Request

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

This maps more naturally to what a user means when they say:

> Use my category totals and generate a pie chart.

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

## Scope

### Current

- Structured chart input
- Chart recommendation
- Deterministic option generation
- HTML and SVG export
- Codex skill workflow

### Next

- Natural language to `ChartRequest`
- More chart families and validation rules
- Chart explanation and refinement workflows
- MCP server packaging

## License

Released under the [MIT License](./LICENSE).
