import { useEffect, useState } from 'react';
import { BarGraphic } from './BarGraphic';
import { LineGraphic } from './LineGraphic';

import api from '../../../services/api';

import { Container, Content, Statistics } from './styles';

interface AdsPerMonthStatistics {
  months: string[];
  numberOfAds: number[];
}

interface AdsPerCategoryStatistics {
  category: string;
  count: number;
}

export function Dashboard() {
  const [
    adsPerMonthStatistics,
    setAdsPerMonthStatistics,
  ] = useState<AdsPerMonthStatistics>({} as AdsPerMonthStatistics);
  const [adsPerCategoryStatistics, setAdsPerCategoryStatistics] = useState<
    AdsPerCategoryStatistics[]
  >([] as AdsPerCategoryStatistics[]);

  useEffect(() => {
    async function getAdsPerMonthStatistics() {
      const response = await api.get('/statistics/announcements/total');

      const adsPerMonth = response.data;

      setAdsPerMonthStatistics({
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

    getAdsPerMonthStatistics();
  }, []);

  useEffect(() => {
    async function getAdsPerCategoryStatistics() {
      const response = await api.get(
        '/statistics/announcements/total_category',
      );

      const adsPerCategory = response.data;

      setAdsPerCategoryStatistics(adsPerCategory);
    }

    getAdsPerCategoryStatistics();
  }, []);

  return (
    <Container>
      <Content>
        <header>
          <h1>Dashboard</h1>
        </header>

        <Statistics>
          <LineGraphic adsStatistics={adsPerMonthStatistics} />
          <BarGraphic adsStatistics={adsPerCategoryStatistics} />
        </Statistics>
      </Content>
    </Container>
  );
}
