import { useTestQuery } from "@/features/test/testQuery"

function App() {
  const { data, isLoading } = useTestQuery()

  if (isLoading) return "Loading..."

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
