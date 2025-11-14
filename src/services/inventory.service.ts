import { v4 as uuidv4 } from "uuid"

export type Item = {
  id: string
  name: string
  category: string
  unit: "pcs"
  stock: number
  minimumStock: number
  supplierId: string
}

export type Supplier = { id: string; name: string }
export type Category = { id: string; name: string }

const suppliers: Supplier[] = [
  { id: "sup-1", name: "PT Bahan Sehat" },
  { id: "sup-2", name: "CV Agro" },
  { id: "sup-3", name: "Supplier Lokal" },
]

const categories: Category[] = [
  { id: "cat-1", name: "Bahan Baku" },
  { id: "cat-2", name: "Produk Jadi" },
  { id: "cat-3", name: "Kemasan" },
  { id: "cat-4", name: "Lainnya" },
]

// initial dummy items
let items: Item[] = Array.from({ length: 28 }).map((_, i) => ({
  id: uuidv4(),
  name: `Item ${i + 1}`,
  category: categories[i % categories.length].name,
  unit: "pcs",
  stock: Math.floor(Math.random() * 200),
  minimumStock: Math.floor(Math.random() * 30),
  supplierId: suppliers[i % suppliers.length].id,
}))

// Simulate network latency
const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms))

export async function fetchSuppliers() {
  await delay()
  return suppliers.slice()
}

export async function fetchCategories() {
  await delay()
  return categories.slice()
}

export async function createCategory(name: string) {
  await delay()
  const c = { id: uuidv4(), name }
  categories.push(c)
  return c
}

/**
 * Fetch paginated items with optional search & category filter
 * page: 1-based
 */
export async function fetchItems({
  page = 1,
  pageSize = 10,
  search = "",
  category,
}: {
  page?: number
  pageSize?: number
  search?: string
  category?: string | null
}) {
  await delay()
  let list = items.slice()
  if (search) {
    const s = search.toLowerCase()
    list = list.filter((it) => it.name.toLowerCase().includes(s))
  }
  if (category) {
    list = list.filter((it) => it.category === category)
  }
  const total = list.length
  const start = (page - 1) * pageSize
  const pageItems = list.slice(start, start + pageSize)
  return { items: pageItems, total }
}

export async function createItem(payload: Omit<Item, "id">) {
  await delay()
  const newItem: Item = { id: uuidv4(), ...payload }
  items.unshift(newItem)
  return newItem
}

export async function updateItem(id: string, payload: Partial<Item>) {
  await delay()
  const idx = items.findIndex((it) => it.id === id)
  if (idx === -1) throw new Error("Item not found")
  items[idx] = { ...items[idx], ...payload }
  return items[idx]
}

export async function deleteItem(id: string) {
  await delay()
  items = items.filter((it) => it.id !== id)
  return { ok: true }
}
