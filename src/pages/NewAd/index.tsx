import { ChangeEvent, useRef, useState, useCallback, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import { InputMask } from '../../components/InputMask';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import {
  Container,
  Content,
  FormFirstLine,
  FormSecondLine,
  FormForthLine,
  ActionsContainer,
} from './styles';
import Select from '../../components/Select';

interface AdFormData {
  cpf: number;
  phone_number: number;
  email: string;
  category_id: number;
  city_id: number;
  district_id: number;
  description: string;
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
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [cities, setCities] = useState<CityProps[]>([]);
  const [districts, setDistricts] = useState<DistrictProps[]>([]);

  const { addToast } = useToast();

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const response = await api.get('categories');

      setCategories(response.data);
    }

    loadCategories();
  }, []);

  const handleSearchCities = useCallback(async (citySearched: string) => {
    const response = await api.get('/cities', {
      params: {
        title: citySearched,
      },
    });

    setCities(response.data);
  }, []);

  const handleSearchDistricts = useCallback(async (districtSearch: string) => {
    const response = await api.get('/districts', {
      params: {
        title: districtSearch,
      },
    });

    setDistricts(response.data);
  }, []);

  const handleInsertAd = useCallback(
    async (data: AdFormData, { reset }) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cpf: Yup.string().required('CPF obrigatório'),
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
        };

        await api.post('/ads', formData);

        addToast({
          type: 'success',
          title: 'Anúncio criado',
          description: 'Seu anúncio foi criado com sucesso.',
        });

        reset();
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
    },
    [addToast],
  );

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneInputValue(event.target.value);
  };

  return (
    <Container>
      <Content>
        <h1>Novo anúncio</h1>

        <Form ref={formRef} onSubmit={handleInsertAd}>
          <FormFirstLine>
            <InputMask
              type="text"
              name="cpf"
              label="CPF"
              placeholder="Insira seu cpf"
              mask="999.999.999-99"
            />

            <Input type="text" name="category" disabled label="Categoria" />

            <Input
              type="text"
              name="subscriptionNumber"
              disabled
              label="Inscrição"
            />

            <Input type="text" name="name" disabled label="Nome" />
          </FormFirstLine>

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
              placeholder="Insira seu telefone para contato"
            />

            <Input
              type="text"
              name="email"
              label="E-mail"
              placeholder="Insira seu e-mail"
            />
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

          <TextArea
            name="description"
            label="Anúncio"
            placeholder="Digite seu anúncio"
          />

          <ActionsContainer>
            <button type="submit">CADASTRAR</button>

            <button type="button">LIMPAR</button>
          </ActionsContainer>
        </Form>
      </Content>
    </Container>
  );
}
