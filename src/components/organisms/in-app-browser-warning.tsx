import styled from '@emotion/styled';
import { useMemo, useState, type FC } from 'react';
import { IoClose, IoWarning } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { IconButton } from '../atoms/icon-button';
import {
  detectInAppBrowser,
  getExternalBrowserIntentLink,
  isAndroid,
} from '../../utils/browser-util';

const DISMISSAL_CACHE_ID = 'viencon-2026-in-app-browser-warning-dismissed';

const Container = styled.div`
  position: fixed;
  bottom: 56px;
  width: 100%;
  z-index: 21;

  box-sizing: border-box;
  padding: 4px;

  display: flex;
  justify-content: center;

  @media (min-width: 769px) {
    bottom: 0;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;

  position: relative;
  padding: 12px;
  border-radius: 4px;
  border-left: 4px solid ${(props) => props.theme.color.location};

  background-color: ${(props) => props.theme.color.backgroundHighlight};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  padding-right: 28px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

const Text = styled.p`
  margin: 8px 0 0 0;
  opacity: 0.8;
  font-size: 14px;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const Buttons = styled.div`
  margin-top: 12px;

  display: flex;
  gap: 8px;
`;

const VisualButton = styled.button`
  flex: 1;
  margin: 0;
  padding: 10px 12px;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  background-color: ${(props) => props.theme.color.location};
  color: ${(props) => props.theme.color.font.onForeground};

  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
`;

const OpenInBrowserButton = VisualButton.withComponent('a');

export const InAppBrowserWarning: FC = () => {
  const [isDismissed, setDismissed] = useState(
    () => !!localStorage.getItem(DISMISSAL_CACHE_ID),
  );
  const inAppBrowser = useMemo(detectInAppBrowser, []);
  const canOpenExternally = useMemo(isAndroid, []);

  if (!inAppBrowser || isDismissed) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISSAL_CACHE_ID, 'true');
    setDismissed(true);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied! Paste it in your own browser');
    } catch {
      toast.error("Couldn't copy the link, sorry!");
    }
  };

  return (
    <Container>
      <Content>
        <Header>
          <IoWarning size={22} />
          <Title>You're in {inAppBrowser}'s browser</Title>
        </Header>
        <Text>
          Your friend list and house number are only saved in this browser. Open
          this page in your own browser first, or you'll have to enter
          everything again there later.
        </Text>
        {!canOpenExternally && (
          <Text>
            Tap the ••• button at the top right, then "Open in external
            browser".
          </Text>
        )}
        <Buttons>
          {canOpenExternally && (
            <OpenInBrowserButton href={getExternalBrowserIntentLink()}>
              Open in my browser
            </OpenInBrowserButton>
          )}
          <VisualButton onClick={copyLink}>Copy link</VisualButton>
        </Buttons>
        <CloseButton onClick={dismiss}>
          <IoClose size={24} />
        </CloseButton>
      </Content>
    </Container>
  );
};
