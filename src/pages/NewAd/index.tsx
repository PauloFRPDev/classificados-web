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

  const [phoneInputValue, setPhoneInputValue] = useState('');
  const [adId, setAdId] = useState('');
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [cities, setCities] = useState<CityProps[]>([]);
  const [districts, setDistricts] = useState<DistrictProps[]>([]);
  const [jurisdicted, setJurisdicted] = useState<JurisdictedData>();
  const [isSearching, setIsSearching] = useState(false);
  const [jurisdictedInDebt, setJurisdictedInDebt] = useState(false);

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

  const handleInsertAd = async (data: AdFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        cpf: Yup.string().required('CPF obrigatório'),
        category: Yup.string().required('Categoria obrigatória'),
        subscriptionNumber: Yup.string().required(
          'Número de inscrição obrigatório',
        ),
        phone_number: Yup.string().required('Telefone obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        description: Yup.string().required('Anúncio obrigatório'),
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
            'Por favor, aguarde até o final do carregamento dos campos de Categoria, Inscrição e Nome.',
        });
        return;
      }

      const response = await api.post('/ads', formData);

      const { id } = response.data;

      setAdId(id);

      addToast({
        type: 'success',
        title: 'Anúncio criado',
        description: 'Seu anúncio foi criado com sucesso.',
      });

      formRef.current?.reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }

      addToast({
        type: 'error',
        title: 'Erro na criação do anúncio',
        description:
          'Houve um erro ao tentar inserir um anúncio, por favor tente novamente.',
      });
    }
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneInputValue(event.target.value);
  };

  const handleSearchJurisdicted = async (cpf: string) => {
    try {
      if (!cpf.includes('_') && cpf !== '') {
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
          ? 'Ops, não pudemos encontrar nenhum registro.'
          : `Ops, o(a) profissional com o CPF ${formRef.current?.getFieldValue(
              'cpf',
            )} possui débitos no CRO-RJ.`,
      );
      formRef.current?.setFieldValue('category', '');
      formRef.current?.setFieldValue('subscriptionNumber', '');
    }
  };

  const handleCleanFields = () => {
    formRef.current?.reset();
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
      <ModalComponent isOpen={jurisdictedInDebt} />

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
              mask={
                phoneInputValue.length === 14
                  ? '(99) 9999-9999'
                  : '(99) 99999-9999'
              }
              onChange={handlePhoneChange}
              type="text"
              name="phone_number"
              label="Telefone com DDD"
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

          <TextArea name="description" label="Anúncio" />

          <Dropzone adId={adId} setAdId={setAdId} />

          <ActionsContainer>
            <button type="submit">CADASTRAR</button>

            <button type="button" onClick={handleCleanFields}>
              LIMPAR
            </button>
          </ActionsContainer>
        </Form>
      </Content>
    </Container>
  );
}
