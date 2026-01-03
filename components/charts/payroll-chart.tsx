"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", payroll: 720000, bonus: 45000 },
  { month: "Feb", payroll: 725000, bonus: 38000 },
  { month: "Mar", payroll: 730000, bonus: 52000 },
  { month: "Apr", payroll: 735000, bonus: 41000 },
  { month: "May", payroll: 740000, bonus: 48000 },
  { month: "Jun", payroll: 745000, bonus: 55000 },
  { month: "Jul", payroll: 750000, bonus: 42000 },
  { month: "Aug", payroll: 755000, bonus: 49000 },
  { month: "Sep", payroll: 760000, bonus: 46000 },
  { month: "Oct", payroll: 765000, bonus: 53000 },
  { month: "Nov", payroll: 770000, bonus: 58000 },
  { month: "Dec", payroll: 780000, bonus: 85000 },
];

export function PayrollChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="month" className="text-xs" />
        <YAxis className="text-xs" tickFormatter={(value) => `$${value / 1000}k`} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          formatter={(value) => value !== undefined ? [`$${Number(value).toLocaleString()}`, ""] : ["", ""]}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="payroll"
          stroke="#8b5cf6"
          strokeWidth={2}
          dot={{ fill: "#8b5cf6" }}
          name="Monthly Payroll"
        />
        <Line
          type="monotone"
          dataKey="bonus"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ fill: "#10b981" }}
          name="Bonuses"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
