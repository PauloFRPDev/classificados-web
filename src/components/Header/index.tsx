import { useCallback, useState } from 'react';

import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

import { Container, Content, Nav } from './styles';

interface HeaderProps {
  isAdmin?: boolean;
}

export default function Header({ isAdmin }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showMenu = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen]);

  return (
    <Container mobileMenuIsOpen={mobileMenuOpen}>
      <Content>
        <div>
          <Link to={`${isAdmin ? '/admin' : '/'}`}>
            <img src={logo} alt="CRO-RJ" />
          </Link>

          {isAdmin ? (
            <nav className={`${mobileMenuOpen ? 'visible' : 'hidden'}`}>
              <Nav to="/admin/dashboard" exact>
                Início
              </Nav>
              <Nav to="/admin/accept">Liberar anúncios</Nav>
            </nav>
          ) : (
            <nav className={`${mobileMenuOpen ? 'visible' : 'hidden'}`}>
              <Nav to="/" exact>
                Início
              </Nav>
              <Nav to="/new">Novo</Nav>
              <Nav to="/list">Pesquisa</Nav>
            </nav>
          )}

          <button type="button" onClick={showMenu}>
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <div>
          <span>Seja bem-vindo</span>
        </div>
      </Content>
    </Container>
  );
}
