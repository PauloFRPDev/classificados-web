import { useState, useEffect } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { FiUpload, FiX } from 'react-icons/fi';

import api from '../../services/api';

import { Container, PreviewContent } from './styles';

interface FileProps extends FileWithPath {
  preview: string;
}

interface DropzoneProps {
  adId: string;
  setAdId: (id: string) => void;
}

export function Dropzone({ adId, setAdId }: DropzoneProps) {
  const [files, setFiles] = useState<FileProps[]>([]);
  const [formData, setFormData] = useState<FormData>(new FormData());

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: acceptedFiles => {
      acceptedFiles.forEach(file => {
        formData.append('files', file);
      });

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

  useEffect(() => {
    const handleInsertAdFiles = async (id: string) => {
      if (files) {
        await api.post(`/ads/${id}/files/add`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setFiles([]);
    };

    if (adId && files.length !== 0) {
      handleInsertAdFiles(adId);
      setAdId('');
      setFormData(new FormData());
    }
  }, [formData, files, adId, setAdId]);

  const handleDeleteFilePreview = (filePreview?: string) => {
    setFiles(files.filter(file => file.preview !== filePreview));
  };

  return (
    <Container {...getRootProps()} disabled={files.length === 2}>
      <input type="file" name="files" {...getInputProps()} />
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
