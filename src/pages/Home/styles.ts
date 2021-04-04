import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: calc(100vh - 5rem);
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2rem;

  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  > div {
    display: flex;
    justify-content: center;
    margin-top: 2rem;

    button {
      width: 200px;
      padding: 1rem;
      border: none;
      background: #96030f;
      color: #fff;
      border-radius: 0.5rem;

      display: flex;
      align-items: center;
      justify-content: center;

      transition: background 0.2s;

      &:first-child {
        margin-right: 2rem;
      }

      &:hover {
        background: ${darken(0.1, '#96030f')};
      }

      > svg {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 1rem;
      }

      > span {
        font-size: 1.25rem;
        border-left: 1px solid #fff;
        padding-left: 1rem;
      }
    }
  }
`;

export const RuleSection = styled.section`
  border: 2px solid #96030f;
  border-radius: 0.5rem;
  padding: 1.25rem;

  ul {
    list-style: none;

    li + li {
      margin-top: 1rem;
    }

    li {
      display: flex;
      align-items: center;

      > svg {
        width: 2rem;
        height: 2rem;
        margin-right: 1rem;
        color: #96030f;
      }

      span {
        font-size: 1.1rem;
      }
    }
  }
`;
