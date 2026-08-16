import styled from '@emotion/styled';
import {
  createContext,
  useContext,
  useState,
  type FC,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { Button } from '../components/atoms/button';
import { IoCloseCircle } from 'react-icons/io5';
import { darkTheme } from '../styles/theme';

const Backdrop = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 25;

  opacity: ${(props) => (props.show ? 1 : 0)};
  pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
  transition: opacity 200ms;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContainer = styled.div`
  background-color: ${(props) => props.theme.color.background};
  margin: 0 8px;
  box-shadow: -1px -1px 25px 3px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px -1px 25px 3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px -1px 25px 3px rgba(0, 0, 0, 0.75);
  position: fixed;
  max-width: 400px;
`;

const ModalBody = styled.div`
  padding: 12px;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 8px;
  right: 4px;
  cursor: pointer;
`;

type SearchControls = {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
};

const ModalContext = createContext<SearchControls>({
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ReactNode | undefined>(undefined);
  const [show, setShow] = useState(false);

  const openModal = (content: ReactNode) => {
    setContent(content);
    setShow(true);
  };

  const closeModal = () => {
    setContent(null);
    setShow(false);
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      {children}
      <Backdrop onClick={handleBackdropClick} show={show}>
        <ModalContainer>
          <CloseButton onClick={closeModal}>
            <IoCloseCircle
              color={darkTheme.color.font.onBackground}
              size={28}
            />
          </CloseButton>
          <ModalBody>{content}</ModalBody>
        </ModalContainer>
      </Backdrop>
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => useContext(ModalContext);
