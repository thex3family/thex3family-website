import * as React from "react"
import { createIcon } from "@chakra-ui/react"

export const HomeIcon = createIcon({
  displayName: "HomeIcon",
  viewBox: "0 0 201 201",
  defaultProps: {
    width: "22px",
    height: "35px",
  },
  path: [
    <circle key="circle" cx="100.5" cy="100.5" r="100" fill="#fff" />,
    <path
      key="path1"
      d="m141.17 76 30.2-17.44a4.32 4.32 0 0 0 1.48-6.12 87 87 0 0 0-51.32-36.21 4.35 4.35 0 0 0-5.4 3.7L112 54.9a4.34 4.34 0 0 0 2.87 4.61 43.52 43.52 0 0 1 20.67 15.3 4.33 4.33 0 0 0 5.63 1.19Z"
      fill="#6faac3"
    />,
    <path
      key="path2"
      d="m174.43 64.8-30.52 17.62a4.3 4.3 0 0 0-2 5 43.5 43.5 0 0 1 0 26.11 4.32 4.32 0 0 0 2 5l30.53 17.62a4.35 4.35 0 0 0 6.19-2.09 87.19 87.19 0 0 0 0-67.18 4.36 4.36 0 0 0-6.2-2.08Z"
      fill="#e03d3e"
    />,
    // ... add keys to other paths similarly ...
  ],
})