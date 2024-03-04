import { useEffect } from 'react'
import { useHttp } from './http'
import { User } from 'types/user'
import { useAsync } from './use-async'
import { cleanObject } from 'utils'

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<User[]>()

  useEffect(() => {
    run(client('users', { data: cleanObject(param || {}) }))
  }, [param, run, client])

  return result
}
