import { useState, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Item } from "@/services/inventory.service"

type Props = {
  item: Item | null
  children: React.ReactNode
  onSave?: (data: Partial<Item>) => void
}

export default function AddEditItemDialog({ item, children, onSave }: Props) {
  const [open, setOpen] = useState(false)

  const [form, setForm] = useState({
    name: item?.name ?? "",
    category: item?.category ?? "",
    stock: item?.stock ?? 0,
    minimumStock: item?.minimumStock ?? 0,
    supplierId: item?.supplierId ?? "",
  })

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setForm((prev) => ({
        ...prev,
        [name]: name === "stock" || name === "minimumStock" ? Number(value) : value,
      }))
    },
    []
  )

  const handleSubmit = useCallback(() => {
    onSave?.(form)
    setOpen(false)
  }, [onSave, form])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? "Edit Item" : "Tambah Item"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            name="name"
            placeholder="Nama item"
            value={form.name}
            onChange={handleInput}
          />

          <Input
            name="category"
            placeholder="Kategori"
            value={form.category}
            onChange={handleInput}
          />

          <Input
            name="stock"
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={handleInput}
          />

          <Input
            name="minimumStock"
            placeholder="Minimum Stock"
            type="number"
            value={form.minimumStock}
            onChange={handleInput}
          />

          <Input
            name="supplierId"
            placeholder="Supplier ID"
            value={form.supplierId}
            onChange={handleInput}
          />
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            {item ? "Simpan Perubahan" : "Tambah"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}