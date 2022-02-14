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
  MultipleRecordCard,
} from './styles';

interface AdFormData {
  cpf: number;
  category: string;
  subscriptionNumber: string;
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
  const [jurisdicted, setJurisdicted] = useState<JurisdictedData[]>();
  const [multipleRecords, setMultipleRecords] = useState(false);
  const [
    selectedJurisdicted,
    setSelectedJurisdicted,
  ] = useState<JurisdictedData>({} as JurisdictedData);
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
        cpf: Yup.string().required('CPF obrigatório'),
        category: Yup.string().required('Categoria obrigatória'),
        subscriptionNumber: Yup.string().required(
          'Número de inscrição obrigatório',
        ),
        phone_number: Yup.string()
          .min(14, 'Favor inserir um número de telefone válido')
          .required('Telefone obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        category_id: Yup.string().required('Categoria do anúncio obrigatória'),
        city_id: Yup.string().required('Cidade obrigatória'),
        district_id: Yup.string().required('Bairro obrigatório'),
        description: Yup.string()
          .min(10, 'Descrição deve ter pelo menos 10 caracteres')
          .required('Anúncio obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        cpf,
        category,
        subscriptionNumber,
        phone_number,
        email,
        category_id,
        city_id,
        district_id,
        description,
      } = data;

      const formData = {
        cpf,
        subscriptionCategory: category,
        subscriptionNumber,
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
            'Por favor, aguarde até o final do carregamento dos campos de Categoria, Inscrição e Nome.',
        });
        return;
      }

      const response = await api.post('/announcements', formData);

      const { id } = response.data;

      setAdId(id);

      addToast({
        type: 'success',
        title: 'Anúncio criado',
        description: 'Seu anúncio foi criado com sucesso.',
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
              title: 'Erro na criação do anúncio',
              description:
                'Não é possível ter mais de um anúncio na mesma categoria.',
            });
            break;
          case 'You can not have more than three active ads.':
            addToast({
              type: 'error',
              title: 'Erro na criação do anúncio',
              description: 'Não é possível ter mais de três anúncios ativos.',
            });
            break;
          default:
            addToast({
              type: 'error',
              title: 'Erro na criação do anúncio',
              description:
                'Houve um erro ao tentar inserir um anúncio, por favor tente novamente.',
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
        setMultipleRecords(false);
        formRef.current?.setFieldValue('name', '');

        const response = await api.get('jurisdicted', {
          headers: {
            cpf,
          },
        });

        setIsSearching(false);
        setJurisdicted(response.data);

        if (response.data.length === 0) {
          formRef.current?.setFieldValue(
            'name',
            `Ops, ocorreu um erro ao buscar o(a) profissional com o CPF ${formRef.current?.getFieldValue(
              'cpf',
            )}.`,
          );
          formRef.current?.setFieldValue('category', '');
          formRef.current?.setFieldValue('subscriptionNumber', '');
          return;
        }
      }
    } catch (err) {
      setIsSearching(false);

      if (err?.response?.data) {
        if (err.response.data.message === 'Jurisdicted is in debt') {
          setJurisdictedInDebt(true);
        }

        formRef.current?.setFieldValue(
          'name',
          err.response.data.message !== 'Jurisdicted is in debt'
            ? 'Ops, não pudemos encontrar nenhum registro.'
            : `Ops, ocorreu um erro ao buscar o(a) profissional com o CPF ${formRef.current?.getFieldValue(
                'cpf',
              )}.`,
        );
      }

      formRef.current?.setFieldValue('category', '');
      formRef.current?.setFieldValue('subscriptionNumber', '');
    }
  };

  const handleMultipleRecordPick = (pickedJurisdicted: JurisdictedData) => {
    setSelectedJurisdicted(pickedJurisdicted);

    formRef.current?.setFieldValue('name', pickedJurisdicted.nomeRazaoSocial);
    formRef.current?.setFieldValue('category', pickedJurisdicted.category);
    formRef.current?.setFieldValue(
      'subscriptionNumber',
      pickedJurisdicted.numeroRegistro,
    );
  };

  useEffect(() => {
    if (jurisdicted) {
      if (jurisdicted.length === 0) {
        return;
      }

      if (jurisdicted.length > 1) {
        setMultipleRecords(true);
        return;
      }

      formRef.current?.setFieldValue('name', jurisdicted[0]?.nomeRazaoSocial);
      formRef.current?.setFieldValue('category', jurisdicted[0]?.category);
      formRef.current?.setFieldValue(
        'subscriptionNumber',
        jurisdicted[0]?.numeroRegistro,
      );
    }
  }, [jurisdicted]);

  return (
    <Container>
      <ModalComponent isOpen={jurisdictedInDebt}>
        <ModalContainer>
          <header>
            <h3>ATENÇÃO!</h3>
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
              Já entrou no serviço online, não existem erros no cadastro e ainda
              não consegue inserir um anúncio?
              <br /> Favor entrar em contato através do endereço de e-mail{' '}
              <strong>suporte@cro-rj.org.br</strong>
            </p>
          </footer>
        </ModalContainer>
      </ModalComponent>

      <ModalComponent isOpen={multipleRecords}>
        <ModalContainer>
          <header>
            <h3>MÚLTIPLOS REGISTROS!</h3>
          </header>

          <main>
            Você possui múltiplos registros elegíveis para inserção de um
            anúncio. Favor selecione um registro:
          </main>

          <div>
            {jurisdicted &&
              jurisdicted.map(jur => (
                <MultipleRecordCard
                  key={jur.numeroRegistro}
                  onClick={() => handleMultipleRecordPick(jur)}
                  selected={
                    selectedJurisdicted.numeroRegistro === jur.numeroRegistro
                  }
                >
                  <strong>{jur.nomeRazaoSocial}</strong>
                  <p>
                    {jur.category} - {jur.numeroRegistro}
                  </p>
                </MultipleRecordCard>
              ))}
          </div>
        </ModalContainer>
      </ModalComponent>

      <Content>
        <h1>Novo anúncio</h1>

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
              label="Inscrição"
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
            label="Categoria do anúncio"
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
              label="Anúncio"
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
