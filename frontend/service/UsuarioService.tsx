import { Projeto } from '@/types'
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
  inserir(usuario : Projeto.Usuario) {
    return axiosInstance.post('/usuario', usuario)
  }
  alterar(usuario: Projeto.Usuario) {
    return axiosInstance.put(`/usuario/${usuario.id}`, usuario)
  }
  excluir(id: number) {
    return axiosInstance.delete(`/usuario/${id}`)
  }
}