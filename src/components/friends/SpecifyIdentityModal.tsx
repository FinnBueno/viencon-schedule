import styled from '@emotion/styled';
import { useEffect, type FC } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  name?: string;
  houseNumber?: number;
  onComplete?: (name: string, houseNumber: number) => void;
}

interface FormValues {
  name: string;
  houseNumber: number;
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

const Input = styled.input`
  padding: 8px 10px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
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

export const SpecifyIdentityModal: FC<Props> = ({
  name,
  houseNumber,
  onComplete = () => {},
}) => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: name ?? '',
      houseNumber: houseNumber ?? undefined,
    },
  });

  useEffect(() => {
    form.resetDefaultValues({
      name,
      houseNumber,
    });
  }, [name, houseNumber, form]);

  const handleSubmit = (values: FormValues) => {
    onComplete(values.name, Number(values.houseNumber));
  };

  return (
    <Container>
      <Title>Enter your info</Title>
      <Subtitle>
        Enter your name and house number to easily share it with others.
      </Subtitle>

      <Form onSubmit={form.handleSubmit(handleSubmit)}>
        <Label>
          Name (how you'll appear to others)
          <Input
            type="text"
            placeholder="Your name"
            {...form.register('name', { required: true })}
          />
        </Label>

        <Label>
          House number
          <Input
            type="number"
            placeholder="e.g. 12"
            {...form.register('houseNumber', {
              required: true,
              valueAsNumber: true,
            })}
          />
        </Label>

        <SubmitButton type="submit">Save</SubmitButton>
      </Form>
    </Container>
  );
};
