import React, { FC } from 'react'

import { PageContainer, Title } from '@reapit/elements'
import { useDetectPWA } from 'utils/hooks/useDetectPWA'

export const HomePage: FC = () => {
  const { isInsidePWA } = useDetectPWA()
  return (
    <PageContainer>
      <Title>Hi dimasm, your&apos;re running {isInsidePWA ? 'inside' : 'outside'} PWA</Title>
    </PageContainer>
  )
}

export default HomePage
