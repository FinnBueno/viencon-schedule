import styled from '@emotion/styled';
import type { FC } from 'react';
import { IconLink } from './components/atoms/icon-link';
import { FaInstagram } from 'react-icons/fa';

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Content = styled.div`
  max-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h1``;

const Text = styled.p`
  margin: 0 0 8px 0;
`;

const RefreshButton = styled.button`
  padding: 8px 12px;
  width: 100%;
  margin-bottom: 24px;
  border: 0;
  border-radius: 6px;
  cursor: pointer;

  background-color: ${(props) => props.theme.color.location};
  color: white;

  font-weight: bold;
  font-size: 1rem;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const Link = styled.a`
  color: ${(props) => props.theme.color.font.onBackground};
  display: inline;
`;

export const ErrorScreen: FC = () => (
  <Container>
    <Content>
      <Heading>Oops!</Heading>
      <Text>
        It seems something broke. Try refreshing with the button below.
      </Text>
      <RefreshButton>Refresh</RefreshButton>
      <Text>
        The error has been reported to the creator. If you want, you can reach
        out to them <Link href="https://instagram.com/finxy_cos">here</Link>.
      </Text>
      <SocialIcons>
        <IconLink href="https://instagram.com/finxy_cos" target="_blank">
          <FaInstagram size={32} />
        </IconLink>
      </SocialIcons>
    </Content>
  </Container>
);
