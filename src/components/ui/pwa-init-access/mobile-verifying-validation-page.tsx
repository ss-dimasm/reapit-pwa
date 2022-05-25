import React from 'react'

import { BodyText, Button, ButtonGroup } from '@reapit/elements'
import { AvailableValidationHandler } from 'core/private-route-wrapper'

import PWALayoutAccess from './layout'

type MobileVerifyingValidationPageType = {} & Partial<AvailableValidationHandler>

const MobileVerifyingValidationPage = ({ onChangeCurrentValidationStatus }: MobileVerifyingValidationPageType) => {
  return (
    <PWALayoutAccess>
      <BodyText style={{ color: 'var(--color-white)' }}>
        Currently you are installing PWA on your device, you can access this application again after installation of PWA
        is success. Or you can continue with the web experience by tapping the button below.
      </BodyText>
      <ButtonGroup alignment="right">
        <Button
          onClick={() => {
            onChangeCurrentValidationStatus && onChangeCurrentValidationStatus('permitted')
          }}
        >
          Continue with Web experience
        </Button>
      </ButtonGroup>
    </PWALayoutAccess>
  )
}

export default MobileVerifyingValidationPage
