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
            <a href="home">Início</a>
            <a href="novo">Novo</a>
            <a href="pesquisa">Pesquisa</a>
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
