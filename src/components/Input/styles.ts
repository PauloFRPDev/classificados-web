import styled, { css } from 'styled-components';
import { darken } from 'polished';

import { Tooltip } from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isSearching?: boolean;
  isDisabled?: boolean;
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

  height: 70px;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;

    > svg:first-child {
      margin-right: 0.5rem;
    }
  }

  ${props =>
    props.isFocused &&
    css`
      color: #96030f;
      border: 2px solid #96030f;
      border-color: ${darken(0.1, '#96030f')};
    `}

  ${props =>
    props.isSearching &&
    css`
      cursor: not-allowed;
    `}

  ${props =>
    props.isDisabled &&
    css`
      cursor: not-allowed;
    `}

  label {
    color: #000;
    margin-bottom: 0.25rem;

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

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #333;
    outline: none;

    &::placeholder {
      color: #666360;
    }

    ${props =>
      props.isSearching &&
      css`
        display: none;
      `}

    ${props =>
      props.isDisabled &&
      css`
        cursor: not-allowed;
      `}
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 1rem;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
