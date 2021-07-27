import { useEffect, useState } from 'react';

import { Bar } from 'react-chartjs-2';

import { Container } from './styles';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
  }[];
}

interface ChartOption {
  scales: {
    yAxes: {
      ticks: {
        beginAtZero: boolean;
      };
    }[];
  };
}

interface BarGraphicProps {
  adsStatistics: {
    category: string;
    count: number;
  }[];
}

export function BarGraphic({ adsStatistics }: BarGraphicProps) {
  const [barData, setBarData] = useState<ChartData>();
  const [barOptions, setBarOptions] = useState<ChartOption>();

  useEffect(() => {
    const categories = adsStatistics.map(adStatistic => adStatistic.category);
    const counts = adsStatistics.map(adStatistics => adStatistics.count);

    setBarData({
      labels: categories,
      datasets: [
        {
          label: 'Quantidade de anúncios por categoria',
          data: counts,
          fill: false,
          backgroundColor: '#96030fCC',
          borderColor: '#96030f',
        },
      ],
    });

    setBarOptions({
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    });
  }, [adsStatistics]);

  return (
    <Container>
      <span>Anúncios por categoria</span>
      <Bar data={barData} options={barOptions} />
    </Container>
  );
}
