import { type FC } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { MdArrowLeft, MdArrowRight, MdClear } from "react-icons/md";
import { useVienconTheme } from "../hooks/use-viencon-theme";
import { useSearch } from "../context/SearchContext";

const SearchMenuContainer = styled.div`
  height: 48px;
  overflow: visible;

  width: 100vw;
  display: flex;
  justify-content: center;

  box-sizing: border-box;
  padding: 4px;
`;

const Content = styled.div`
  border-radius: 4px;

  background-color: rgba(0, 0, 0, 0.3);

  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (min-width: 769px) {
    width: 600px;
  }

  height: 100%;

  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  max-width: 100%;
  height: 100%;

  box-sizing: border-box;

  margin: 0;
  padding: 0 8px;
  border: none;

  font-size: 1.2em;

  color: ${(props) => props.theme.color.font.onBackground};
  background: none;

  flex: 1;
`;

type SearchFormValues = {
  query: string;
};

export const SearchMenu: FC = () => {
  const { getTheme } = useVienconTheme();
  const theme = getTheme();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setQuery] = useSearch();

  const { register, handleSubmit, reset } = useForm<SearchFormValues>({
    defaultValues: { query: "" },
  });

  const onSubmit = (values: SearchFormValues) => {
    setQuery(values.query);
  };

  const handleClear = () => {
    reset({ query: "" });
  };

  return (
    <>
      {/* <SearchMenuSpacer /> */}
      <SearchMenuContainer>
        <Content as="form" onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Search..." {...register("query")} />
          <MdClear
            size={32}
            color={theme.color.font.onBackground}
            onClick={handleClear}
          />
          <MdArrowLeft size={32} />
          <MdArrowRight size={32} />
        </Content>
      </SearchMenuContainer>
    </>
  );
};
