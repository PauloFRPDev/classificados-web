export default function abbreviateJurisdictedCategoryTitle(
  category_name: string,
): string {
  const categories: Record<string, string> = {
    'Cirurgião Dentista': 'CD',
    'Entidade Prestadora de Assistência Odontológica': 'EPAO',
    'Técnico de Prótese Dentária': 'TPD',
    Laboratório: 'LB',
    'Técnico de Saúde Bucal': 'TSB',
    'Auxiliar de Saúde Bucal': 'ASB',
    'Auxiliar de Prótese Dentária': 'APD',
  };

  return categories[category_name] ?? '';
}
