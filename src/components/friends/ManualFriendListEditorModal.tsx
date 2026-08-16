import styled from '@emotion/styled';
import { useMemo, type FC } from 'react';
import { useForm } from 'react-hook-form';
import {
  useFriends,
  type FriendList,
  type FriendsPerHouse,
} from '../../context/FriendsContext';
import {
  isValidHouseAddress,
  type HouseAddress,
} from '../../data/park/getHouseCoordinates';
import { toast } from 'react-toastify';

interface Props {
  onComplete?: () => void;
}

interface FormValues {
  data: string;
}

const Container = styled.div`
  margin: 4px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin: 0 0 12px 0;
`;

const Subtitle = styled.p`
  margin: 0;
  opacity: 0.7;
  font-size: 14px;
`;

const Form = styled.form`
  margin-top: 16px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Input = styled.textarea`
  padding: 8px 10px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  min-height: 180px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  margin-top: 4px;
  padding: 8px 12px;
  border: 0;
  border-radius: 6px;
  cursor: pointer;

  background-color: ${(props) => props.theme.color.location};

  font-weight: bold;
`;

export const ManualFriendListEditorModal: FC<Props> = ({
  onComplete = () => {},
}) => {
  const { friendsPerHouse, dangerouslySetFriendList } = useFriends();

  const defaultData = useMemo(
    () => convertFriendsDataToManualList(friendsPerHouse),
    [friendsPerHouse],
  );

  const form = useForm<FormValues>({
    defaultValues: {
      data: defaultData,
    },
  });

  const handleSubmit = (values: FormValues) => {
    const newFriendList = convertTextualFriendListToTypedList(values.data);
    dangerouslySetFriendList(newFriendList.result);
    if (newFriendList.encounteredError) {
      toast.warn(
        "Couldn't update all your friends, please double check your text",
      );
    } else {
      toast.success('Friends updated!');
    }
    onComplete();
  };

  return (
    <Container>
      <Title>Manual friend list editor</Title>
      <Subtitle>
        Enter your friend list like so: <br />
        House Number: Name 1, Name 2, Name 3, etc...
      </Subtitle>

      <Form onSubmit={form.handleSubmit(handleSubmit)}>
        <Label>
          List of friends per house number
          <Input
            placeholder="121: Jester, Gojo, Kamina, ..."
            {...form.register('data', { required: true })}
          />
        </Label>

        <SubmitButton type="submit">Save</SubmitButton>
      </Form>
    </Container>
  );
};

const convertFriendsDataToManualList = (
  friendsPerHouse: FriendsPerHouse,
): string => {
  return Object.entries(friendsPerHouse)
    .reduce<string>((total, [address, friends]) => {
      total += `
${address}: ${friends.map((f) => f.name).join(', ')}
`;
      return total;
    }, '')
    .trim();
};

const convertTextualFriendListToTypedList = (
  manualFriendList: string,
): {
  result: FriendList;
  encounteredError: boolean;
} => {
  const lines = manualFriendList.split('\n');
  const result: FriendList = [];
  let encounteredError = false;
  lines.forEach((line) => {
    if (!line) return;
    const trimmedLine = line.trim();
    if (!trimmedLine.includes(':')) {
      encounteredError = true;
      return;
    }
    const [address, inhabitans] = trimmedLine.split(':');
    const trimmedAddress = address.trim();
    if (!isValidHouseAddress(trimmedAddress)) {
      encounteredError = true;
      return;
    }

    const houseNumber = trimmedAddress as HouseAddress;
    const people = inhabitans.split(',').map((i) => i.trim());
    if (!people || people.length === 0) {
      encounteredError = false;
      return;
    }

    people.forEach((name) => result.push({ name, houseNumber }));
  });

  return {
    result,
    encounteredError,
  };
};
