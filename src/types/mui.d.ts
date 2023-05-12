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
