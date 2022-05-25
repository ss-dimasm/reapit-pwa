import React, { FC, Suspense, useMemo, useState } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { Nav } from '../components/ui/nav/nav'
import { reapitConnectBrowserSession } from './connect-session'
import { useLocation, Redirect } from 'react-router'
import { Loader, MainContainer, PageContainer } from '@reapit/elements'

import ChooseValidationPage from 'components/ui/pwa-init-access/choose-validation-page'
import VerifyingValidationPage from 'components/ui/pwa-init-access/verifying-validation-page'

export type PrivateRouteWrapperProps = {}

type AvailableValidation = 'choose' | 'verifying' | 'permitted'

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
      permitted: children,
    }),
    [children],
  )

  // detect is using PWA in here or nah
  // go outside PWA (in case user click web experience inside PWA)
  // when user already install the PWA, then they should immediately open the link

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
  return (
    <MainContainer>
      <Nav />
      <Suspense fallback={<Loader label="Loading" fullPage />}>{availableElement[currentValidationStatus]}</Suspense>
    </MainContainer>
  )
}

export default PrivateRouteWrapper
