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

export function BarGraphic() {
  const [barData, setBarData] = useState<ChartData>();
  const [barOptions, setBarOptions] = useState<ChartOption>();

  useEffect(() => {
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
  }, []);

  return (
    <Container>
      <span>Anúncios por categoria</span>
      <Bar data={barData} options={barOptions} />
    </Container>
  );
}
