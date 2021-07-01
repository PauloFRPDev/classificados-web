import { useEffect, useState, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { MdSearch } from 'react-icons/md';
import { format, parseISO } from 'date-fns';

import api from '../../services/api';

import { Input } from '../../components/Input';

import { Container, Content, SearchHeader, AdsList, Ad } from './styles';

interface AdProps {
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
}

export function ListAds() {
  const formRef = useRef<FormHandles>(null);

  const [ads, setAds] = useState<AdProps[]>([]);

  useEffect(() => {
    api.get('/ads').then(response => {
      const retrievedAds = response.data;

      const parsedRetriecedAds = retrievedAds.map((retrievedAd: AdProps) => ({
        ...retrievedAd,
        parsedDate: format(parseISO(retrievedAd.created_at), 'dd-MM-yyyy'),
      }));

      setAds(parsedRetriecedAds);
    });
  }, []);

  const handleSearch = () => {
    // TODO
  };

  return (
    <Container>
      <Content>
        <h1>LISTAGEM DE CLASSIFICADOS</h1>

        <SearchHeader>
          <Form ref={formRef} onSubmit={handleSearch}>
            <Input name="city" label="Cidade" icon={MdSearch} />
            <Input name="district" label="Bairro" icon={MdSearch} />
            <Input name="description" label="Descrição" icon={MdSearch} />
          </Form>
        </SearchHeader>

        <AdsList>
          {ads.map(ad => (
            <Ad>
              <header>
                <div>
                  <h3>{ad.jurisdicted.name}</h3>
                  <span>
                    {ad.email} - {ad.phone_number}
                  </span>
                </div>
                <p>{ad.parsedDate}</p>
              </header>

              <main>
                <p>
                  {ad.district.title} - {ad.city.title}
                </p>
                <span>{ad.description}</span>
              </main>
            </Ad>
          ))}
        </AdsList>
      </Content>
    </Container>
  );
}
