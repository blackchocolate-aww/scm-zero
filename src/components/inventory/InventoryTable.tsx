import { memo, useMemo, useRef } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Item } from "@/services/inventory.service"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { useVirtualizer } from "@tanstack/react-virtual"

function InventoryTableBase({
  rows,
  onEdit,
  onDelete,
}: {
  rows: Item[]
  onEdit: (item: Item) => void
  onDelete: (item: Item) => void
}) {
  const data = useMemo(() => rows, [rows])

  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 5,
  })

  return (
    <div
      ref={parentRef}
      className="bg-white/70 rounded-md shadow-sm overflow-auto"
      style={{ height: "480px" }}
    >
      <Table className="table-fixed w-full">
        {/* Sticky Header */}
        <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
          <TableRow>
            <TableHead className="w-[30%]">Nama</TableHead>
            <TableHead className="w-[20%] text-center">Category</TableHead>
            <TableHead className="w-[10%] text-center">Stock</TableHead>
            <TableHead className="w-[10%] text-center">Min Stock</TableHead>
            <TableHead className="w-[15%] text-center">Supplier</TableHead>
            <TableHead className="w-[15%] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody
          style={{
            height: rowVirtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const r = data[virtualRow.index]

            return (
              <TableRow
                key={r.id}
                style={{
                  position: "absolute",
                  top: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <TableCell className="w-[30%]">{r.name}</TableCell>
                <TableCell className="w-[20%] text-center">
                  {r.category}
                </TableCell>
                <TableCell className="w-[10%] text-center">
                  {r.stock}
                </TableCell>
                <TableCell className="w-[10%] text-center">
                  {r.minimumStock}
                </TableCell>
                <TableCell className="w-[15%] text-center">
                  {r.supplierId}
                </TableCell>

                {/* ACTIONS */}
                <TableCell className="w-[15%] text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(r)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(r)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export const InventoryTable = memo(InventoryTableBase)