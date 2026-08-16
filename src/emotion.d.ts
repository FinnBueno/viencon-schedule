import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      eventBlock: string;
      eventBlockHighlighted: string;
      negativeBlock: string;
      location: string;
      background: string;
      backgroundHighlight: string;
      grid: {
        hardBorder: string;
        softBorder: string;
      };
      pins: {
        area: string;
        gates: string;
        facilities: string;
      };
      font: {
        onBackground: string;
        onForeground: string;
        link: string;
      };
    };
  }
}
