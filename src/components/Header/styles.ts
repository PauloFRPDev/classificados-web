import { darken } from 'polished';
import { NavLink } from 'react-router-dom';
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

export const Nav = styled(NavLink).attrs({
  activeStyle: {
    background: `${darken(0.1, '#96030f')}`,
  },
})`
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background 0.3s;

  & + & {
    margin-left: 1.5rem;
  }

  &:hover {
    background: ${darken(0.1, '#96030f')};
  }

  @media (max-width: 500px) {
    display: none;
  }
`;
