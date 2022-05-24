import React, { FC, Suspense, useMemo, useState } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { Nav } from '../components/ui/nav/nav'
import { reapitConnectBrowserSession } from './connect-session'
import { useLocation, Redirect } from 'react-router'
import { Loader, MainContainer, PageContainer } from '@reapit/elements'

import ChooseValidationPage from 'components/ui/pwa-init-access/choose-validation-page'
import VerifyingValidationPage from 'components/ui/pwa-init-access/verifying-validation-page'
import PermittingValidationPage from 'components/ui/pwa-init-access/permitting-validation-page'

export type PrivateRouteWrapperProps = {}

type AvailableValidation = 'choose' | 'verifying' | 'permitting' | 'permitted'

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
      permitting: <PermittingValidationPage />,
      permitted: children,
    }),
    [currentValidationStatus, children],
  )

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

  console.log('current status validator', currentValidationStatus)
  // TODO: add nav item to switch, between PWA or nah
  return (
    <MainContainer>
      <Nav />
      <Suspense fallback={<Loader label="Loading" fullPage />}>{availableElement[currentValidationStatus]}</Suspense>
    </MainContainer>
  )
}

export default PrivateRouteWrapper
