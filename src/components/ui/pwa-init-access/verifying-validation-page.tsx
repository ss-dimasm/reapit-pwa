import React, { useCallback, useEffect, useState } from 'react'

import PWALayoutAccess from './layout'

import { AvailableValidationHandler } from 'core/private-route-wrapper'
import { BodyText, Button, FlexContainer, Loader, Subtitle } from '@reapit/elements'
import { useDetectPWA } from 'utils/hooks/useDetectPWA'

type VerifyingValidationPageType = {} & Partial<AvailableValidationHandler>

let promptHandler: any

window.addEventListener('beforeinstallprompt', (e) => {
  promptHandler = e
})

// TODO: how to check is PWA already installed
// TODO: if not possible, show a button to open in web experience also with message 'you already install, please open'
const VerifyingValidationPage = ({ onChangeCurrentValidationStatus }: VerifyingValidationPageType) => {
  const [installable, setInstallable] = useState<boolean>(false)
  const [isInstalled, setIsInstalled] = useState<boolean>(false)

  const { isInsidePWA } = useDetectPWA()

  useEffect(() => {
    if (promptHandler) {
      setInstallable(true)
    }
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true)
    })
  }, [])

  const handleInstallClick = useCallback(() => {
    promptHandler.prompt()
    promptHandler.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
    })
  }, [])

  const renderComponent = (() => {
    if (isInsidePWA || isInstalled) {
      console.log('here')
      setTimeout(() => {
        onChangeCurrentValidationStatus && onChangeCurrentValidationStatus('permitted')
      }, 2500)

      const generateTextContent = (() => {
        if (isInsidePWA) {
          return 'You already run in Mobile experience, redirecting'
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
    } else {
      // check PWA installed

      return (
        <>
          <Subtitle style={{ color: 'var(--color-white)' }}>Trigger the PWA then open it</Subtitle>
          <FlexContainer isFlexJustifyEnd>
            {installable && (
              <Button
                fixedWidth
                onClick={() => {
                  console.log('trigger install prompt')
                  handleInstallClick()
                }}
              >
                Install PWA
              </Button>
            )}
            <Button onClick={() => window.open('http://localhost:3000')}>Test</Button>
          </FlexContainer>
        </>
      )
    }
  })()

  return <PWALayoutAccess>{renderComponent}</PWALayoutAccess>
}

export default VerifyingValidationPage
