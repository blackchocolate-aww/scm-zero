import { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

type Props = {
  title: string
  value: string | number
  hint?: string
  children?: ReactNode
}

export function StatCard({ title, value, hint, children }: Props) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500">{title}</div>
            <div className="text-2xl font-semibold">{value}</div>
            {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
          </div>
          {children}
        </div>
      </CardContent>
    </Card>
  )
}
