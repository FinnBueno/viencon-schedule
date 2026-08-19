import styled from '@emotion/styled';
import { Button } from '../atoms/button';
import {
  FaGithub,
  FaInfoCircle,
  FaInstagram,
  FaMoon,
  FaSun,
} from 'react-icons/fa';
import { type FC } from 'react';
import { useVienconTheme } from '../../hooks/use-viencon-theme';
import { IconLink } from '../atoms/icon-link';
import { useModal } from '../../context/ModalContext';
import type { Theme } from '@emotion/react';

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 8px;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 92px;
`;

const Version = styled.span`
  font-family: monospace;
`;

const InfoModalContent: FC<{ theme: Theme }> = ({ theme }) => (
  <>
    <h2>Thanks for using this (web)app!</h2>
    <p>
      This project is not an official one and is in no way, shape or form
      affiliated with the Viencon organisation.
    </p>
    <p>
      It is maintained as a small fan project in an attempt to make it easier to
      plan your weekend. It's updated by hand and may not be 100% accurate. The
      last update was on <b>August 19th.</b> The current version is{' '}
      <Version>2026-v1.0.6</Version>.
    </p>
    <p>
      If you've found a mistake and want to let me know, you can message me on{' '}
      <a
        style={{ color: theme.color.font.link }}
        href="https://www.instagram.com/finxy_cos/"
      >
        Instagram
      </a>
      .
    </p>
    <SocialIcons>
      <IconLink
        href="https://github.com/FinnBueno/viencon-schedule"
        target="_blank"
      >
        <FaGithub size={32} />
      </IconLink>
      <IconLink href="https://instagram.com/finxy_cos" target="_blank">
        <FaInstagram size={32} />
      </IconLink>
    </SocialIcons>
  </>
);

export const Settings = () => {
  const { toggle, theme, getTheme } = useVienconTheme();
  const { openModal } = useModal();

  const ThemeIcon = theme === 'dark' ? FaSun : FaMoon;

  const themeObject = getTheme();

  return (
    <>
      <ButtonGroup>
        <Button>
          <ThemeIcon
            onClick={toggle}
            color={themeObject.color.font.onBackground}
            size={24}
          />
        </Button>
        <Button>
          <FaInfoCircle
            color={themeObject.color.font.onBackground}
            size={24}
            onClick={() => openModal(<InfoModalContent theme={themeObject} />)}
          />
        </Button>
      </ButtonGroup>
    </>
  );
};
