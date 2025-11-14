// INVENTORY PAGE - FINAL LAYOUT FIXED & OPTIMIZED

import {
  useState,
  useMemo,
  useCallback,
  useTransition,
  lazy,
  Suspense,
} from "react"

import { useInventoryList, useDeleteItem } from "@/hooks/useInventory"
import { useSuppliers } from "@/hooks/useSuppliers"
import { useCategories } from "@/hooks/useCategories"

import { InventoryTable } from "./InventoryTable"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useDebounce } from "@/hooks/useDebounce"
import type { Item } from "@/services/inventory.service"

const AddEditItemDialog = lazy(() => import("./AddEditItemDialog"))
const AddCategoryDialog = lazy(() => import("./AddCategoryDialog"))

export default function InventoryPage() {
  const [page, setPage] = useState(1)
  const pageSize = 8

  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 350)

  const [category, setCategory] = useState<string | null>(null)
  const [editing, setEditing] = useState<Item | null>(null)

  const [isPending, startTransition] = useTransition()

  const { data, isLoading } = useInventoryList({
    page,
    pageSize,
    search: debouncedSearch,
    category,
  })

  const suppliersQ = useSuppliers()
  const categoriesQ = useCategories()
  const del = useDeleteItem()

  const items = useMemo(() => data?.items ?? [], [data])
  const total = data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  const handleDelete = useCallback(
    async (it: Item) => {
      if (!confirm(`Hapus item "${it.name}" ?`)) return
      await del.mutateAsync(it.id)
    },
    [del]
  )

  const handleEdit = useCallback((it: Item) => setEditing(it), [])

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
    },
    []
  )

  const handleChangeCategory = useCallback((v: string) => {
    startTransition(() => {
      setCategory(v === "all" ? null : v)
    })
  }, [])

  const handleNext = useCallback(() => {
    setPage((p) => Math.min(totalPages, p + 1))
  }, [totalPages])

  const handlePrev = useCallback(() => {
    setPage((p) => Math.max(1, p - 1))
  }, [])

  // Memoized Filter Bar
  const FilterBar = useMemo(
    () => (
      <div className="flex gap-3 items-center">
        <Input
          placeholder="Cari nama item..."
          value={search}
          onChange={handleSearchChange}
        />

        <Select onValueChange={handleChangeCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Filter kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            {categoriesQ.data?.map((c) => (
              <SelectItem key={c.id} value={c.name}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={() => {}}>
          <SelectTrigger>
            <SelectValue placeholder="Filter supplier (sederhana)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            {suppliersQ.data?.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ),
    [
      search,
      categoriesQ.data,
      suppliersQ.data,
      handleSearchChange,
      handleChangeCategory,
    ]
  )

  // Pagination
  const Pagination = useMemo(
    () => (
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Page {page} / {totalPages} — {total} items
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrev} disabled={page === 1}>
            Prev
          </Button>

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    ),
    [page, total, totalPages, handlePrev, handleNext]
  )

  return (
    <div className="flex flex-col h-full overflow-hidden gap-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Inventory</h1>

        <div className="flex items-center gap-2">
          <Suspense fallback={<Button disabled>Loading...</Button>}>
            <AddCategoryDialog>
              <Button variant="outline">Tambah Kategori</Button>
            </AddCategoryDialog>
          </Suspense>

          <Suspense fallback={<Button disabled>Loading...</Button>}>
            <AddEditItemDialog item={null}>
              <Button>Tambah Item</Button>
            </AddEditItemDialog>
          </Suspense>
        </div>
      </div>

      {/* FILTER BAR */}
      {FilterBar}

      {/* TABLE AREA (scroll only here) */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {isLoading || isPending ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
          <InventoryTable
            rows={items}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* PAGINATION */}
      {Pagination}

      {/* EDIT MODAL */}
      <Suspense fallback={<div>Loading...</div>}>
        {editing && (
          <AddEditItemDialog item={editing}>
            <></>
          </AddEditItemDialog>
        )}
      </Suspense>
    </div>
  )
}