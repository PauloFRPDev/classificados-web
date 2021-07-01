import { createGlobalStyle } from 'styled-components';

import backgroundImg from '../assets/background.svg';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  body {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.1)
    ),url(${backgroundImg});
    background-size: cover;
    color: #111827;
    -webkit-font-smoothing: antialised;
    height: 100%;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  body, input, button, textarea {
    font: 400 1rem 'Roboto', sans-serif;
  }

  h1, h2, h3, h4 {
    font-family: 'Poppins', sans-serif;
  }
`;
