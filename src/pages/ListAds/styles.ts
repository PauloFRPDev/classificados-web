import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Content = styled.div`
  h1 {
    margin-bottom: 2rem;
  }
`;

export const SearchHeader = styled.header`
  > form {
    display: flex;
    gap: 1rem;
  }

  margin-bottom: 1rem;
`;

export const AdsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding-bottom: 2rem;
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
  }

  main {
    p {
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

      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
    }
  }
`;
