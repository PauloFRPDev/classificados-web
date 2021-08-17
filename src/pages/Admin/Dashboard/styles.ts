import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 1rem 2rem;
`;

export const Content = styled.div`
  max-width: 100%;

  h1 {
    margin-bottom: 1rem;

    @media (max-width: 1280px) {
      font-size: 1.5rem;
    }
  }
`;

export const Statistics = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  margin-top: 1rem;

  @media (max-width: 1150px) {
    flex-direction: column;
  }
`;
