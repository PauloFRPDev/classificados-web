import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  position: relative;
  margin: auto;

  width: 100%;
  height: 100%;

  > main {
    display: none;
    height: 100%;

    &.imgActive {
      display: block;
    }

    img {
      width: 100%;
      max-height: 600px;

      @media (max-height: 750px) {
        max-height: 550px;
      }

      @media (max-height: 680px) {
        max-height: 400px;
      }
    }

    /* Fading animation */
    -webkit-animation-name: fade;
    -webkit-animation-duration: 1.5s;
    animation-name: fade;
    animation-duration: 1.5s;

    @-webkit-keyframes fade {
      from {
        opacity: 0.4;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes fade {
      from {
        opacity: 0.4;
      }
      to {
        opacity: 1;
      }
    }
  }

  > button {
    text-align: center;
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    margin-top: -22px;
    padding: 16px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    transition: 0.6s ease;
    border-radius: 0 3px 3px 0;
    user-select: none;
    border: none;
    background: none;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  > button + button {
    right: 0;
    border-radius: 3px 0 0 3px;
  }
`;

export const Footer = styled.footer`
  margin-top: 0.5rem;

  span {
    cursor: pointer;
    height: 15px;
    width: 15px;
    margin: 0 2px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;

    &.active,
    &:hover {
      background-color: #717171;
    }
  }
`;
