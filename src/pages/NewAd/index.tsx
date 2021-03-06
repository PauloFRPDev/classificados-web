import { ChangeEvent, useRef, useState, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import { InputMask } from '../../components/InputMask';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { Select } from '../../components/Select';
import { Dropzone } from '../../components/Dropzone';
import { ModalComponent } from '../../components/Modal';

import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import {
  Container,
  ModalContainer,
  Content,
  FormFirstLine,
  FormSecondLine,
  FormForthLine,
  ActionsContainer,
} from './styles';

interface AdFormData {
  cpf: number;
  phone_number: number;
  email: string;
  category_id: number;
  city_id: number;
  district_id: number;
  description: string;
}

interface JurisdictedData {
  cpfcnpj: string;
  nome: string;
  categoryId: number;
  category: string;
  numeroRegistro: number;
  nomeRazaoSocial: string;
}

interface CategoryProps {
  value: number;
  label: string;
}

interface CityProps {
  value: number;
  label: string;
}

interface DistrictProps {
  value: number;
  label: string;
}

export function NewAd() {
  const formRef = useRef<FormHandles>(null);

  const [descriptionSizeValue, setDescriptionSizeValue] = useState(0);
  const [adId, setAdId] = useState('');
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [cities, setCities] = useState<CityProps[]>([]);
  const [districts, setDistricts] = useState<DistrictProps[]>([]);
  const [jurisdicted, setJurisdicted] = useState<JurisdictedData>();
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jurisdictedInDebt, setJurisdictedInDebt] = useState(false);
  const [cellphoneInputMask, setCellphoneInputMask] = useState('');

  const { addToast } = useToast();

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const response = await api.get('categories');

      setCategories(response.data);
    }

    loadCategories();
  }, []);

  const handleSearchCities = async (citySearched: string) => {
    const response = await api.get('/cities', {
      params: {
        title: citySearched,
      },
    });

    setCities(response.data);
  };

  const handleSearchDistricts = async (districtSearch: string) => {
    const response = await api.get('/districts', {
      params: {
        title: districtSearch,
      },
    });

    setDistricts(response.data);
  };

  const handleCleanFields = () => {
    formRef.current?.reset();
    formRef.current?.getFieldRef('category_id').select.clearValue();
    formRef.current?.getFieldRef('city_id').select.clearValue();
    formRef.current?.getFieldRef('district_id').select.clearValue();
  };

  const handleInsertAd = async (data: AdFormData) => {
    setIsLoading(true);

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        cpf: Yup.string().required('CPF obrigat??rio'),
        category: Yup.string().required('Categoria obrigat??ria'),
        subscriptionNumber: Yup.string().required(
          'N??mero de inscri????o obrigat??rio',
        ),
        phone_number: Yup.string()
          .min(14, 'Favor inserir um n??mero de telefone v??lido')
          .required('Telefone obrigat??rio'),
        email: Yup.string()
          .required('E-mail obrigat??rio')
          .email('Digite um e-mail v??lido'),
        category_id: Yup.string().required('Categoria do an??ncio obrigat??ria'),
        city_id: Yup.string().required('Cidade obrigat??ria'),
        district_id: Yup.string().required('Bairro obrigat??rio'),
        description: Yup.string()
          .min(10, 'Descri????o deve ter pelo menos 10 caracteres')
          .required('An??ncio obrigat??rio'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        cpf,
        phone_number,
        email,
        category_id,
        city_id,
        district_id,
        description,
      } = data;

      const formData = {
        cpf,
        phone_number,
        email,
        category_id: Number(category_id),
        city_id: Number(city_id),
        district_id: Number(district_id),
        description,
        jurisdictedIsInDebt: jurisdictedInDebt,
      };

      if (isSearching) {
        addToast({
          type: 'info',
          title: 'Por favor aguarde',
          description:
            'Por favor, aguarde at?? o final do carregamento dos campos de Categoria, Inscri????o e Nome.',
        });
        return;
      }

      const response = await api.post('/announcements', formData);

      const { id } = response.data;

      setAdId(id);

      addToast({
        type: 'success',
        title: 'An??ncio criado',
        description: 'Seu an??ncio foi criado com sucesso.',
      });

      setIsLoading(false);
      handleCleanFields();
      setDescriptionSizeValue(0);
    } catch (err) {
      setIsLoading(false);

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      } else {
        switch (err.response.data.message) {
          case 'You can not have more than one active or to be activated ad on the same category.':
            addToast({
              type: 'error',
              title: 'Erro na cria????o do an??ncio',
              description:
                'N??o ?? poss??vel ter mais de um an??ncio na mesma categoria.',
            });
            break;
          case 'You can not have more than three active ads.':
            addToast({
              type: 'error',
              title: 'Erro na cria????o do an??ncio',
              description: 'N??o ?? poss??vel ter mais de tr??s an??ncios ativos.',
            });
            break;
          default:
            addToast({
              type: 'error',
              title: 'Erro na cria????o do an??ncio',
              description:
                'Houve um erro ao tentar inserir um an??ncio, por favor tente novamente.',
            });
        }
      }
    }
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length >= 3 && event.target.value.length <= 14) {
      setCellphoneInputMask('(99) 9999-9999');
    }

    if (event.target.value.length === 15) {
      setCellphoneInputMask('(99) 99999-9999');
    }
  };

  const handleSearchJurisdicted = async (cpf: string) => {
    try {
      if (cpf.length === 14) {
        setIsSearching(true);
        setJurisdictedInDebt(false);
        formRef.current?.setFieldValue('name', '');

        const response = await api.get('jurisdicted', {
          headers: {
            cpf,
          },
        });

        setIsSearching(false);
        setJurisdicted(response.data);
      }
    } catch (err) {
      setIsSearching(false);

      if (err.response.data.message === 'Jurisdicted is in debt') {
        setJurisdictedInDebt(true);
      }

      formRef.current?.setFieldValue(
        'name',
        err.response.data.message !== 'Jurisdicted is in debt'
          ? 'Ops, n??o pudemos encontrar nenhum registro.'
          : `Ops, ocorreu um erro ao buscar o(a) profissional com o CPF ${formRef.current?.getFieldValue(
              'cpf',
            )}.`,
      );
      formRef.current?.setFieldValue('category', '');
      formRef.current?.setFieldValue('subscriptionNumber', '');
    }
  };

  useEffect(() => {
    if (jurisdicted) {
      formRef.current?.setFieldValue('name', jurisdicted.nomeRazaoSocial);
      formRef.current?.setFieldValue('category', jurisdicted.category);
      formRef.current?.setFieldValue(
        'subscriptionNumber',
        jurisdicted.numeroRegistro,
      );
    }
  }, [jurisdicted]);

  return (
    <Container>
      <ModalComponent isOpen={jurisdictedInDebt}>
        <ModalContainer>
          <header>
            <h3>ATEN????O!</h3>
          </header>

          <main>
            <p>
              Ocorreu um erro ao buscar o cpf do profissional.
              <br /> Para visualizar e editar seu cadastro no CRO, clique no
              seguinte link:{' '}
              <a
                href="https://cro-rj.implanta.net.br/servicosonline/"
                target="blank"
              >
                https://cro-rj.implanta.net.br/servicosonline/
              </a>
            </p>
          </main>

          <footer>
            <p>
              J?? entrou no servi??o online, n??o existem erros no cadastro e ainda
              n??o consegue inserir um an??ncio?
              <br /> Favor entrar em contato atrav??s do endere??o de e-mail{' '}
              <strong>suporte@cro-rj.org.br</strong>
            </p>
          </footer>
        </ModalContainer>
      </ModalComponent>

      <Content>
        <h1>Novo an??ncio</h1>

        <Form ref={formRef} onSubmit={handleInsertAd}>
          <FormFirstLine>
            <InputMask
              mask="999.999.999-99"
              onChange={e => {
                handleSearchJurisdicted(e.target.value);
              }}
              type="text"
              name="cpf"
              label="CPF"
              disabled={isSearching}
              style={isSearching ? { cursor: 'not-allowed' } : {}}
            />

            <Input
              type="text"
              name="category"
              disabled
              label="Categoria"
              isSearching={isSearching}
            />

            <Input
              type="text"
              name="subscriptionNumber"
              disabled
              label="Inscri????o"
              isSearching={isSearching}
            />
          </FormFirstLine>

          <div className="name-jurisdicted">
            <Input
              type="text"
              name="name"
              disabled
              label="Nome"
              isSearching={isSearching}
            />
          </div>

          <FormSecondLine>
            <InputMask
              mask={cellphoneInputMask}
              onKeyDown={e => {
                if (e.currentTarget.value.length === 14) {
                  setCellphoneInputMask('(99) 99999-9999');
                }
              }}
              onBlur={handlePhoneChange}
              onChange={handlePhoneChange}
              type="text"
              name="phone_number"
              label="Celular com DDD"
            />

            <Input type="text" name="email" label="E-mail" />
          </FormSecondLine>

          <Select
            type="text"
            name="category_id"
            label="Categoria do an??ncio"
            placeholderText="Selecione a categoria"
            options={categories}
          />

          <FormForthLine>
            <Select
              type="text"
              name="city_id"
              label="Cidade"
              placeholderText="Selecione a cidade"
              onInputChange={city => {
                if (city.length >= 3) {
                  handleSearchCities(city);
                }
              }}
              options={cities}
            />

            <Select
              type="text"
              name="district_id"
              label="Bairro"
              placeholderText="Selecione o estado"
              onInputChange={district => {
                if (district.length >= 3) {
                  handleSearchDistricts(district);
                }
              }}
              options={districts}
            />
          </FormForthLine>

          <div className="description-area">
            <TextArea
              name="description"
              label="An??ncio"
              maxLength={300}
              onChange={event => {
                setDescriptionSizeValue(event.target.value.length);
              }}
            />
            <span>{300 - descriptionSizeValue} caractere(s) restante(s)</span>
          </div>

          <Dropzone adId={adId} setAdId={setAdId} />

          <ActionsContainer>
            <button type="submit" disabled={isLoading}>
              CADASTRAR
            </button>

            <button type="button" onClick={handleCleanFields}>
              LIMPAR
            </button>
          </ActionsContainer>
        </Form>
      </Content>
    </Container>
  );
}
