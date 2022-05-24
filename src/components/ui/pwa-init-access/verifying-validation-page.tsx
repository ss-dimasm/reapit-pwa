import React, { useEffect, useState } from 'react'

import PWALayoutAccess from './layout'

import { AvailableValidationHandler } from 'core/private-route-wrapper'
import { Button, FlexContainer, Subtitle } from '@reapit/elements'

type VerifyingValidationPageType = {} & Partial<AvailableValidationHandler>

// eslint-disable-next-line no-unused-vars
const VerifyingValidationPage = ({ onChangeCurrentValidationStatus }: VerifyingValidationPageType) => {
  const [installable, setInstallable] = useState<boolean>(false)
  const [currentPrompt, setCurrentPrompt] = useState<any>(null)

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e: any) => {
      // should works if the URL has HTTPS SSL
      e.preventDefault()
      setCurrentPrompt(e)
      setInstallable(true)
    })

    window.addEventListener('appinstalled', () => {
      onChangeCurrentValidationStatus && onChangeCurrentValidationStatus('permitting')
    })
  }, [])

  console.log('trackCurrentPrompt', currentPrompt)

  const handleInstallClick = () => {
    console.log('inside onclick')
    if (currentPrompt) {
      // Show the install prompt
      currentPrompt.prompt()
    }
    // Wait for the user to respond to the prompt
    currentPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
    })
  }

  console.log(window.navigator)
  return (
    <PWALayoutAccess>
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
      </FlexContainer>
    </PWALayoutAccess>
  )
}

export default VerifyingValidationPage
