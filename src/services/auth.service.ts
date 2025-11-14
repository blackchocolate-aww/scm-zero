// import axios from "axios"

// export async function loginService(username: string, password: string) {
//   const res = await axios.post("http://localhost:5000/login", {
//     username,
//     password,
//   })
//   return res.data.token
// }
export async function loginService(username: string, password: string) {
  if (username === "admin" && password === "admin") {
    return "dummy_token_admin"
  }
  throw new Error("Invalid login")
}


