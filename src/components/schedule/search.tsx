import { type FC } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { MdArrowLeft, MdArrowRight, MdClear } from 'react-icons/md';
import { useVienconTheme } from '../../hooks/use-viencon-theme';
import { useSearch } from '../../context/SearchContext';
import { IconButton } from '../atoms/icon-button';
import { BiSearch } from 'react-icons/bi';

const SearchMenuContainer = styled.div`
  position: absolute;
  top: 0;

  background-color: ${(props) => props.theme.color.background};

  z-index: 10;
  height: 52px;
  overflow: visible;

  width: 100vw;
  display: flex;
  justify-content: center;

  box-sizing: border-box;
  padding: 4px 4px 8px 4px;
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
  outline: none;
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

  const {
    isSearching,
    updateQuery,
    totalResults,
    currentIndex,
    goNext,
    goBack,
  } = useSearch();

  const { register, handleSubmit, reset } = useForm<SearchFormValues>({
    defaultValues: { query: '' },
  });

  const handleClear = () => {
    updateQuery();
    reset({ query: '' });
  };

  return (
    <>
      <div style={{ height: '52px' }}></div>
      <SearchMenuContainer>
        <Content as="form" onSubmit={handleSubmit(() => {})}>
          <Input
            placeholder="Search..."
            {...register('query', {
              onChange: (e) => updateQuery(e.target.value),
            })}
          />
          {!isSearching ? (
            <BiSearch size={32} style={{ marginRight: '4px' }} />
          ) : (
            <>
              <MdClear
                size={32}
                color={theme.color.font.onBackground}
                onClick={handleClear}
              />
              <IconButton type="button" onClick={goBack}>
                <MdArrowLeft size={32} color={theme.color.font.onBackground} />
              </IconButton>
              {totalResults === 0 ? 0 : currentIndex + 1} / {totalResults}
              <IconButton type="button" onClick={goNext}>
                <MdArrowRight size={32} color={theme.color.font.onBackground} />
              </IconButton>
            </>
          )}
        </Content>
      </SearchMenuContainer>
    </>
  );
};
