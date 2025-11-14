import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"
import { Outlet } from "react-router-dom"

export function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>

      </div>
    </div>
  )
}
