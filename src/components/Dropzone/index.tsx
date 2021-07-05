import { useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import { Container } from './styles';

export function Dropzone() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);

  const handleFileRejection = ({ file, errors }: FileRejection) => {
    console.log(errors);
    console.log(file);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/jpg, image/png',
    maxFiles: 2,
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <div>
          <FiUpload />
          <p>Solte os arquivos aqui</p>
        </div>
      ) : (
        <div>
          <FiUpload />
          <div>
            <p>Arraste e solte os arquivos aqui, ou clique para selecionar</p>
            <p>
              Somente serão aceitos arquivos nos formatos <b>jpg</b>,{' '}
              <b>jpeg</b> e <b>png</b>
            </p>
            <p>( Máximo de 2 imagens )</p>
          </div>
        </div>
      )}
    </Container>
  );
}
