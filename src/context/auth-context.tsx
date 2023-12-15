import React, { ReactNode, useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel'

interface AuthForm {
  username: string
  password: string
}

const AuthContext = React.createContext<
  | {
      user: User | null
      login: (from: AuthForm) => Promise<void>
      register: (from: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)

// 主要配合jira-dev-tool 实际开发中不需要
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  // user => setUser(user) 可以简写成 setUser point free
  const login = (form: AuthForm) => auth.login(form).then(setUser)

  // user => setUser(user) 可以简写成 setUser point free
  const register = (form: AuthForm) => auth.register(form).then(setUser)

  const logout = () => auth.logout().then(() => setUser(null))

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  )
}

export const useAuth = () => {
  const contenxt = React.useContext(AuthContext)
  if (!contenxt) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return contenxt
}
