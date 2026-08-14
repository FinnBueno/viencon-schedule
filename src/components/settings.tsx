import styled from "@emotion/styled";
import { Button } from "./atoms/button";
import {
  FaGithub,
  FaInfoCircle,
  FaInstagram,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useState } from "react";
import { Modal } from "./molecules/modal";
import { useVienconTheme } from "../hooks/use-viencon-theme";
import { IconLink } from "./atoms/icon-link";

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

export const Settings = () => {
  const [showModal, setShowModal] = useState(false);
  const { toggle, theme, getTheme } = useVienconTheme();

  const ThemeIcon = theme === "dark" ? FaSun : FaMoon;

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
            onClick={() => setShowModal(true)}
          />
        </Button>
      </ButtonGroup>
      <Modal hideModal={() => setShowModal(false)} show={showModal}>
        <h2>Thanks for using this schedule!</h2>
        <p>
          This schedule is not an official one and is in no way, shape or form
          affiliated with the Viencon organisation.
        </p>
        <p>
          It is maintained as a small fan project in an attempt to make it
          easier to plan your weekend. It's updated by hand and may not be 100%
          accurate. The last update was on <b>August 14th.</b>
        </p>
        <p>
          If you've found a mistake and want to let me know, you can message me
          on{" "}
          <a
            style={{ color: themeObject.color.font.link }}
            href="https://www.instagram.com/herecomeacosplayer/"
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
          <IconLink
            href="https://instagram.com/herecomeacosplayer"
            target="_blank"
          >
            <FaInstagram size={32} />
          </IconLink>
        </SocialIcons>
      </Modal>
    </>
  );
};
