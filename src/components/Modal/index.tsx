import { useEffect, useState, ReactNode } from 'react';

import Modal from 'react-modal';

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
  children: ReactNode;
  setIsOpen?: (modalIsOpen: boolean) => void;
}

Modal.setAppElement('#root');

export function ModalComponent({ isOpen, setIsOpen, children }: ModalProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // function openModal() {
  //   setModalIsOpen(true);
  // }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setModalIsOpen(false);
    if (setIsOpen) {
      setIsOpen(false);
    }
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
        {children}
      </Modal>
    </div>
  );
}
