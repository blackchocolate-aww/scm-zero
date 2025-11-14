import { useQuery } from "@tanstack/react-query"
import { format, subDays } from "date-fns"

type Stat = {
  totalItems: number
  lowStockCount: number
  totalSuppliers: number
  pendingPOs: number
}

type Movement = {
  id: string
  item: string
  type: "IN" | "OUT" | "ADJUST"
  qty: number
  date: string
}

type ChartPoint = { date: string; in: number; out: number }

function makeDummyStats(): Stat {
  return {
    totalItems: 128,
    lowStockCount: 9,
    totalSuppliers: 12,
    pendingPOs: 3,
  }
}

function makeDummyMovements(): Movement[] {
  const items = ["Beras 500g", "Sereal A", "Oat 1kg", "Chia Seed", "Konjac Powder"]
  const types: Movement["type"][] = ["IN", "OUT", "ADJUST"]
  const out: Movement[] = []
  for (let i = 0; i < 8; i++) {
    out.push({
      id: `mv-${i + 1}`,
      item: items[i % items.length],
      type: types[i % types.length],
      qty: Math.floor(Math.random() * 50) + 1,
      date: format(subDays(new Date(), i), "yyyy-MM-dd"),
    })
  }
  return out
}

function makeDummyChart(): ChartPoint[] {
  const data: ChartPoint[] = []
  for (let i = 6; i >= 0; i--) {
    const day = subDays(new Date(), i)
    data.push({
      date: format(day, "MM-dd"),
      in: Math.floor(Math.random() * 40) + 10,
      out: Math.floor(Math.random() * 30) + 5,
    })
  }
  return data
}

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const stats = makeDummyStats()
      const movements = makeDummyMovements()
      const chart = makeDummyChart()
      return { stats, movements, chart }
    },
    staleTime: 1000 * 60 * 2,
  })
}
