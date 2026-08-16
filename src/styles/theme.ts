import type { Theme } from '@emotion/react';

export const darkTheme: Theme = {
  color: {
    eventBlock: 'rgb(115, 186, 168)',
    friendBlock: '#5f7b8a',
    eventBlockHighlighted: 'rgb(224, 178, 119)',
    negativeBlock: 'rgb(76, 125, 113)',
    location: 'rgb(234, 174, 93)',
    background: '#314149',
    backgroundHighlight: '#445964',
    grid: {
      hardBorder: '#fff',
      softBorder: '#ffffff40',
    },
    pins: {
      gates: '#e25640',
      area: '#d3d876',
      facilities: '#77e47c',
    },
    font: {
      onBackground: '#fff',
      onForeground: '#000',
      link: 'rgb(80, 160, 238)',
    },
  },
};

export const lightTheme: Theme = {
  color: {
    eventBlock: 'rgb(115, 186, 168)',
    friendBlock: '#e8e8e8',
    eventBlockHighlighted: 'rgb(247, 201, 145)',
    negativeBlock: 'rgb(65, 166, 158)',
    location: 'rgb(234, 174, 93)',
    background: '#EFEFEF',
    backgroundHighlight: '#CFCFCF',
    grid: {
      hardBorder: '#000',
      softBorder: '#00000040',
    },
    pins: {
      gates: '#e25640',
      area: '#d3d876',
      facilities: '#77e47c',
    },
    font: {
      onBackground: '#000',
      onForeground: '#fff',
      link: 'rgb(0, 0, 238)',
    },
  },
};
