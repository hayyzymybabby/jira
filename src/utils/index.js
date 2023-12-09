import { useState, useEffect } from 'react'

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
  const [debounceValue, setDebounceValue] = useState(value)
  // useEffect的调用时机，当你再次触发useEffect时，会执行上一次useEffect里return的函数，可以看看官网的解释
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  // 第一次直接就返回了，第一次也没有做任何更改，debounceValue相同
  return debounceValue
}
