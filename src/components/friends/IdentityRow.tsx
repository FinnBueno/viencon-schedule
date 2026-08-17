import type { FC } from 'react';
import { useShareableIdentity } from '../../context/IdentityContext';
import styled from '@emotion/styled';
import { Button } from '../atoms/button';
import { MdOutlineEdit } from 'react-icons/md';
import { useModal } from '../../context/ModalContext';
import { SpecifyIdentityModal } from './SpecifyIdentityModal';

const Container = styled.div`
  display: flex;

  background-color: ${(props) => props.theme.color.eventBlockHighlighted};
  box-sizing: border-box;

  padding: 8px 8px;
  border-radius: 4px;
  gap: 4px;

  margin: 0 8px;
  box-sizing: border-box;
`;

const LabelGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const Label = styled.p`
  margin: 0;
`;

const EditButton = styled(Button)`
  font-size: 1rem;
  color: white;
  display: inline-flex;
  gap: 6px;
  align-items: center;
`;

export const IdentityRow: FC = () => {
  const { openModal, closeModal } = useModal();
  const { data, updateIdentity } = useShareableIdentity();
  if (!data) return null;

  const onEditModalComplete = (name: string, houseNumber: number) => {
    closeModal();
    updateIdentity(name, houseNumber);
  };

  const openIdentityModal = () =>
    openModal(
      <SpecifyIdentityModal
        name={data.name}
        houseNumber={data.houseNumber}
        onComplete={onEditModalComplete}
      />,
    );

  return (
    <Container>
      <LabelGroup>
        <Label>
          Your name: <b>{data.name}</b>
        </Label>
        <Label>
          Your house number: <b>{data.houseNumber}</b>
        </Label>
      </LabelGroup>
      <EditButton onClick={openIdentityModal}>
        <b>EDIT</b> <MdOutlineEdit size={20} />
      </EditButton>
    </Container>
  );
};
