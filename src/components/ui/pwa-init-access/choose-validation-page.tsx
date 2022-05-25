import React from 'react'

import LandingPageIcon from './lp-icon'
import PWALayoutAccess from './layout'

import { BodyText, FlexContainer } from '@reapit/elements'
import { AvailableValidationHandler } from 'core/private-route-wrapper'
import { useDetectPWA } from 'utils/hooks/useDetectPWA'

type ChooseValidationPageType = {} & Partial<AvailableValidationHandler>

const ChooseValidationPage = ({ onChangeCurrentValidationStatus }: ChooseValidationPageType) => {
  const { isInsidePWA } = useDetectPWA()

  if (isInsidePWA) {
    onChangeCurrentValidationStatus && onChangeCurrentValidationStatus('permitted')
  }

  return (
    <PWALayoutAccess>
      <FlexContainer isFlexJustifyBetween>
        <LandingPageIcon
          textName="Mobile Experience"
          icon="appsMenu"
          onClick={() => onChangeCurrentValidationStatus && onChangeCurrentValidationStatus('verifying')}
        />
        <LandingPageIcon
          textName="Web Experience"
          icon="desktopMenu"
          onClick={() => onChangeCurrentValidationStatus && onChangeCurrentValidationStatus('permitted')}
        />
      </FlexContainer>
      <div className="el-mt6">
        <BodyText hasCenteredText hasNoMargin style={{ color: 'var(--color-white)' }}>
          Choose the available environments above to continue
        </BodyText>
      </div>
    </PWALayoutAccess>
  )
}

export default ChooseValidationPage
