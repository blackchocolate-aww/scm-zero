import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { Item } from "@/services/inventory.service"
import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
} from "@/services/inventory.service"

export function useInventoryList({
  page,
  pageSize,
  search,
  category,
}: {
  page: number
  pageSize: number
  search?: string
  category?: string | null
}) {
  return useQuery({
    queryKey: ["inventory", page, pageSize, search ?? "", category ?? ""],
    queryFn: () => fetchItems({ page, pageSize, search, category }),
    placeholderData: (prev) => prev, // pengganti keepPreviousData
  })
}

export function useCreateItem() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (payload: Omit<Item, "id">) => createItem(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["inventory"] })
    },
  })
}

export function useUpdateItem() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Item> }) =>
      updateItem(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["inventory"] })
    },
  })
}

export function useDeleteItem() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteItem(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["inventory"] })
    },
  })
}
