export const typeOfDevice = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
};

export const mobile = (variable) =>
  variable === typeOfDevice.xs ||
  variable === typeOfDevice.sm ||
  variable === typeOfDevice.md;

export const desktop = (variable) => variable === typeOfDevice.lg;
