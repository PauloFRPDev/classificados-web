import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem;

  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  h1 {
    margin-bottom: 2rem;
  }

  > div {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    gap: 2rem;

    @media (max-width: 500px) {
      flex-direction: column;
    }

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
      gap: 1rem;

      transition: background 0.2s;

      &:hover {
        background: ${darken(0.1, '#96030f')};
      }

      > svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      > span {
        border-left: 1px solid #fff;
        padding-left: 1rem;
      }

      @media (max-width: 500px) {
        width: 100%;

        & + button {
          margin-top: 1rem;
        }
      }
    }
  }
`;

export const RuleSection = styled.section`
  border: 2px solid #96030f;
  background: #f0efef;
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
        min-width: 2rem;
        min-height: 2rem;
        margin-right: 1rem;
        color: #96030f;
      }
    }
  }
`;
