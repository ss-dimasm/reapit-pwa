import { useLayoutEffect, useState } from 'react'

export const useDetectPWA = () => {
  const [isInsidePWA, setIsInsidePWA] = useState<boolean>(window.matchMedia('(display-mode: standalone)').matches)
  const [clientWidth, setClientWidth] = useState<number>(window.innerWidth)

  useLayoutEffect(() => {
    const updateHandler = () => {
      setIsInsidePWA(window.matchMedia('(display-mode: standalone)').matches)
      setClientWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateHandler)
    return () => window.removeEventListener('resize', updateHandler)
  }, [])

  return {
    isInsidePWA,
    clientWidth,
  }
}
