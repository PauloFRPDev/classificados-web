import { useEffect, useState, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { MdSearch } from 'react-icons/md';
import { FiFrown, FiMaximize2 } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import ClipLoader from 'react-spinners/ClipLoader';

import api from '../../services/api';

import { Input } from '../../components/Input';
import { Slideshow } from '../../components/Slideshow';
import { Select } from '../../components/Select';

import { Container, Content, SearchHeader, AdsList, Ad } from './styles';

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

interface CategoryProps {
  value: number;
  label: string;
}

export function ListAds() {
  const formRef = useRef<FormHandles>(null);

  const [categories, setCategories] = useState<CategoryProps[]>();
  const [citySearched, setCitySearched] = useState('');
  const [districtSearched, setDistrictSearched] = useState('');
  const [descriptionSearched, setDescriptionSearched] = useState('');
  const [categorySearched, setCategorySearched] = useState('');

  const [ads, setAds] = useState<AdProps[]>([]);
  const [adFiles, setAdFiles] = useState<AdFilesProps[]>([]);

  const [slideshowModalIsOpen, setSlideshowModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadAds(): Promise<void> {
      setIsLoading(true);

      const response = await api.get('/announcements', {
        params: {
          city: citySearched.toLowerCase(),
          district: districtSearched.toLowerCase(),
          description:
            descriptionSearched !== ''
              ? descriptionSearched.toLowerCase()
              : null,
          category: categorySearched,
        },
      });

      const retrievedAds = response.data;

      const parsedRetrievedAds = retrievedAds.map((retrievedAd: AdProps) => ({
        ...retrievedAd,
        parsedDate: format(parseISO(retrievedAd.created_at), 'dd/MM/yyyy'),
      }));

      setIsLoading(false);
      setAds(parsedRetrievedAds);
    }

    async function loadCategories(): Promise<void> {
      const response = await api.get('categories');

      setCategories(response.data);

      setIsLoading(false);
    }

    loadAds();
    loadCategories();
  }, [categorySearched, citySearched, districtSearched, descriptionSearched]);

  const handleSearch = () => {
    // TODO
  };

  const handleOpenSlideshow = () => {
    setSlideshowModalIsOpen(true);
  };

  return (
    <Container>
      <Slideshow
        isOpen={slideshowModalIsOpen}
        setIsOpen={setSlideshowModalIsOpen}
        adFiles={adFiles}
      />

      <Content>
        <h1>LISTAGEM DE CLASSIFICADOS</h1>

        <SearchHeader>
          <Form ref={formRef} onSubmit={handleSearch}>
            <div>
              <Input
                name="city"
                label="Cidade"
                value={citySearched}
                onChange={e => setCitySearched(e.target.value)}
                icon={MdSearch}
              />
              <Input
                name="district"
                label="Bairro"
                value={districtSearched}
                onChange={e => setDistrictSearched(e.target.value)}
                icon={MdSearch}
              />
              <Input
                name="description"
                label="Descrição"
                value={descriptionSearched}
                onChange={e => setDescriptionSearched(e.target.value)}
                icon={MdSearch}
              />
            </div>

            <Select
              type="text"
              name="category_id"
              label="Categoria do anúncio"
              placeholderText="Selecione a categoria"
              options={categories}
              onChange={option => setCategorySearched(option?.value)}
            />
          </Form>
        </SearchHeader>

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
                    <p>
                      {ad.district.title} - {ad.city.title}
                    </p>
                    <span>{ad.description}</span>
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
