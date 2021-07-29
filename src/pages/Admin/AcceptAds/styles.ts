import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem;
`;

export const ModalContainer = styled.div`
  header {
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 0.5rem;
    margin-bottom: 2rem;
  }

  .description-area {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    margin-bottom: 2rem;

    > div {
      min-width: 500px;
    }

    > span {
      align-self: flex-end;
    }
  }

  footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;

    button + button {
      color: #111827;
      background: none;
      border: 1px solid #96030f;

      transition: color 0.3s ease;
    }

    button + button:hover {
      color: ${darken(0.05, '#fff')};
    }

    > button {
      border: none;
      background: #96030f;
      color: #fff;
      padding: 0.75rem 1.25rem;
      border-radius: 0.25rem;

      transition: background 0.3s ease;

      &:first-child {
        &:hover {
          background: ${darken(0.08, '#96030f')};
        }
      }
    }
  }
`;

export const Content = styled.div`
  width: 100%;

  h1 {
    margin-bottom: 1rem;
  }
`;

export const AdsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding-bottom: 2rem;

  > div.adsNotFound {
    margin-top: 2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    > svg {
      width: 2rem;
      height: 2rem;
    }

    span {
      font-size: 1.5rem;
    }
  }
`;

export const Ad = styled.div`
  width: 100%;
  background: #f0efef;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #96030f;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div span {
      color: #737380;
    }

    > div + div {
      text-align: end;
    }

    @media (max-width: 600px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;

      > div {
        text-align: center;

        &:first-child {
          margin-bottom: 0.5rem;
        }
      }

      > div + div {
        text-align: center;
      }
    }
  }

  main {
    > button {
      border: none;
      padding: 0.3rem 0.8rem;
      background: #96030f;
      border-radius: 1rem;
      color: #fff;
      font-size: 0.8rem;
      text-align: center;
      margin-bottom: 0.5rem;
      transition: 0.3s ease;

      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;

      &:hover {
        font-size: 0.9rem;
        background: ${lighten(0.1, '#96030f')};
        font-weight: bold;

        > svg {
          width: 1rem;
          height: 1rem;
        }
      }
    }

    @media (max-width: 600px) {
      display: flex;
      flex-direction: column;

      > button {
        align-self: center;
      }
    }
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  p {
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`;

export const Actions = styled.div`
  align-self: flex-end;

  display: flex;
  gap: 0.5rem;

  > button {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.3rem;
    border: 1px solid #96030f;
    border-radius: 0.5rem;
    transition: 0.3s ease;

    > svg {
      width: 1.3rem;
      height: 1.3rem;
    }

    &:hover {
      border: 1px solid #fff;
      background: #96030f;
      color: #fff;
    }
  }
`;
