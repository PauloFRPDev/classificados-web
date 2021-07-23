import { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { parseISO } from 'date-fns';

import api from '../../../services/api';

import { Container, Content, Statistics } from './styles';

interface AdProps {
  created_at: string;
}

interface AdsStatistics {
  months: string[];
  numberOfAds: number[];
}

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

export function Dashboard() {
  const [adsStatistics, setAdsStatistics] = useState<AdsStatistics>(
    {} as AdsStatistics,
  );
  const [lineData, setLineData] = useState<ChartData>();
  const [lineOptions, setLineOptions] = useState<ChartOption>();
  const [barData, setBarData] = useState<ChartData>();
  const [barOptions, setBarOptions] = useState<ChartOption>();

  useEffect(() => {
    async function getAdsStatistics() {
      // const response = await api.get('ads');

      // const ads = response.data;

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

    setBarData({
      labels: [
        'Aluguel - Horário',
        'Aluguel - Mensal',
        'Oferta de Profissionais',
        'Oportunidades de Emprego',
        'Venda - Sala, consultório e clínica',
        'Equipamentos - compra',
        'Equipamentos - venda',
        'Equipamentos - doações',
      ],
      datasets: [
        {
          label: 'Quantidade de anúncios por categoria',
          data: [5, 10, 8, 15, 25, 40, 30, 2],
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
  }, [setLineData, setBarData]);

  return (
    <Container>
      <Content>
        <header>
          <h1>Dashboard</h1>
        </header>

        <Statistics>
          <Line data={lineData} options={lineOptions} />
          <Bar data={barData} options={barOptions} />
        </Statistics>
      </Content>
    </Container>
  );
}
