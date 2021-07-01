import { useHistory } from 'react-router-dom';
import { FiAlertCircle, FiPlus, FiList } from 'react-icons/fi';

import { Container, Content, RuleSection } from './styles';

export function Home() {
  const history = useHistory();

  return (
    <Container>
      <Content>
        <h1>CADASTRO DE CLASSIFICADOS - CRO-RJ</h1>

        <RuleSection>
          <ul>
            <li>
              <FiAlertCircle />

              <span>
                Previsão para seu anúncio ser publicado: Até 2 dias, caso esteja
                em dia com as obrigações financeiras.
              </span>
            </li>

            <li>
              <FiAlertCircle />

              <span>
                O anúncio ficará disponível no site por 60 dias. Após este prazo
                expirará e será retirado.
              </span>
            </li>

            <li>
              <FiAlertCircle />

              <span>
                Informamos que serão publicados, todos os campos preenchidos e
                sugerimos que o telefone e o e-mail sejam informados, para
                minimizar falhas de comunicação.
              </span>
            </li>

            <li>
              <FiAlertCircle />

              <span>
                Solicitamos, caso haja alguma intercorrência negativa entre
                anunciantes e anunciados, que seja comunicado de imediato a
                Ouvidoria do CRO-RJ.
              </span>
            </li>

            <li>
              <FiAlertCircle />

              <span>
                Não será permitida a publicação de anúncios com referência a
                ESTÁGIOS, PORCENTAGEM de remuneração ou COMISSÃO.
              </span>
            </li>

            <li>
              <FiAlertCircle />

              <span>
                Expressões com as palavras &quot;dentista orçamentista&quot; ou
                &quot;avaliador&quot; e similares não serão publicadas.
              </span>
            </li>

            <li>
              <FiAlertCircle />

              <span>Endereço de site, blog ou similar não será publicado.</span>
            </li>

            <li>
              <FiAlertCircle />

              <span>
                Pedimos que não repita postagem do mesmo anúncio, pelo
                formulário eletrônico, antes que seja retirado do site.
              </span>
            </li>
          </ul>
        </RuleSection>

        <div>
          <button type="button" onClick={() => history.push('/new')}>
            <FiPlus color="#fff" />

            <span>Adicionar</span>
          </button>

          <button type="button" onClick={() => history.push('/list')}>
            <FiList color="#fff" />

            <span>Pesquisar</span>
          </button>
        </div>
      </Content>
    </Container>
  );
}
