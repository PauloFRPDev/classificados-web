import { lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 1rem 2rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 1rem;
    align-self: flex-start;

    @media (max-width: 1280px) {
      font-size: 1.5rem;
    }
  }
`;

export const SearchHeader = styled.header`
  width: 100%;

  > form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    > div {
      display: flex;
      gap: 1rem;
    }

    > div:last-child {
      gap: 0;
    }

    @media (max-width: 800px) {
      > div {
        flex-direction: column;
      }
    }
  }

  margin-bottom: 1rem;
`;

export const AdsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

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
    > p {
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

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

export const Pagination = styled.div``;
