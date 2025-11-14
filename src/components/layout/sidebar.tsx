import {
  memo,
  useMemo,
  useCallback,
  useTransition,
  lazy,
  Suspense,
} from "react"
import { NavLink, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/useDebounce"
import { useVirtualizer } from "@tanstack/react-virtual"

const iconMap = {
  Home: lazy(() =>
    import("lucide-react").then((m) => ({ default: m.Home }))
  ),
  Boxes: lazy(() =>
    import("lucide-react").then((m) => ({ default: m.Boxes }))
  ),
  Users: lazy(() =>
    import("lucide-react").then((m) => ({ default: m.Users }))
  ),
  Repeat: lazy(() =>
    import("lucide-react").then((m) => ({ default: m.Repeat }))
  ),
  ShoppingCart: lazy(() =>
    import("lucide-react").then((m) => ({ default: m.ShoppingCart }))
  ),
  Settings: lazy(() =>
    import("lucide-react").then((m) => ({ default: m.Settings }))
  ),
}

const rawMenu = [
  { label: "Dashboard", iconName: "Home", to: "/dashboard" },
  { label: "Inventory", iconName: "Boxes", to: "/inventory" },
  { label: "Stock Movement", iconName: "Repeat", to: "/stock-movement" },
  { label: "Supplier", iconName: "Users", to: "/supplier" },
  { label: "Purchase Orders", iconName: "ShoppingCart", to: "/purchase-orders" },
  { label: "Settings", iconName: "Settings", to: "/settings" },
] as const

function SidebarBase() {
  const location = useLocation()
  const debouncedPath = useDebounce(location.pathname, 70)
  const [isPending, startTransition] = useTransition()

  const menu = useMemo(() => rawMenu, [])

  const rowVirtualizer = useVirtualizer({
    count: menu.length,
    estimateSize: () => 48,
    getScrollElement: () => document.getElementById("sidebar-scroll"),
  })

  const getNavClass = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
        "hover:bg-gray-100",
        isActive && "bg-gray-200 font-semibold",
        isPending && "opacity-50 pointer-events-none"
      ),
    [isPending]
  )

  return (
    <aside className="w-64 h-screen border-r bg-white flex flex-col">
      <div className="p-4 text-xl font-bold tracking-tight border-b">
        SCM System
      </div>

      <div
        id="sidebar-scroll"
        className="flex-1 overflow-auto relative"
      >
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((v) => {
            const item = menu[v.index]
            const Icon = iconMap[item.iconName as keyof typeof iconMap]

            const active = debouncedPath.startsWith(item.to)

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={getNavClass({ isActive: active })}
                style={{
                  position: "absolute",
                  top: v.start,
                  left: 0,
                  right: 0,
                }}
                onClick={() =>
                  startTransition(() => {
                  })
                }
              >
                <Suspense fallback={<div className="w-5 h-5 bg-gray-200 rounded-sm" />}>
                  <Icon className="w-5 h-5" />
                </Suspense>

                {item.label}
              </NavLink>
            )
          })}
        </div>
      </div>
    </aside>
  )
}

export const Sidebar = memo(SidebarBase)
