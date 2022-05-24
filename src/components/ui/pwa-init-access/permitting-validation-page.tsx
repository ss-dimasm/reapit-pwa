import React, { useEffect } from 'react'

import PWALayoutAccess from './layout'
import type { AvailableValidationHandler } from 'core/private-route-wrapper'
import { Loader } from '@reapit/elements'

type PermittingValidationPageType = {} & Partial<AvailableValidationHandler>

const PermittingValidationPage = ({ onChangeCurrentValidationStatus }: PermittingValidationPageType) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onChangeCurrentValidationStatus && onChangeCurrentValidationStatus('permitted')
    }, 3000)

    return () => clearInterval(timer)
  }, [])
  // window.matchMedia('(display-mode: standalone)').matches
  return (
    <PWALayoutAccess>
      <Loader label="Please wait" />
    </PWALayoutAccess>
  )
}

export default PermittingValidationPage
