import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  header {
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 0.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  main {
    a {
      color: #96030f;
      transition: 0.2s;

      &:hover {
        color: ${lighten(0.3, '#96030f')};
      }
    }
  }

  footer {
    border-top: 1px solid #eaeaea;
    padding-top: 0.5rem;
    margin-top: 2rem;
    text-align: center;
  }
`;
