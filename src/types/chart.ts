export type ChartType = "line" | "bar" | "pie" | "scatter";

export type ChartGoal = "trend" | "comparison" | "composition" | "distribution" | "unknown";

export type Primitive = string | number | boolean | null;

export type DataRow = Record<string, Primitive>;

export type ChartOption = Record<string, unknown>;
export type ChartSeriesOption = Record<string, unknown>;

export interface ChartSeriesInput {
  name: string;
  field: string;
}

export interface ChartRequest {
  title?: string;
  subtitle?: string;
  description?: string;
  chartType?: ChartType;
  goal?: ChartGoal;
  dataset: DataRow[];
  categoryField?: string;
  xField?: string;
  yField?: string;
  valueField?: string;
  groupField?: string;
  series?: ChartSeriesInput[];
  width?: number;
  height?: number;
}

export interface ChartField {
  name: string;
  type: "number" | "string" | "boolean" | "date" | "unknown";
}

export interface ChartSpec {
  title?: string;
  subtitle?: string;
  chartType: ChartType;
  goal: ChartGoal;
  dataset: DataRow[];
  categoryField?: string;
  xField?: string;
  yField?: string;
  valueField?: string;
  groupField?: string;
  series: ChartSeriesInput[];
  width: number;
  height: number;
  fields: ChartField[];
}
