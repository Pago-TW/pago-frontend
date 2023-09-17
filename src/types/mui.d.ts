import type { Color } from "@mui/material";

declare module "@mui/material" {
  interface Color {
    25: string;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    base: PaletteColor & Color;
    pago: PaletteColor & Color;
    pagoGreen: PaletteColor & Color;
    pagoYellow: PaletteColor & Color;
    pagoRed: PaletteColor & Color;
  }
  interface PaletteOptions {
    base?: SimplePaletteColorOptions & ColorPartial;
    pago?: SimplePaletteColorOptions & ColorPartial;
    pagoGreen?: SimplePaletteColorOptions & ColorPartial;
    pagoYellow?: SimplePaletteColorOptions & ColorPartial;
    pagoRed?: SimplePaletteColorOptions & ColorPartial;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    base: true;
    pago: true;
    pagoGreen: true;
    pagoYellow: true;
    pagoRed: true;
  }
}

declare module "@mui/material/ToggleButton" {
  interface ToggleButtonPropsColorOverrides {
    base: true;
    pago: true;
    pagoGreen: true;
    pagoYellow: true;
    pagoRed: true;
  }
}

declare module "@mui/material/ToggleButtonGroup" {
  interface ToggleButtonGroupPropsColorOverrides {
    base: true;
    pago: true;
    pagoGreen: true;
    pagoYellow: true;
    pagoRed: true;
  }
}
