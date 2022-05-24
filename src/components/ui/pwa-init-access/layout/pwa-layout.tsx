import React from 'react'
import { FlexContainer, Icon } from '@reapit/elements'

type PWALayoutAccessProps = {
  children: React.ReactNode
}

// TODO: add minimum fixed width

const PWALayoutAccess = ({ children }: PWALayoutAccessProps) => {
  return (
    <FlexContainer isFlexJustifyCenter isFlexAlignCenter isFlexColumn className="el-wfull el-hfull">
      <FlexContainer isFlexColumn className="el-p10" style={{ backgroundColor: 'var(--intent-primary-dark)' }}>
        <Icon icon="reapitLogoTextMenu" iconSize="largest" className="el-mb10" />
        {children}
      </FlexContainer>
    </FlexContainer>
  )
}

export default PWALayoutAccess
