import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function useTestQuery() {
  return useQuery({
    queryKey: ["axiosTest"],
    queryFn: async () => {
      const res = await axios.get("https://httpbin.org/get")
      return res.data
    }
  })
}
