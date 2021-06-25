import { createGlobalStyle } from 'styled-components';

import backgroundImg from '../assets/background.png';

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
    /* background: #f5f5f5; */
    /* background: url(${backgroundImg}) no-repeat center; */
    background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.2)
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
`;
