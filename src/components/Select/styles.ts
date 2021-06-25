import styled, { css } from 'styled-components';
import { darken } from 'polished';
import ReactSelect from 'react-select';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;

  background: #fff;
  padding: 0.75rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #96030f;
  color: #333;

  label {
    color: #000;
    margin-bottom: 0.25rem;
    font-size: 1rem;

    ${props =>
      props.isFilled &&
      css`
        color: #96030f;
      `}

    ${props =>
      props.isFocused &&
      css`
        color: #96030f;
      `}
  }

  ${props =>
    props.isFocused &&
    css`
      color: #96030f;
      border: 2px solid #96030f;
      border-color: ${darken(0.1, '#96030f')};
    `}
`;

export const StyledSelect = styled(ReactSelect)`
  flex: 1;
  background: transparent;
  border: 0;
  color: #333;
  font-size: 1.1rem;
  outline: none;

  &::placeholder {
    color: #666360;
  }
`;
