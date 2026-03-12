# Echarts-AI-Skill

`Echarts-AI-Skill` is a local Codex-oriented chart generation skill built on top of ECharts.

It focuses on three practical workflows:

- generate chart options from a simple structured request
- recommend a chart type from tabular data
- export embeddable `HTML` and `SVG` previews

## What It Does

The project is designed as a skill-first implementation that can later be extracted into an MCP server.

Current capabilities:

- chart recommendation for `line`, `bar`, `pie`, and `scatter`
- deterministic `ChartRequest -> ChartSpec -> ECharts option`
- HTML preview export
- SVG export through ECharts SSR
- user-friendly output path handling

## Project Structure

```text
src/
  cli/      command entrypoints
  core/     recommendation, option building, rendering
  types/    request/spec types
examples/   sample input files
SKILL.md    skill instructions for Codex
```

## Install

```powershell
npm install
npm run build
```

## Example

Generate a chart option from the bundled example:

```powershell
node dist/cli/recommend-chart.js --input examples\study-progress.request.json
node dist/cli/generate-chart.js --input examples\study-progress.request.json
node dist/cli/render-chart.js --input ~\Desktop\option.json --format html
node dist/cli/render-chart.js --input ~\Desktop\option.json --format svg
```

Default output behavior:

- `--out` writes to an exact file path
- `--out-dir` writes into a target directory using the default output filename
- `desktop`, `home`, and `~` are supported in output paths
- if no output path is supplied, files default to Desktop and fall back to the user home directory

## ChartRequest Example

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

## Roadmap

- natural language to `ChartRequest`
- richer chart families
- validation and chart explanation
- MCP server packaging
