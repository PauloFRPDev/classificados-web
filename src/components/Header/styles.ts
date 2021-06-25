import styled from 'styled-components';

export const Container = styled.header`
  height: 5rem;
  background: #96030f;
`;

export const Content = styled.div`
  max-width: 1120px;
  height: 5rem;
  margin: 0 auto;
  padding: 0 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div:first-child {
    display: flex;
    align-items: center;

    img {
      height: 50px;
      margin-right: 5rem;
    }

    a + a {
      margin-left: 1.5rem;
    }

    a {
      font-size: 1.25rem;
      color: #fff;

      @media (max-width: 500px) {
        display: none;
      }
    }

    @media (max-width: 700px) {
      flex: 1;

      display: flex;
      justify-content: space-between;
    }
  }

  div:last-child {
    display: flex;
    align-items: center;

    span {
      font-size: 1.25rem;
      color: #fff;
      margin-right: 1rem;
    }

    svg {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }

    @media (max-width: 700px) {
      display: none;
    }
  }
`;
