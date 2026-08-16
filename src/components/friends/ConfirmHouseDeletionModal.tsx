import styled from '@emotion/styled';
import { type FC } from 'react';

interface Props {
  onComplete?: () => void;
}

const Container = styled.div`
  margin: 4px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin: 0 0 12px 0;
`;

const Text = styled.p`
  margin: 0;
  opacity: 0.7;
  font-size: 14px;
`;

const DangerButton = styled.button`
  margin-top: 12px;
  padding: 8px 12px;
  border: 0;
  border-radius: 6px;
  cursor: pointer;

  background-color: #cc4033;
  color: white;

  font-weight: bold;
`;

export const ConfirmHouseDeletionModal: FC<Props> = ({ onComplete }) => {
  return (
    <Container>
      <Title>Deleting this house</Title>
      <Text>
        Are you sure? You'll have to manually enter the house back in, including
        all the people.
      </Text>

      <DangerButton onClick={onComplete}>Yes, delete this house</DangerButton>
    </Container>
  );
};
