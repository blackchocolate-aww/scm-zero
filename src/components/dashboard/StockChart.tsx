import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts"

type Point = { date: string; in: number; out: number }

export function StockChart({ data }: { data: Point[] }) {
  return (
    <div className="w-full h-64 bg-white/60 rounded-md p-3 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="in" name="Stock In" stroke="#10b981" strokeWidth={2} />
          <Line type="monotone" dataKey="out" name="Stock Out" stroke="#ef4444" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
