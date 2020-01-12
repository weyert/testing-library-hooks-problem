import {renderHook} from '@testing-library/react-hooks'
import {useUniqueId} from '../useUniqueId'

describe('useUniqueId', () => {
  it('should be defined', () => {
    expect(useUniqueId).toBeDefined()
  })

  it('should return unique identifier', () => {
    const hook = renderHook(() => useUniqueId())
    console.log(hook)
  })
})
