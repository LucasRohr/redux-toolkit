import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import uuid from 'react-native-uuid'

import { cadastrarUsuario, logar as loginService } from 'src/services/usuarios'
import { LoginUserPayloadInterface, UserInitialStateInterface } from './interfaces'
import { Usuario } from 'src/types/usuario'
import server from 'assets/server'

const initialState: UserInitialStateInterface = {
  loggedUser: undefined,
  users: server.usuarios,
}

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    login: (state, action: PayloadAction<LoginUserPayloadInterface>) => {
      const payload = action.payload

      if (payload) {
        const user = loginService(payload?.emailOrCpf, payload?.password)

        if (!user) {
          throw Error('Invalid Email/CPF or password')
        }

        state.loggedUser = user
      } else {
        state.loggedUser = undefined
      }
    },
    logout: (state) => {
      state.loggedUser = undefined
    },
    register: (state, action: PayloadAction<Omit<Usuario, 'id'>>) => {
      const id = uuid.v4()
      const newUser = { ...action.payload, id }

      if (newUser.nome) {
        state.loggedUser = newUser
        state.users.push(newUser)
      } else {
        throw Error('Invalid fields, please check and try again')
      }
    },
    update: (state, action: PayloadAction<Usuario>) => {
      const updatedUser = action.payload
      const index = state.users.findIndex((user) => user.id === updatedUser.id)

      state.users[index] = updatedUser
    },
    remove: (state, action: PayloadAction<Usuario['id']>) => {
      const index = state.users.findIndex((user) => user.id === action.payload)

      state.users.splice(index, 1)
      state.loggedUser = undefined
    },
  },
})

const userReducer = userSlice.reducer

export { userReducer }
export const { login, logout, register, update, remove } = userSlice.actions
