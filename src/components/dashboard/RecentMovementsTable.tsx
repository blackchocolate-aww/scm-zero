import { format } from "date-fns"

type Movement = {
  id: string
  item: string
  type: "IN" | "OUT" | "ADJUST"
  qty: number
  date: string
}

export function RecentMovementsTable({ rows }: { rows: Movement[] }) {
  return (
    <div className="bg-white/60 rounded-md shadow-sm overflow-hidden">
      <table className="min-w-full divide-y">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Item</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Qty</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="px-4 py-2 text-sm text-gray-700">{format(new Date(r.date), "dd MMM yyyy")}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{r.item}</td>
              <td className="px-4 py-2 text-sm">
                <span
                  className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                    r.type === "IN" ? "bg-green-100 text-green-800" : r.type === "OUT" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {r.type}
                </span>
              </td>
              <td className="px-4 py-2 text-sm text-right text-gray-700">{r.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
