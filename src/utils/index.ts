import { useState, useEffect } from 'react'

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === ''

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // todo 依赖项里面加上callback会无限循环 这个和useCallback 和 useMemo有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)
  // useEffect的调用时机，当你再次触发useEffect时，会执行上一次useEffect里return的函数，可以看看官网的解释
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  // 第一次直接就返回了，第一次也没有做任何更改，debounceValue相同
  return debounceValue
}
