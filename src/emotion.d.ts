import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      eventBlock: string;
      negativeBlock: string;
      location: string;
      background: string;
      font: {
        onBackground: string;
        onForeground: string;
        link: string;
      };
    };
  }
}
