import { StatCard } from "@/components/dashboard/StatCard"
import { StockChart } from "@/components/dashboard/StockChart"
import { RecentMovementsTable } from "@/components/dashboard/RecentMovementsTable"
import { useDashboardData } from "@/hooks/useDashboardData"

export default function DashboardPage() {
  const { data, isLoading } = useDashboardData()

  if (isLoading || !data) {
    return <div className="p-6">Loading dashboard…</div>
  }

  const { stats, chart, movements } = data

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Items" value={stats.totalItems} hint="Total SKU aktif" />
        <StatCard title="Low Stock" value={stats.lowStockCount} hint="Perlu restock" />
        <StatCard title="Total Suppliers" value={stats.totalSuppliers} hint="Supplier terdaftar" />
        <StatCard title="Pending POs" value={stats.pendingPOs} hint="PO belum diterima" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="col-span-1">
          <div className="text-sm font-medium mb-2">Stock In vs Stock Out (7 days)</div>
          <StockChart data={chart} />
        </div>

        <div>
          <div className="text-sm font-medium mb-2">Recent Stock Movements</div>
          <RecentMovementsTable rows={movements} />
        </div>
      </div>
    </div>
  )
}
