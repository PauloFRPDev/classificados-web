import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Content = styled.div`
  max-width: 100%;
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
