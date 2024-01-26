import { createIcon } from "@chakra-ui/react"

import { commonIconDefaultProps } from "./utils"

export const BulletPointIcon = createIcon({
  displayName: "BulletPointIcon",
  viewBox: "0 0 24 24",
  defaultProps: {
    width: "24px",
    height: "24px",
    ...commonIconDefaultProps,
  },
  d: "M12,8 C13.1045695,8 14,8.8954305 14,10 C14,11.1045695 13.1045695,12 12,12 C10.8954305,12 10,11.1045695 10,10 C10,8.8954305 10.8954305,8 12,8 Z",
})