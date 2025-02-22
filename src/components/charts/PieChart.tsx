"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface PieChartProps {
  data: any; // You can replace 'any' with a more specific type if needed
  options?: ChartOptions;
}

export default function PieChart({ data, options }: PieChartProps) {
  return <Pie data={data} options={options} />;
} 