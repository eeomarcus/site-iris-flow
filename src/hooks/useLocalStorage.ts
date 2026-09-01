import { useCallback, useEffect, useState } from 'react'

/**
 * Estado persistido em localStorage.
 * Substitui o banco de dados neste projeto — trocar por chamada de API
 * na integracao real (ver src/services/api.ts).
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* modo privado do navegador ou cota excedida — ignorado de proposito */
    }
  }, [key, value])

  const clear = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
    } catch {
      /* idem */
    }
    setValue(initial)
  }, [key, initial])

  return [value, setValue, clear] as const
}
