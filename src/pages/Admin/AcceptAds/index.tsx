import { useEffect, useState, useRef } from 'react';
import { format, parseISO } from 'date-fns';
import { Form } from '@unform/web';
import {
  FiCheck,
  FiEdit2,
  FiFrown,
  FiMaximize2,
  FiTrash,
} from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import { Slideshow } from '../../../components/Slideshow';
import { ModalComponent } from '../../../components/Modal';
import { TextArea } from '../../../components/TextArea';

import {
  Container,
  ModalContainer,
  Content,
  AdsList,
  Ad,
  Footer,
  Actions,
} from './styles';

interface AdProps {
  id: string;
  phone_number: string;
  email: string;
  description: string;
  created_at: string;
  parsedDate: string;
  city: {
    title: string;
  };
  district: {
    title: string;
  };
  category: {
    title: string;
  };
  jurisdicted: {
    name: string;
  };
  files: {
    filename: string;
    file_url: string;
  }[];
}

interface AdFilesProps {
  filename: string;
  file_url: string;
}

interface EditAdFormData {
  description: string;
}

export function AcceptAds() {
  const formRef = useRef<FormHandles>(null);

  const [ads, setAds] = useState<AdProps[]>([]);
  const [adFiles, setAdFiles] = useState<AdFilesProps[]>([]);
  const [editingAd, setEditingAd] = useState<AdProps>();
  const [descriptionSizeValue, setDescriptionSizeValue] = useState(0);

  const [slideshowModalIsOpen, setSlideshowModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { addToast } = useToast();

  useEffect(() => {
    async function loadAdsToBeAccepted() {
      setIsLoading(true);

      const response = await api.get('/ads/to_accept');

      const retrievedAds = response.data;

      const parsedRetrievedAds = retrievedAds.map((retrievedAd: AdProps) => ({
        ...retrievedAd,
        parsedDate: format(parseISO(retrievedAd.created_at), 'dd/MM/yyyy'),
      }));

      setIsLoading(false);
      setAds(parsedRetrievedAds);
    }

    loadAdsToBeAccepted();
  }, []);

  const handleOpenSlideshow = () => {
    setSlideshowModalIsOpen(true);
  };

  const handleAcceptAd = async (adId: string) => {
    try {
      await api.patch(`/ads/accept/${adId}`);

      setAds(ads.filter(ad => ad.id !== adId));

      addToast({
        type: 'success',
        title: 'Anúncio aprovado com sucesso',
        description: 'O anúncio foi aprovado com sucesso.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao aprovar o anúncio',
        description:
          'Ocorreu um erro ao aprovar o anúncio, por favor tente novamente.',
      });
    }
  };

  const handleEditAd = (ad: AdProps) => {
    setEditingAd(ad);
    setEditModalIsOpen(true);
  };

  const handleDeleteAd = async (adId: string) => {
    try {
      await api.delete(`/ads/${adId}`);

      setAds(ads.filter(ad => ad.id !== adId));

      addToast({
        type: 'success',
        title: 'Anúncio deletado com sucesso',
        description: 'O anúncio foi removido com sucesso.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao deletar o anúncio',
        description:
          'Ocorreu um erro ao deletar o anúncio, por favor tente novamente.',
      });
    }
  };

  const handleEditSubmit = async (data: EditAdFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        description: Yup.string()
          .min(10, 'Descrição deve ter pelo menos 10 caracteres')
          .required('Anúncio obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { description } = data;

      const formData = {
        description,
      };

      const response = await api.put(`/ads/${editingAd?.id}`, formData);

      const adsUpdated = ads.map(ad => {
        if (ad.id === response.data.id) {
          return {
            ...ad,
            description: response.data.description,
          };
        }

        return ad;
      });

      setAds(adsUpdated);

      addToast({
        type: 'success',
        title: 'Anúncio editado com sucesso.',
        description: 'O anúncio foi editado com sucesso.',
      });

      setEditModalIsOpen(false);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao editar o anúncio.',
        description:
          'Ocorreu um erro ao editar o anúncio, favor tentar novamente.',
      });
    }
  };

  return (
    <Container>
      <Slideshow
        isOpen={slideshowModalIsOpen}
        setIsOpen={setSlideshowModalIsOpen}
        adFiles={adFiles}
      />

      {editingAd && (
        <ModalComponent isOpen={editModalIsOpen} setIsOpen={setEditModalIsOpen}>
          <ModalContainer>
            <header>
              <h3>{editingAd.jurisdicted.name}</h3>
            </header>

            <main>
              <Form
                ref={formRef}
                onSubmit={handleEditSubmit}
                initialData={{ description: editingAd.description }}
              >
                <div className="description-area">
                  <TextArea
                    name="description"
                    label="Anúncio"
                    maxLength={300}
                    onChange={event => {
                      setDescriptionSizeValue(event.target.value.length);
                    }}
                  />
                  <span>
                    {300 - descriptionSizeValue} caractere(s) restante(s)
                  </span>
                </div>

                <footer>
                  <button type="submit">Alterar</button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditModalIsOpen(false);
                    }}
                  >
                    Cancelar
                  </button>
                </footer>
              </Form>
            </main>
          </ModalContainer>
        </ModalComponent>
      )}

      <Content>
        <h1>Anúncios pendentes</h1>

        {isLoading ? (
          <ClipLoader />
        ) : (
          <AdsList>
            {ads.length !== 0 ? (
              ads.map(ad => (
                <Ad key={ad.id}>
                  <header>
                    <div>
                      <h3>{ad.jurisdicted.name}</h3>
                      <span>
                        {ad.email} - {ad.phone_number}
                      </span>
                    </div>
                    <div>
                      <p>{ad.parsedDate}</p>
                      <p>{ad.category.title}</p>
                    </div>
                  </header>

                  <main>
                    {ad.files.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setAdFiles(ad.files);
                          handleOpenSlideshow();
                        }}
                      >
                        {ad.files.length === 1
                          ? `${ad.files.length} imagem`
                          : `${ad.files.length} imagens`}
                        <FiMaximize2 />
                      </button>
                    )}

                    <Footer>
                      <div>
                        <p>
                          {ad.district.title} - {ad.city.title}
                        </p>
                        <span>{ad.description}</span>
                      </div>
                      <Actions>
                        <button
                          type="button"
                          onClick={() => handleAcceptAd(ad.id)}
                        >
                          <FiCheck />
                        </button>

                        <button type="button" onClick={() => handleEditAd(ad)}>
                          <FiEdit2 />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteAd(ad.id)}
                        >
                          <FiTrash />
                        </button>
                      </Actions>
                    </Footer>
                  </main>
                </Ad>
              ))
            ) : (
              <div className="adsNotFound">
                <FiFrown />
                <span>Desculpe, não foi possível encontrar nenhum anúncio</span>
              </div>
            )}
          </AdsList>
        )}
      </Content>
    </Container>
  );
}