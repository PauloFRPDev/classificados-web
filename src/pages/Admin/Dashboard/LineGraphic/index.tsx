import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

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

interface LineGraphicProps {
  adsStatistics: {
    months: string[];
    numberOfAds: number[];
  };
}

export function LineGraphic({ adsStatistics }: LineGraphicProps) {
  const [lineData, setLineData] = useState<ChartData>();
  const [lineOptions, setLineOptions] = useState<ChartOption>();

  useEffect(() => {
    setLineData({
      labels: adsStatistics.months,
      datasets: [
        {
          label: 'Quantidade de novos anúncios',
          data: adsStatistics.numberOfAds,
          fill: false,
          backgroundColor: '#96030f',
          borderColor: '#96030f33',
        },
      ],
    });

    setLineOptions({
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
  }, [adsStatistics.months, adsStatistics.numberOfAds]);

  return (
    <Container>
      <span>Novos anúncios</span>
      <Line data={lineData} options={lineOptions} />
    </Container>
  );
}
