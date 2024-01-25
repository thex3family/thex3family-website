import { create } from "@storybook/theming"

// @ts-ignore
import brandImage from "./co-x3-icon.svg"

export default create({
  base: "dark",

  appBg: "#222222",
  appBorderColor: "white",
  appBorderRadius: 4,

  brandTitle: "the.x3.family",
  brandImage,
  brandUrl: "https://the.x3.family",

  barSelectedColor: "#ff7324",

  colorSecondary: "#ff7324",

  fontBase: "Inter, sans-serif",

  textColor: "#f2f2f2",
  textMutedColor: "#b2b2b2",

  inputBorder: "#F7F7F7",
  inputBorderRadius: 4,
})
