import { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';

import {
  Container,
  Content,
  FormFirstLine,
  FormSecondLine,
  FormForthLine,
  ActionsContainer,
} from './styles';

export function NewAd() {
  const formRef = useRef<FormHandles>(null);

  return (
    <Container>
      <Content>
        <h1>Novo anúncio</h1>

        <Form
          ref={formRef}
          onSubmit={() => {
            console.log('on submit');
          }}
        >
          <FormFirstLine>
            <Input
              type="number"
              name="cpf"
              label="CPF"
              placeholder="Insira seu cpf"
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
            <Input type="number" name="phone_number" label="Telefone com DDD" />

            <Input
              type="number"
              name="cellphone_number"
              label="Celular com DDD"
            />

            <Input type="text" name="email" label="E-mail" />
          </FormSecondLine>

          <Input type="text" name="category" label="Categoria do anúncio" />

          <FormForthLine>
            <Input type="text" name="city" label="Cidade" />

            <Input type="text" name="state" label="Estado" />
          </FormForthLine>

          <TextArea name="description" label="Anúncio" />
        </Form>
      </Content>

      <ActionsContainer>
        <button type="submit">CADASTRAR</button>

        <button type="button">LIMPAR</button>
      </ActionsContainer>
    </Container>
  );
}
