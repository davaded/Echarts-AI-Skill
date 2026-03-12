import type { ChartOption, ChartSeriesInput, ChartSeriesOption, ChartSpec, DataRow } from "../types/chart.js";

function categoryValue(row: DataRow, field: string | undefined): string | number | null {
  if (!field) {
    return null;
  }
  return (row[field] as string | number | null) ?? null;
}

function numberValue(row: DataRow, field: string | undefined): number | null {
  if (!field) {
    return null;
  }
  const value = row[field];
  return typeof value === "number" ? value : null;
}

function buildCartesianSeries(spec: ChartSpec, type: "line" | "bar"): ChartSeriesOption[] {
  return spec.series.map((series: ChartSeriesInput) => ({
    name: series.name,
    type,
    smooth: type === "line",
    data: spec.dataset.map((row) => numberValue(row, series.field))
  }));
}

function buildScatterSeries(spec: ChartSpec): ChartSeriesOption[] {
  return [
    {
      name: spec.title ?? "Scatter",
      type: "scatter",
      data: spec.dataset.map((row) => [
        numberValue(row, spec.xField),
        numberValue(row, spec.yField)
      ])
    }
  ];
}

function buildPieSeries(spec: ChartSpec): ChartSeriesOption[] {
  const valueField = spec.valueField;
  return [
    {
      name: spec.title ?? "Pie",
      type: "pie",
      radius: "60%",
      data: spec.dataset.map((row) => ({
        name: String(categoryValue(row, spec.categoryField) ?? ""),
        value: numberValue(row, valueField) ?? 0
      }))
    }
  ];
}

export function buildOption(spec: ChartSpec): ChartOption {
  const title = spec.subtitle
    ? { text: spec.title, subtext: spec.subtitle, left: "center" }
    : { text: spec.title, left: "center" };

  if (spec.chartType === "pie") {
    return {
      title,
      tooltip: { trigger: "item" },
      legend: { bottom: 0 },
      series: buildPieSeries(spec)
    };
  }

  if (spec.chartType === "scatter") {
    return {
      title,
      tooltip: { trigger: "item" },
      xAxis: { type: "value", name: spec.xField },
      yAxis: { type: "value", name: spec.yField },
      series: buildScatterSeries(spec)
    };
  }

  const axisData = spec.dataset.map((row) => categoryValue(row, spec.categoryField));
  return {
    title,
    tooltip: { trigger: "axis" },
    legend: { top: 28 },
    grid: { left: 48, right: 24, top: 72, bottom: 48 },
    xAxis: {
      type: "category",
      name: spec.categoryField,
      boundaryGap: spec.chartType === "bar",
      data: axisData
    },
    yAxis: {
      type: "value"
    },
    series: buildCartesianSeries(spec, spec.chartType)
  };
}
