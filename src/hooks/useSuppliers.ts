import { useQuery } from "@tanstack/react-query"
import { fetchSuppliers } from "@/services/inventory.service"

export function useSuppliers() {
  return useQuery({ queryKey: ["suppliers"], queryFn: fetchSuppliers, staleTime: 1000 * 60 * 5 })
}
