import type { ChartField, ChartGoal, ChartRequest, ChartSpec, ChartType, DataRow } from "../types/chart.js";

const DEFAULT_WIDTH = 960;
const DEFAULT_HEIGHT = 540;

function isIsoLikeDate(value: string): boolean {
  return /^\d{4}[-/]\d{1,2}[-/]\d{1,2}/.test(value) || !Number.isNaN(Date.parse(value));
}

function inferFieldType(values: Array<DataRow[keyof DataRow]>): ChartField["type"] {
  const filtered = values.filter((value) => value !== null);
  if (filtered.length === 0) {
    return "unknown";
  }
  if (filtered.every((value) => typeof value === "number")) {
    return "number";
  }
  if (filtered.every((value) => typeof value === "boolean")) {
    return "boolean";
  }
  if (filtered.every((value) => typeof value === "string" && isIsoLikeDate(value))) {
    return "date";
  }
  if (filtered.every((value) => typeof value === "string")) {
    return "string";
  }
  return "unknown";
}

export function inferFields(dataset: DataRow[]): ChartField[] {
  if (dataset.length === 0) {
    return [];
  }
  const fieldNames = new Set<string>();
  for (const row of dataset) {
    Object.keys(row).forEach((key) => fieldNames.add(key));
  }
  return Array.from(fieldNames).map((name) => ({
    name,
    type: inferFieldType(dataset.map((row) => row[name] ?? null))
  }));
}

function firstField(fields: ChartField[], type: ChartField["type"]): string | undefined {
  return fields.find((field) => field.type === type)?.name;
}

function recommendGoal(request: ChartRequest, fields: ChartField[]): ChartGoal {
  if (request.goal && request.goal !== "unknown") {
    return request.goal;
  }
  if (request.chartType === "pie") {
    return "composition";
  }
  if (request.chartType === "scatter") {
    return "distribution";
  }
  const hasDate = fields.some((field) => field.type === "date");
  if (hasDate) {
    return "trend";
  }
  const numericCount = fields.filter((field) => field.type === "number").length;
  if (numericCount >= 2) {
    return "distribution";
  }
  return "comparison";
}

function recommendChartType(request: ChartRequest, fields: ChartField[]): ChartType {
  if (request.chartType) {
    return request.chartType;
  }
  if (request.xField && request.yField) {
    const xType = fields.find((field) => field.name === request.xField)?.type;
    const yType = fields.find((field) => field.name === request.yField)?.type;
    if (xType === "number" && yType === "number") {
      return "scatter";
    }
    if (xType === "date" || xType === "string") {
      return "line";
    }
  }
  const categoryField = request.categoryField ?? firstField(fields, "date") ?? firstField(fields, "string");
  const numericFields = fields.filter((field) => field.type === "number");
  if (categoryField && numericFields.length === 1 && request.dataset.length <= 12) {
    return "pie";
  }
  if (categoryField && numericFields.length >= 1) {
    const categoryType = fields.find((field) => field.name === categoryField)?.type;
    return categoryType === "date" ? "line" : "bar";
  }
  if (numericFields.length >= 2) {
    return "scatter";
  }
  return "bar";
}

function buildSeries(request: ChartRequest, chartType: ChartType, fields: ChartField[]) {
  if (request.series && request.series.length > 0) {
    return request.series;
  }
  if (chartType === "pie") {
    const valueField = request.valueField ?? firstField(fields, "number");
    return valueField ? [{ name: valueField, field: valueField }] : [];
  }
  if (request.yField) {
    return [{ name: request.yField, field: request.yField }];
  }
  const numericFields = fields.filter((field) => field.type === "number").map((field) => field.name);
  return numericFields.map((field) => ({ name: field, field }));
}

export function buildChartSpec(request: ChartRequest): ChartSpec {
  const fields = inferFields(request.dataset);
  const chartType = recommendChartType(request, fields);
  const goal = recommendGoal(request, fields);
  const categoryField =
    request.categoryField ??
    (chartType === "pie" ? firstField(fields, "string") : firstField(fields, "date") ?? firstField(fields, "string"));
  const xField = request.xField ?? (chartType === "scatter" ? firstField(fields, "number") : categoryField);
  const yField =
    request.yField ??
    (chartType === "scatter"
      ? fields.filter((field) => field.type === "number" && field.name !== xField)[0]?.name
      : firstField(fields, "number"));
  const valueField = request.valueField ?? yField;

  return {
    title: request.title,
    subtitle: request.subtitle,
    chartType,
    goal,
    dataset: request.dataset,
    categoryField,
    xField,
    yField,
    valueField,
    groupField: request.groupField,
    series: buildSeries(request, chartType, fields),
    width: request.width ?? DEFAULT_WIDTH,
    height: request.height ?? DEFAULT_HEIGHT,
    fields
  };
}
