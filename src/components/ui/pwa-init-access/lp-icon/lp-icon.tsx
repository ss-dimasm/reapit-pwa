import React from 'react'

import { BodyText, FlexContainer, Icon, IconNames } from '@reapit/elements'

type LandingPageIconProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  icon: IconNames
  textName: string
}

const LandingPageIcon = ({ icon, textName, ...htmlProps }: LandingPageIconProps) => {
  return (
    <FlexContainer
      isFlexColumn
      isFlexJustifyCenter
      isFlexAlignCenter
      className={' el-px12 el-py5'}
      style={{ backgroundColor: 'var(--color-blue-dark2)', cursor: 'pointer' }}
      {...htmlProps}
    >
      <Icon icon={icon} iconSize="large" />
      <BodyText hasNoMargin className="el-mt6" style={{ color: 'var(--color-white)' }}>
        {textName}
      </BodyText>
    </FlexContainer>
  )
}

export default LandingPageIcon
