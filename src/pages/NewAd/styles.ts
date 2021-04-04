import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh - 5rem);
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  background: #96030f;
  padding: 1rem 1.5rem 1.5rem;
  border-radius: 0.5rem;

  h1 {
    color: #fff;
    margin-bottom: 2rem;
  }
`;

export const FormFirstLine = styled.div`
  display: flex;

  margin-bottom: 1rem;

  div + div {
    margin-left: 1rem;
  }
`;

export const FormSecondLine = styled.div`
  display: flex;

  margin-bottom: 1rem;

  div + div {
    margin-left: 1rem;
  }
`;

export const FormForthLine = styled.div`
  display: flex;

  margin-top: 1rem;
  margin-bottom: 1rem;

  div + div {
    margin-left: 1rem;
  }
`;

export const ActionsContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;

  button + button {
    margin-left: 2rem;
  }

  button {
    width: 200px;
    border: none;
    background: #96030f;
    color: #fff;
    padding: 0.75rem 1.25rem;
    border-radius: 0.25rem;
    font-size: 1rem;
  }
`;
