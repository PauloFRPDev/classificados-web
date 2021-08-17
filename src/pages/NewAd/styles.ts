import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  /* height: calc(100vh - 5rem); */
  height: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 1rem 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  header {
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 0.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  main {
    a {
      color: #96030f;
      transition: 0.2s;

      &:hover {
        color: ${lighten(0.3, '#96030f')};
      }
    }
  }

  footer {
    border-top: 1px solid #eaeaea;
    padding-top: 0.5rem;
    margin-top: 2rem;
    text-align: center;
  }
`;

export const Content = styled.div`
  width: 100%;
  background: #f0efef;
  padding: 1rem 1.5rem 1.5rem;
  border: 2px solid #96030f;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    color: #111827;
    margin-bottom: 1rem;

    @media (max-width: 1280px) {
      font-size: 1.5rem;
    }
  }

  .name-jurisdicted {
    margin-bottom: 1rem;
  }

  .description-area {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    > span {
      align-self: flex-end;
    }
  }
`;

export const FormFirstLine = styled.div`
  display: flex;
  gap: 1rem;

  margin-bottom: 1rem;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

export const FormSecondLine = styled.div`
  display: flex;
  gap: 1rem;

  margin-bottom: 1rem;

  @media (max-width: 560px) {
    flex-direction: column;
  }
`;

export const FormForthLine = styled.div`
  display: flex;
  gap: 1rem;

  margin-top: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 560px) {
    flex-direction: column;
  }
`;

export const ActionsContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;

  button + button {
    margin-left: 2rem;
    color: #111827;
    background: none;
    border: 1px solid #96030f;

    transition: color 0.2s;
  }

  button + button:hover {
    color: ${darken(0.05, '#fff')};
  }

  button {
    width: 200px;
    border: none;
    background: #96030f;
    color: #fff;
    padding: 0.75rem 1.25rem;
    border-radius: 0.25rem;

    transition: background 0.2s;

    &:first-child {
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      &:hover {
        background: ${darken(0.08, '#96030f')};
      }
    }
  }
`;
