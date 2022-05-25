import React from 'react'
import { FlexContainer, Icon } from '@reapit/elements'
import { cx } from '@linaria/core'
import { wrapper } from './__styles__'

type PWALayoutAccessProps = {
  children: React.ReactNode
}

const PWALayoutAccess = ({ children }: PWALayoutAccessProps) => {
  return (
    <FlexContainer isFlexJustifyCenter isFlexAlignCenter isFlexColumn className="el-wfull el-hfull">
      <FlexContainer isFlexColumn className={cx(wrapper, 'el-p10')}>
        <Icon icon="reapitLogoTextMenu" iconSize="largest" className="el-mb10" />
        {children}
      </FlexContainer>
    </FlexContainer>
  )
}

export default PWALayoutAccess
