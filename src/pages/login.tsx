import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"

import { loginService } from "@/services/auth.service"
import { useAuthStore } from "@/store/auth"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const schema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
})

export default function LoginPage() {
  const navigate = useNavigate()
  const setToken = useAuthStore((s) => s.setToken)
  const [error, setError] = useState("")

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (values: any) => {
    setError("")
    try {
      const token = await loginService(values.username, values.password)
      setToken(token)
      navigate("/dashboard")
    } catch {
      setError("Username atau password salah")
    }
  }

  return (
    <div className="relative w-full h-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=60')",
        }}
      />

      {/* Overlay + blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Card form */}
      <div className="relative flex items-center justify-center h-full px-4">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-xl border-none">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Login SCM</h1>

            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label>Username</Label>
                <Input
                  placeholder="Masukkan username"
                  {...register("username")}
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
              </div>

              <Button className="w-full" disabled={formState.isSubmitting}>
                {formState.isSubmitting ? "Memproses..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
