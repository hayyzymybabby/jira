import { useEffect, useState } from 'react'

export const isFalsy = value => (value === 0 ? false : !value)
export const cleanObject = object => {
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = callback => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = (value, delay) => {
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
