import { useEffect, useState } from 'react';
import { BarGraphic } from './BarGraphic';
import { LineGraphic } from './LineGraphic';

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
        numberOfAds: [5, 10, 8, 15, 25, 40, 30, 2, 7, 24, 23, 10],
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
