import { css } from '@linaria/core'
import { MOBILE_BREAKPOINT } from '@reapit/elements'

export const wrapper = css`
  background-color: var(--intent-primary-dark);
  min-width: 550px;
  min-height: 350px;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 85vw;
    min-width: auto;
  }
`
