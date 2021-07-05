import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 1rem;
  background: #fff;
  border: 1px dashed #96030f;
  border-radius: 0.5rem;
  min-height: 150px;

  cursor: pointer;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
    transition: 0.3s;

    > svg {
      width: 2rem;
      height: 2rem;
      color: #111827;
    }

    &:hover {
      transform: translateY(-0.5rem);
    }
  }
`;
