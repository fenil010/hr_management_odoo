"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { department: "Engineering", employees: 45, color: "#3b82f6" },
  { department: "Marketing", employees: 28, color: "#10b981" },
  { department: "Sales", employees: 35, color: "#f59e0b" },
  { department: "HR", employees: 12, color: "#8b5cf6" },
  { department: "Finance", employees: 18, color: "#ef4444" },
  { department: "Support", employees: 22, color: "#06b6d4" },
];

export function DepartmentChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis type="number" className="text-xs" />
        <YAxis dataKey="department" type="category" width={80} className="text-xs" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
        />
        <Bar dataKey="employees" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
