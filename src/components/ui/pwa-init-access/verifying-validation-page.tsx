import React, { useCallback, useEffect, useState } from 'react'

import PWALayoutAccess from './layout'

import { AvailableValidationHandler } from 'core/private-route-wrapper'
import { BodyText, Button, ButtonGroup, FlexContainer, Loader, useSnack } from '@reapit/elements'
import { useDetectPWA } from 'utils/hooks/useDetectPWA'

type VerifyingValidationPageType = {} & Partial<AvailableValidationHandler>

let promptHandler: any

window.addEventListener('beforeinstallprompt', (e) => {
  promptHandler = e
})

// TODO: how to check is PWA already installed
// TODO: if not possible, show a button to open in web experience also with message 'you already install, please open'
const VerifyingValidationPage = ({ onChangeCurrentValidationStatus }: VerifyingValidationPageType) => {
  const [isInstalled, setIsInstalled] = useState<boolean>(false)

  const { isInsidePWA } = useDetectPWA()
  const { custom } = useSnack()

  useEffect(() => {
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true)
    })
  }, [])

  const handleInstallClick = useCallback(() => {
    promptHandler.prompt()
  }, [])

  const renderComponent = (() => {
    if (isInsidePWA || isInstalled) {
      // condition when user successfully install the PWA or already inside the PWA
      setTimeout(() => {
        onChangeCurrentValidationStatus && onChangeCurrentValidationStatus('permitted')
      }, 2500)

      const generateTextContent = (() => {
        if (isInsidePWA) {
          return 'You are inside in Mobile experience, redirecting'
        }
        return 'Success to install! redirecting'
      })()

      return (
        <FlexContainer isFlexJustifyCenter isFlexAlignCenter>
          <div>
            <BodyText hasCenteredText hasNoMargin style={{ color: 'var(--color-white)' }}>
              {generateTextContent}
            </BodyText>
          </div>
          <div className="el-ml4">
            <Loader />
          </div>
        </FlexContainer>
      )
    } else if (promptHandler && !isInstalled && !isInsidePWA) {
      // condition when user does not have installed PWA and able to install
      return (
        <>
          <BodyText style={{ color: 'var(--color-white)' }}>
            Explore with Mobile experience by tapping the button below
          </BodyText>
          <FlexContainer isFlexJustifyEnd>
            <Button fixedWidth onClick={handleInstallClick}>
              Install PWA
            </Button>
          </FlexContainer>
        </>
      )
    } else {
      // condition when user already install the PWA but currently run with browser
      return (
        <>
          <BodyText style={{ color: 'var(--color-white)' }}>
            Looks like you already install the Mobile experience
          </BodyText>
          <ButtonGroup alignment="center">
            <Button
              onClick={() => {
                onChangeCurrentValidationStatus && onChangeCurrentValidationStatus('permitted')
              }}
              intent="secondary"
            >
              Switch To Web Experience
            </Button>
            <Button
              onClick={() =>
                custom(
                  {
                    text: 'Please to open the PWA manually',
                    icon: 'infoSolidSystem',
                    intent: 'secondary',
                  },
                  1500,
                )
              }
            >
              Continue with Mobile Experience
            </Button>
          </ButtonGroup>
        </>
      )
    }
  })()

  return <PWALayoutAccess>{renderComponent}</PWALayoutAccess>
}

export default VerifyingValidationPage
