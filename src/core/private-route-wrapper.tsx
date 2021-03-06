import React, { FC, Suspense, useEffect, useMemo, useState } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { Nav } from '../components/ui/nav/nav'
import { reapitConnectBrowserSession } from './connect-session'
import { useLocation, Redirect } from 'react-router'
import { Loader, MainContainer, PageContainer } from '@reapit/elements'

import ChooseValidationPage from 'components/ui/pwa-init-access/choose-validation-page'
import VerifyingValidationPage from 'components/ui/pwa-init-access/verifying-validation-page'
import { useDetectPWA } from 'utils/hooks/useDetectPWA'
import MobileVerifyingValidationPage from 'components/ui/pwa-init-access/mobile-verifying-validation-page'

export type PrivateRouteWrapperProps = {}

type AvailableValidation = 'choose' | 'verifying' | 'mobileVerifying' | 'permitted'

export type AvailableValidationHandler = {
  currentValidationStatus: AvailableValidation
  onChangeCurrentValidationStatus: React.Dispatch<
    React.SetStateAction<AvailableValidationHandler['currentValidationStatus']>
  >
}

export const PrivateRouteWrapper: FC<PrivateRouteWrapperProps> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location?.pathname}${location?.search}`

  const [currentValidationStatus, setCurrentValidationStatus] = useState<AvailableValidation>('choose')

  const availableElement: {
    [value in AvailableValidation]: React.ReactNode
  } = useMemo(
    () => ({
      choose: <ChooseValidationPage onChangeCurrentValidationStatus={setCurrentValidationStatus} />,
      verifying: <VerifyingValidationPage onChangeCurrentValidationStatus={setCurrentValidationStatus} />,
      mobileVerifying: <MobileVerifyingValidationPage onChangeCurrentValidationStatus={setCurrentValidationStatus} />,
      permitted: children,
    }),
    [children],
  )
  const { isInsidePWA } = useDetectPWA()

  useEffect(() => {
    if (isInsidePWA) {
      setCurrentValidationStatus('permitted')
    }
  }, [])

  // detect is using PWA in here or nah ???
  // go outside PWA (in case user click web experience inside PWA) ??????????? (works in mobile, doesnot works in browser)
  // when user already install the PWA, then they should immediately open the link to open the PWA ???????????

  if (!connectSession) {
    return (
      <MainContainer>
        <PageContainer>
          <Loader label="Loading" fullPage />
        </PageContainer>
      </MainContainer>
    )
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }

  // TODO: add nav item to switch, between PWA or nah
  // context
  return (
    <MainContainer>
      <Nav />
      <Suspense fallback={<Loader label="Loading" fullPage />}>{availableElement[currentValidationStatus]}</Suspense>
    </MainContainer>
  )
}

export default PrivateRouteWrapper
