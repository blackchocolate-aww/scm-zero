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

type Props = {
  children: React.ReactNode
  onSave?: (name: string) => void
}

export default function AddCategoryDialog({ children, onSave }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")

  const handleSave = useCallback(() => {
    if (!name.trim()) return
    onSave?.(name.trim())
    setName("")
    setOpen(false)
  }, [name, onSave])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Kategori</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Nama kategori"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <DialogFooter>
          <Button onClick={handleSave}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}