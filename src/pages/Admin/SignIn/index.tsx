import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiMail, FiLock } from 'react-icons/fi';

import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';

import logo from '../../../assets/logo.svg';
import logoRed from '../../../assets/logo-red.svg';

import { Input } from '../../../components/Input';

import { Container, LogoContent, AnimationContainer, Content } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

export function SignIn() {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email.toLowerCase(),
          password: data.password,
        });

        history.push('/user/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'info',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao fazer o login, cheque as credenciais.',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <LogoContent>
        <img src={logo} alt="CRO-RJ" />

        <h1>
          Seja bem vindo ao <br /> sistema de classificados do CRO-RJ
        </h1>
      </LogoContent>

      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <img src={logoRed} alt="CRO-RJ" />

            <h1>Faça seu login</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <button type="submit">Entrar</button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
}
