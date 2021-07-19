import { useCallback, useState } from 'react';

import { FiMenu, FiUser, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

import { Container, Content, Nav } from './styles';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showMenu = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen]);

  return (
    <Container mobileMenuIsOpen={mobileMenuOpen}>
      <Content>
        <div>
          <Link to="/">
            <img src={logo} alt="CRO-RJ" />
          </Link>

          <nav className={`${mobileMenuOpen ? 'visible' : 'hidden'}`}>
            <Nav to="/" exact>
              Início
            </Nav>
            <Nav to="/new">Novo</Nav>
            <Nav to="/list">Pesquisa</Nav>
          </nav>

          <button type="button" onClick={showMenu}>
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <div>
          <span>Seja bem-vindo</span>

          <FiUser color="#fff" />
        </div>
      </Content>
    </Container>
  );
}
