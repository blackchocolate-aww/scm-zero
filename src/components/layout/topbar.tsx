import { memo, useCallback, useMemo, useTransition } from "react"
import { useAuthStore } from "@/store/auth"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"

// Precomputed dictionary → paling cepat
const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/inventory": "Inventory",
  "/suppliers": "Suppliers",
  "/purchase-order": "Purchase Order",
  "/stock-in": "Stock In",
  "/stock-out": "Stock Out",
  "/settings": "Settings",
}

function resolvePage(pathname: string) {
  const prefix = Object.keys(PAGE_TITLES).find((p) =>
    pathname.startsWith(p)
  )
  return prefix ? PAGE_TITLES[prefix] : "SCM System"
}

function TopbarBase() {
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [isPending, startTransition] = useTransition()

  const title = useMemo(() => resolvePage(pathname), [pathname])

  const handleLogout = useCallback(() => {
    startTransition(() => {
      logout()
      navigate("/login")
    })
  }, [logout, navigate])

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 w-full">
      <h1 className="font-semibold text-lg">
        {isPending ? "..." : title}
      </h1>

      <Button variant="destructive" onClick={handleLogout} disabled={isPending}>
        {isPending ? "Processing..." : "Logout"}
      </Button>
    </header>
  )
}

export const Topbar = memo(TopbarBase)