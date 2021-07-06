import { useState, useEffect } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { FiUpload, FiX } from 'react-icons/fi';

import { Container, PreviewContent } from './styles';

interface FileProps extends FileWithPath {
  preview: string;
}

export function Dropzone() {
  const [files, setFiles] = useState<FileProps[]>([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: acceptedFiles => {
      if (files.length < 2) {
        const uploadedFiles = acceptedFiles.map(file => ({
          ...file,
          preview: URL.createObjectURL(file),
        }));

        setFiles([...files, ...uploadedFiles]);
      }
    },
    accept: 'image/jpeg, image/jpg, image/png',
    maxFiles: files.length === 0 ? 2 : 1,
    disabled: files.length === 2,
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  const handleDeleteFilePreview = (filePreview?: string) => {
    setFiles(files.filter(file => file.preview !== filePreview));
  };

  return (
    <Container {...getRootProps()} disabled={files.length === 2}>
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

      {files.length > 0 && (
        <PreviewContent>
          {files.map(file => (
            <div key={file.preview}>
              <img src={file.preview} alt={file.name} />
              <button
                type="button"
                onClick={() => handleDeleteFilePreview(file.preview)}
              >
                <FiX />
              </button>
            </div>
          ))}
        </PreviewContent>
      )}
    </Container>
  );
}
