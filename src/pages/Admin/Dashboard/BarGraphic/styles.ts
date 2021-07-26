import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;

  background-color: #f0efef;
  border: 1px solid #96030f;
  padding: 1rem;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  span {
    font-weight: bold;
    font-size: 1.2rem;
  }

  canvas {
    max-width: 100%;
  }

  @media (max-width: 1150px) {
    width: 100%;
  }
`;
