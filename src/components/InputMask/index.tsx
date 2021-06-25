import { useEffect, useRef, useState, useCallback } from 'react';
import { useField } from '@unform/core';
import ReactInputMask, { Props as InputMaskProps } from 'react-input-mask';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface Props extends InputMaskProps {
  name: string;
  label?: string;
}

export function InputMask({ name, label, ...rest }: Props) {
  const inputRef = useRef<ReactInputMask>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.props.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue: (ref, value) => {
        // eslint-disable-next-line no-param-reassign
        ref.setInputValue(value);
      },
      clearValue: ref => {
        // eslint-disable-next-line no-param-reassign
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <div>
        <ReactInputMask
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />

        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </div>
    </Container>
  );
}
