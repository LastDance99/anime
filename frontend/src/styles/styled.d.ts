// src/styles/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      bordermain: string;
      subcolor: string;
      text: string;
      subtext: string;
      background: string;
    };
    fonts: {
      main: string;
      cute: string;
      cuteBold: string;
      cafe24: string;
      cafe24Light: string;
    };
    Weights: {
      normal: number;
      medium: number;
      bold: number;
      light: number;
    };
    fontSizes: {
      xxxs: string;
      xxs: string;
      xs: string;
      ss: string;
      sm: string;
      md: string;
      base: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
    lineHeights: {
      normal: string;
      relaxed: string;
      loose: string;
    };
    letterSpacings: {
      normal: string;
      wide: string;
      wider: string;
      widest: string;
    };
    display: {
      h1: string;
      h2: string;
    };
    media: {
      mobile: string;
      tablet: string;
      qhd: string;
      fhd: string;

      iosMax: string;
      iosMid: string;
      iosSE: string;

      androidLarge: string;
      androidMid: string;
      androidSmall: string;
    };
  }
}
