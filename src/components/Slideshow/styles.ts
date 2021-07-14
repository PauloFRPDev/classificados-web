import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.main`
  position: relative;
  margin: auto;

  main {
    display: none;

    &.imgActive {
      display: block;
    }

    img {
      width: 100%;
      height: auto;
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
