import { createContext, ReactNode, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { UserData } from '../interfaces/UserData'

import { getUsers, saveUser } from '../services/api'

interface UserContextProps {
  getAuthUser: () => UserData
  login: (user: UserData) => void
  logout: () => void
  signup: (user: UserData) => void
}

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserData>({
    username: '',
    email: '',
    password: '',
  })

  function getAuthUser(): UserData {
    return user
  }

  function login(user: UserData): void {
    ;(async () => {
      const usersReq = await getUsers()
      const existingUsers = usersReq.data

      //console.log(existingUsers)

      let auth = false

      existingUsers.forEach((u) => {
        if (
          u.username === user.username &&
          u.email === user.email &&
          u.password === user.password
        ) {
          toast.success(`Usuário logado com sucesso.`)
          setUser(user)
          auth = true
        }
      })

      if (auth === false) {
        toast.error(`Credenciais inválidas.`)
      }
    })()
  }

  function logout(): void {
    setUser({ username: '', email: '', password: '' })
    toast.success(`Usuário deslogado com sucesso.`)
    return
  }

  function signup(user: UserData): void {
    ;(async () => {
      const usersReq = await getUsers()
      const existingUsers = usersReq.data

      //console.log(existingUsers)

      let userExists = false

      existingUsers.forEach((u) => {
        //console.log(user, u)
        if (u.username === user.username || u.email === user.email) {
          userExists = true
        }
      })

      if (userExists) {
        toast.error(`Usuário já cadastrado.`)
        return
      } else {
        saveUser(user)
        setUser(user)
        toast.success(`Usuário cadastrado e logado com sucesso!`)
        return
      }
    })()
  }

  return (
    <UserContext.Provider
      value={{
        getAuthUser,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
