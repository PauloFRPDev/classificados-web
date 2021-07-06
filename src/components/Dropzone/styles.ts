import styled from 'styled-components';

interface ContainerProps {
  disabled: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 1rem;
  background: #fff;
  border: 1px dashed #96030f;
  border-radius: 0.5rem;
  min-height: 150px;
  padding: 1rem;

  cursor: ${props => (!props.disabled ? 'pointer' : 'not-allowed')};

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

export const PreviewContent = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  margin-top: 1rem;

  > div {
    border: 1px solid #eaeaea;
    padding: 0.5rem;
    border-radius: 0.5rem;
    position: relative;

    > button {
      display: flex;
      justify-content: center;
      align-items: center;

      background: #ffffffb3;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 0;
      padding: 0.2rem;
      position: absolute;
      top: 1rem;
      right: 1rem;

      cursor: pointer;
      transition: 0.2s;

      &:hover {
        color: #fff;
        background: #00000080;
      }
    }
  }

  img {
    width: auto;
    height: 100px;
    transition: 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`;
