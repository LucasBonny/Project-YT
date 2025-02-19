import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
    },
})

export class UsuarioService {
  listarTodos() {
    return axiosInstance.get('/usuario')
  }
  getUsuarioById(id: number) {
    return axiosInstance.get(`/usuario/${id}`)
  }
  createUsuario(usuario: any) {
    return axiosInstance.post('/usuario', usuario)
  }
  updateUsuario(usuario: any) {
    return axiosInstance.put(`/usuario/${usuario.id}`, usuario)
  }
  deleteUsuario(id: number) {
    return axiosInstance.delete(`/usuario/${id}`)
  }
}