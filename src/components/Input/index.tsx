import { useEffect, useRef, useState, useCallback } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import PulseLoader from 'react-spinners/PulseLoader';

import { Container, Error } from './styles';

interface Props {
  name: string;
  label?: string;
  isSearching?: boolean;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

export function Input({
  name,
  label,
  isSearching,
  disabled,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        // eslint-disable-next-line no-param-reassign
        ref.current.value = value;
      },
      clearValue: ref => {
        // eslint-disable-next-line no-param-reassign
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container
      isFilled={isFilled}
      isFocused={isFocused}
      isSearching={isSearching}
      isDisabled={disabled}
    >
      {label && <label htmlFor={fieldName}>{label}</label>}

      <div>
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          id={fieldName}
          ref={inputRef}
          disabled={disabled}
          defaultValue={defaultValue}
          {...rest}
        />

        {error && !isSearching && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </div>

      {isSearching && <PulseLoader size={10} speedMultiplier={0.5} />}
    </Container>
  );
}
