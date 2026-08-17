import styled from '@emotion/styled';
import type { FC } from 'react';
import { BiTrash } from 'react-icons/bi';
import { useModal } from '../../context/ModalContext';
import { SpecifyIdentityModal } from './SpecifyIdentityModal';
import { useShareableIdentity } from '../../context/IdentityContext';
import { ConfirmDeletionModal } from './ConfirmDeletionModal';
import { ManualFriendListEditorModal } from './ManualFriendListEditorModal';
import { ShareHouseNumberModal } from './ShareHouseNumberModal';
import { useFriends } from '../../context/FriendsContext';

const Container = styled.div`
  display: flex;
  gap: 8px;

  margin: 0 8px;
  box-sizing: border-box;
`;

const VisualButton = styled.button`
  margin: 0;
  outline: none;
  padding: 8px 12px;
  border: none;
  background-color: ${(props) => props.theme.color.location};

  font-size: 1rem;
  font-weight: bold;
  border-radius: 4px;

  height: 54px;

  flex: 1;
`;

const DangerIconButton = styled(VisualButton)`
  flex: 0;
  background-color: #cc4033;
`;

export const FriendControls: FC = () => {
  const { openModal, closeModal } = useModal();
  const { isInitialized, updateIdentity, clearIdentity } =
    useShareableIdentity();
  const { clearFriends } = useFriends();

  const onCompleteIdentityModal = (name: string, houseNumber: number) => {
    closeModal();
    updateIdentity(name, houseNumber);
  };

  const onEditManually = () => {
    openModal(<ManualFriendListEditorModal onComplete={closeModal} />);
  };

  const onShare = async () => {
    if (!isInitialized) {
      openModal(<SpecifyIdentityModal onComplete={onCompleteIdentityModal} />);
      return;
    }

    openModal(<ShareHouseNumberModal onComplete={onShareConfirm} />);
  };

  const onShareConfirm = async (shareLink: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareLink });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const openDeleteModal = () =>
    openModal(
      <ConfirmDeletionModal
        onComplete={() => {
          clearIdentity();
          clearFriends();
          closeModal();
        }}
      />,
    );

  return (
    <Container>
      <DangerIconButton onClick={openDeleteModal}>
        <BiTrash size={28} />
      </DangerIconButton>
      <VisualButton onClick={onEditManually}>Edit manually</VisualButton>
      <VisualButton onClick={onShare}>Share house number</VisualButton>
    </Container>
  );
};
