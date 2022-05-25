import React from 'react'
import { FlexContainer, Icon } from '@reapit/elements'

type PWALayoutAccessProps = {
  children: React.ReactNode
}

// TODO: add hooks that can detect is running on PWA or nah

const PWALayoutAccess = ({ children }: PWALayoutAccessProps) => {
  return (
    <FlexContainer isFlexJustifyCenter isFlexAlignCenter isFlexColumn className="el-wfull el-hfull">
      <FlexContainer
        isFlexColumn
        className="el-p10"
        style={{ backgroundColor: 'var(--intent-primary-dark)', minWidth: '550px', minHeight: '350px' }}
      >
        <Icon icon="reapitLogoTextMenu" iconSize="largest" className="el-mb10" />
        {children}
      </FlexContainer>
    </FlexContainer>
  )
}

export default PWALayoutAccess
