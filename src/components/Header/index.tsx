import { FiUser } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import { Container, Content, Nav } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <div>
          <img src={logo} alt="CRO-RJ" />

          <nav>
            <Nav to="/" exact>
              Início
            </Nav>
            <Nav to="/new">Novo</Nav>
            <Nav to="/list">Pesquisa</Nav>
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
