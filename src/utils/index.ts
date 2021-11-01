import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)
export const cleanObject = (object: object) => {
  const result = { ...object }
  Object.keys(result).forEach(key => {
    // @ts-ignore
    const value = result[key]
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = <V>(value: V, delay?: number) => {
  // 用useState 定义的状态，会触发组件刷新
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    // 对于useEffect，useEffect内部运行之前，会执行上一次useEffect返回的回调函数
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debouncedValue
}
