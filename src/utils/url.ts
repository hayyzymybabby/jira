import { useMemo, useState } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject } from 'utils'

/**
 * 返回页面url中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [stateKeys] = useState(keys)
  return [
    useMemo(
      () =>
        stateKeys.reduce(
          (prev, key) => {
            return { ...prev, [key]: searchParams.get(key) || '' }
          },
          {} as { [key in K]: string }
        ),
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params
      }) as URLSearchParamsInit
      return setSearchParams(o)
    }
  ] as const // as const 返回最原始的类型
}