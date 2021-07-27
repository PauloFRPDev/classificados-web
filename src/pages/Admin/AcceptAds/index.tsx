import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { FiCheck, FiFrown, FiMaximize2, FiTrash } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import { Slideshow } from '../../../components/Slideshow';

import { Container, Content, AdsList, Ad, Footer, Actions } from './styles';

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

export function AcceptAds() {
  const [ads, setAds] = useState<AdProps[]>([]);
  const [adFiles, setAdFiles] = useState<AdFilesProps[]>([]);

  const [slideshowModalIsOpen, setSlideshowModalIsOpen] = useState(false);
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

  return (
    <Container>
      <Slideshow
        isOpen={slideshowModalIsOpen}
        setIsOpen={setSlideshowModalIsOpen}
        adFiles={adFiles}
      />

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
