import { useEffect, useState } from 'react';

import Modal from 'react-modal';

import { Container } from './styles';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    margin: '0 auto',
    padding: '25px',
    overflow: 'hidden',
    zIndex: 3,
  },
  overlay: {
    zIndex: 3,
    backgroundColor: '#44444480',
  },
};

interface ModalProps {
  isOpen: boolean;
}

Modal.setAppElement('#root');

export function ModalComponent({ isOpen }: ModalProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // function openModal() {
  //   setModalIsOpen(true);
  // }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <Container>
          <header>
            <h3>ATENÇÃO!</h3>
          </header>

          <main>
            <p>
              O(A) profissional selecionado(a) possui débitos no sistema.
              <br /> Para visualizar e regularizar a sua situação clique no
              seguinte link:{' '}
              <a
                href="https://cro-rj.implanta.net.br/servicosonline/"
                target="blank"
              >
                https://cro-rj.implanta.net.br/servicosonline/
              </a>
            </p>
          </main>

          <footer>
            <p>
              Já regularizou e ainda não consegue inserir um anúncio?
              <br /> Favor entrar em contato através do endereço de e-mail{' '}
              <strong>suporte@cro-rj.org.br</strong>
            </p>
          </footer>
        </Container>
      </Modal>
    </div>
  );
}
