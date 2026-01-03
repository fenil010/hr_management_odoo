"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", attendance: 95, leaves: 5 },
  { month: "Feb", attendance: 92, leaves: 8 },
  { month: "Mar", attendance: 88, leaves: 12 },
  { month: "Apr", attendance: 94, leaves: 6 },
  { month: "May", attendance: 96, leaves: 4 },
  { month: "Jun", attendance: 91, leaves: 9 },
  { month: "Jul", attendance: 89, leaves: 11 },
  { month: "Aug", attendance: 93, leaves: 7 },
  { month: "Sep", attendance: 95, leaves: 5 },
  { month: "Oct", attendance: 97, leaves: 3 },
  { month: "Nov", attendance: 94, leaves: 6 },
  { month: "Dec", attendance: 90, leaves: 10 },
];

export function AttendanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorLeaves" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="month" className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
        />
        <Area
          type="monotone"
          dataKey="attendance"
          stroke="#3b82f6"
          fillOpacity={1}
          fill="url(#colorAttendance)"
          name="Attendance %"
        />
        <Area
          type="monotone"
          dataKey="leaves"
          stroke="#ef4444"
          fillOpacity={1}
          fill="url(#colorLeaves)"
          name="Leaves %"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
