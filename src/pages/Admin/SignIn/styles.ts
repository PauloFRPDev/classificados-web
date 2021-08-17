import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const LogoContent = styled.div`
  display: flex;
  width: 100%;
  background: #96030f;
  box-shadow: 0 0 50px #96030f;
  padding: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    margin-bottom: 50px;
  }

  h1 {
    color: #fff;
    text-align: center;
  }

  @media (max-width: 1280px) {
    img {
      width: 70%;
    }

    h1 {
      font-size: 1.2rem;
      max-width: 70%;
    }
  }

  @media (max-width: 820px) {
    display: none;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 900px;
  padding: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromRight} 1s;

  img {
    opacity: 0;

    @media (max-width: 820px) {
      opacity: 1;
      transition: opacity 1s;
      margin-bottom: 50px;
    }
  }

  form {
    display: flex;
    margin: 80px 0;
    width: 340px;
    text-align: center;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
    }

    > div + div {
      margin-top: 1rem;
    }

    > button {
      border: none;
      background: #96030f;
      color: #fff;
      padding: 0.75rem 1.25rem;
      border-radius: 0.5rem;
      margin-top: 1rem;

      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#96030f')};
      }
    }
  }
`;
