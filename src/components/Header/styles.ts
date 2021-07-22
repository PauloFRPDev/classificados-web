import { darken } from 'polished';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface ContainerProps {
  mobileMenuIsOpen: boolean;
}

export const Container = styled.header<ContainerProps>`
  background: #96030f;
  transition: 0.3s ease;

  margin-bottom: ${props => (props.mobileMenuIsOpen ? '150px' : '0')};
`;

export const Content = styled.div`
  max-width: 1120px;
  height: 5rem;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;

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

    > button {
      display: none;
    }

    @media (max-width: 700px) {
      flex: 1;

      display: flex;
      justify-content: space-between;
    }

    @media (max-width: 500px) {
      nav.hidden {
        display: none;
      }

      nav.visible {
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        border-top: 1px solid #fff;
        width: 100%;
        position: absolute;
        top: 5rem;
        left: 0;
        padding: 1rem 0;
        background: #96030f;
        border-radius: 0 0 0.5rem 0.5rem;
      }

      button {
        border: 1px solid #fff;
        border-radius: 0.5rem;
        background: transparent;
        padding: 0.25rem;
        z-index: 999;

        display: flex;
        flex-direction: center;
        align-items: center;

        svg {
          width: 30px;
          height: 30px;
          color: #fff;
        }
      }
    }
  }

  div:last-child {
    display: flex;
    align-items: center;

    span {
      color: #fff;
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

  @media (max-width: 500px) {
    & + & {
      margin-left: 0;
    }
  }

  &:hover {
    background: ${darken(0.1, '#96030f')};
  }
`;
