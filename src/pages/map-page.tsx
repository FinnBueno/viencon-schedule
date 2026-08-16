import type { FC } from 'react';
import { ZoomableMap } from '../components/map/zoomable-map';
import { PINS } from '../data/map/pins';
import styled from '@emotion/styled';
import mapImg from '../assets/viencon-map.webp';

const MapHeader = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  z-index: 1;
  overflow: visible;
  padding: 8px;

  @media (min-width: 769px) {
    margin-left: 160px;
  }
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
  text-shadow: 0px 4px 10px rgba(0, 0, 0, 1);
`;

const Subtitle = styled.p`
  margin: 0;
  text-shadow: 0px 4px 10px rgba(0, 0, 0, 1);
  opacity: 0.5;
`;

// providing target with a value will move the view to a pin matching by location ID
export const MapPage: FC<{ target?: string }> = ({ target }) => (
  <>
    <MapHeader>
      <Title>Map</Title>
      <Subtitle>Find any events or areas with their timetables.</Subtitle>
    </MapHeader>
    <ZoomableMap pins={PINS} target={target} img={mapImg} />
  </>
);
