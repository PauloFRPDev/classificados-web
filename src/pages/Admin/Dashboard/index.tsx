import { useEffect, useState } from 'react';
import { BarGraphic } from './BarGraphic';
import { LineGraphic } from './LineGraphic';

import api from '../../../services/api';

import { Container, Content, Statistics } from './styles';

interface AdsStatistics {
  months: string[];
  numberOfAds: number[];
}

export function Dashboard() {
  const [adsStatistics, setAdsStatistics] = useState<AdsStatistics>(
    {} as AdsStatistics,
  );

  useEffect(() => {
    async function getAdsStatistics() {
      const response = await api.get('/statistics/ads/total');

      const adsPerMonth = response.data;

      setAdsStatistics({
        months: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ],
        numberOfAds: adsPerMonth,
      });
    }

    getAdsStatistics();
  }, []);

  return (
    <Container>
      <Content>
        <header>
          <h1>Dashboard</h1>
        </header>

        <Statistics>
          <LineGraphic adsStatistics={adsStatistics} />
          <BarGraphic />
        </Statistics>
      </Content>
    </Container>
  );
}
