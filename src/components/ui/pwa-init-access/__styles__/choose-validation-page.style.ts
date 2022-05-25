import { css } from '@linaria/core'
import { MOBILE_BREAKPOINT } from '@reapit/elements'

export const wrapper = css`
  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    flex-direction: column;
  }
`
