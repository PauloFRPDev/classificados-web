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
                A previsão para seu anúncio ser publicado é de até 2 dias, caso
                esteja em dia com as obrigações financeiras.
              </span>
            </li>

            <li>
              <FiAlertCircle />

              <span>
                O anúncio ficará disponível no site por 60 dias. Após este
                prazo, o mesmo será retirado.
              </span>
            </li>

            <li>
              <FiAlertCircle />

              <span>
                Informamos que todos os campos serão publicados. Sugerimos que o
                telefone e o e-mail sejam informados, para minimizar falhas de
                comunicação.
              </span>
            </li>

            <li>
              <FiAlertCircle />

              <span>
                Solicitamos que caso haja alguma intercorrência negativa entre
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

              <span>
                Endereço de site, blog ou similar não serão publicados.
              </span>
            </li>

            <li>
              <FiAlertCircle />

              <span>
                Anúncios com a mesma categoria não serão permitidos até que o já
                publicado expire.
              </span>
            </li>

            <li>
              <FiAlertCircle />

              <span>
                São permitidos o máximo de 3 anúncios (não expirados) por CPF,
                desde que estejam em categorias diferentes.
              </span>
            </li>

            <li>
              <FiAlertCircle />

              <span>Serão permitidas um máximo de 2 imagens por anúncio.</span>
            </li>

            <li>
              <FiAlertCircle />

              <span>
                Para entitular-se especialista, é necessário possuir a
                especialização registrada junto ao CRO-RJ, caso contrário, o
                correto é intitular-se como Clínico-Geral atuando na
                especialidade
              </span>
            </li>

            <li>
              <FiAlertCircle />

              <span>
                Caso haja alguma questão sobre assuntos relativos à OFERTA DE
                PROFISSIONAIS e OPORTUNIDADES DE EMPREGO, por favor, envie
                e-mail para sefis@cro-rj.org.br (Fiscalização CRO-RJ).
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
