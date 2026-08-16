import styled from '@emotion/styled';
import { type FC } from 'react';
import { BiCopy } from 'react-icons/bi';
import { useShareableIdentity } from '../../context/IdentityContext';

interface Props {
  onComplete?: (shareLink: string) => void;
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

const ColoredButton = styled.button`
  margin-top: 12px;
  padding: 16px 12px;
  border: 0;
  border-radius: 6px;
  cursor: pointer;

  background-color: ${(props) => props.theme.color.location};
  color: white;

  font-weight: bold;
  font-size: 1rem;
`;

const CopyableText = styled.div`
  margin: 0;
  padding: 0;
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
`;

const CopyBox = styled.div`
  background-color: ${(props) => props.theme.color.backgroundHighlight};
  padding: 8px 12px;
  width: 100%;

  box-sizing: border-box;
  border-radius: 4px;

  margin-top: 12px;
  display: flex;

  align-items: center;

  cursor: pointer;
`;

export const ShareHouseNumberModal: FC<Props> = ({ onComplete }) => {
  const shareableIdentity = useShareableIdentity();
  const addMeData = btoa(JSON.stringify(shareableIdentity.data));
  const shareLink = `https://finnbueno.github.io/viencon-schedule/?frnd=${addMeData}`;

  const onCopyPressed = () => navigator.clipboard.writeText(shareLink);

  return (
    <Container>
      <Title>Share your house number</Title>
      <Text>
        You can share your house number with anyone you want by sending them the
        link below.
      </Text>

      <br />

      <Text>
        ⚠️ Warning: Anybody with this link can see your house number. Do not
        share this link publicly, only share it with those you want to share
        your address with. Do{' '}
        <b>
          <u>NOT</u>
        </b>{' '}
        post it on your public story.
      </Text>

      <CopyBox onClick={onCopyPressed}>
        <CopyableText>{shareLink}</CopyableText>
        <BiCopy size={20} />
      </CopyBox>

      <ColoredButton onClick={() => onComplete && onComplete(shareLink)}>
        Share friend link
      </ColoredButton>
    </Container>
  );
};
