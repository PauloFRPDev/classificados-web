import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import { Container, Content } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <div>
          <img src={logo} alt="CRO-RJ" />

          <nav>
            <Link to="/">Início</Link>
            <Link to="/new">Novo</Link>
            <Link to="pesquisa">Pesquisa</Link>
          </nav>
        </div>

        <div>
          <span>Seja bem-vindo</span>

          <FiUser color="#fff" />
        </div>
      </Content>
    </Container>
  );
}
