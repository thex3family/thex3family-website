const shadows = {
  // using css variables bc shadows do not support color tokens yet

  outline: "0 0 0 4px var(--x3-colors-primary-hover)",
  table:
    "0 14px 66px rgba(0,0,0,.07), 0 10px 17px rgba(0,0,0,.03), 0 4px 7px rgba(0,0,0,.05)",
  drop: "0 4px 17px 0 var(--x3-colors-blackAlpha-200)",
  tableBox: {
    light:
      "0 14px 66px rgba(0,0,0,.07), 0 10px 17px rgba(0,0,0,.03), 0 4px 7px rgba(0,0,0,.05)",
    dark: "0 14px 66px hsla(0,0%,96.1%,.07), 0 10px 17px hsla(0,0%,96.1%,.03), 0 4px 7px hsla(0,0%,96.1%,.05)",
  },
  tableBoxHover: "0px 8px 17px rgba(0, 0, 0, 0.15)",
  tableItemBox: {
    light: "0 1px 1px rgba(0, 0, 0, 0.1)",
    dark: "0 1px 1px hsla(0,0%,100%,.1)",
  },
  tableItemBoxHover: "0 0 1px var(--x3-colors-primary-base)",
  gridYellowBoxShadow: "8px 8px 0px 0px var(--x3-colors-gridYellow)",
  gridBlueBowShadow: "8px 8px 0px 0px var(--x3-colors-gridBlue)",

  // * Part of new DS
  // TODO: From current theme. Deprecate for 'buttonHover'
  primary: "4px 4px 0px 0px var(--x3-colors-primary-light)",
  buttonHover: "4px 4px 0 0 var(--x3-colors-primary-lowContrast)",
  tooltip: "0 0 16px var(--x3-colors-tooltipShadow)",
}

export default shadows
