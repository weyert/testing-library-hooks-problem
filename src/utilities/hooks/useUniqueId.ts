import {useRef} from 'react'

const __GENERATED_IDS__ = {}

function getUniqueId(prefix?: string): string {
  const idKey = prefix ?? 'id'
  const nextId = __GENERATED_IDS__.hasOwnProperty(idKey)
    ? __GENERATED_IDS__[idKey]++
    : 1
  __GENERATED_IDS__[idKey] = nextId
  return `${idKey}${nextId}`
}

/**
 * Returns an unique identifier
 * @param {string} prefix the prefix to use for the identifier
 * @return {string} Returns the unique identifier
 */
export const useUniqueId = (prefix?: string): string => {
  const ref = useRef<string>()
  if (!ref.current) {
    ref.current = getUniqueId(prefix)
  }
  return ref.current
}
