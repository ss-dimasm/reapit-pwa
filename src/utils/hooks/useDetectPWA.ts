import { useLayoutEffect, useState } from 'react'

export const useDetectPWA = () => {
  const [isInsidePWA, setIsInsidePWA] = useState<boolean>(false)

  useLayoutEffect(() => {
    const updateHandler = () => {
      setIsInsidePWA(window.matchMedia('(display-mode: standalone)').matches)
    }
    window.addEventListener('resize', updateHandler)
    return () => window.removeEventListener('resize', updateHandler)
  }, [])

  return {
    isInsidePWA,
  }
}
