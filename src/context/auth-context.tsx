import React, { ReactNode } from 'react'
import * as auth from 'auth-provider'
import { User } from 'types/user'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/use-async'
import { FullPageErrorFallback, FullPageLoading } from 'components/lib'
import { useQueryClient } from 'react-query'

interface AuthForm {
  username: string
  password: string
}

const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
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
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser
  } = useAsync<User | null>()

  const queryClient = useQueryClient()

  // user => setUser(user) 可以简写成 setUser point free
  const login = (form: AuthForm) => auth.login(form).then(setUser)

  // user => setUser(user) 可以简写成 setUser point free
  const register = (form: AuthForm) => auth.register(form).then(setUser)

  const logout = () =>
    auth.logout().then(() => {
      setUser(null)
      queryClient.clear()
    })

  useMount(() => {
    run(bootstrapUser())
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

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
