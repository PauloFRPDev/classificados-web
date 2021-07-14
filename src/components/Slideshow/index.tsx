import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { Container, Content, Footer } from './styles';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    margin: '0 auto',
    padding: '1rem',
    overflow: 'hidden',
    zIndex: 3,
  },
  overlay: {
    zIndex: 3,
    backgroundColor: '#44444480',
  },
};

interface SlideshowProps {
  isOpen: boolean;
  setIsOpen: (isModalOpen: boolean) => void;
  adFiles: {
    filename: string;
    file_url: string;
  }[];
}

Modal.setAppElement('#root');

export function Slideshow({ isOpen, setIsOpen, adFiles }: SlideshowProps) {
  const [indexImgSelected, setIndexImgSelected] = useState(0);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
    setIndexImgSelected(0);
  }

  useEffect(() => {
    setIsOpen(isOpen);
  }, [setIsOpen, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <Container>
        <Content>
          {adFiles.map((adFile, index) => (
            <main
              key={adFile.filename}
              className={`${indexImgSelected === index ? 'imgActive' : ''}`}
            >
              <img src={adFile.file_url} alt={adFile.filename} />
            </main>
          ))}

          <button
            type="button"
            onClick={() =>
              indexImgSelected === 0
                ? setIndexImgSelected(indexImgSelected + 1)
                : setIndexImgSelected(indexImgSelected - 1)
            }
            disabled={adFiles.length === 1}
          >
            &#10094;
          </button>
          <button
            type="button"
            onClick={() =>
              indexImgSelected === 1
                ? setIndexImgSelected(indexImgSelected - 1)
                : setIndexImgSelected(indexImgSelected + 1)
            }
            disabled={adFiles.length === 1}
          >
            &#10095;
          </button>
        </Content>

        <Footer>
          {adFiles.map((adFile, index) => (
            <span
              aria-hidden="true"
              key={adFile.filename}
              onClick={() => setIndexImgSelected(index)}
              className={`${indexImgSelected === index ? 'active' : ''}`}
            />
          ))}
        </Footer>
      </Container>
    </Modal>
  );
}
