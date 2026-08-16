import styled from '@emotion/styled';

export const TooltipText = styled.p<{ subtle?: boolean; indent?: boolean }>`
  margin: 0 0 0 ${(props) => (props.indent ? '4px' : 0)};
  font-size: ${(props) => (props.subtle ? '0.6' : '0.7')}rem;
  opacity: ${(props) => (props.subtle ? 0.7 : 1)};
`;
