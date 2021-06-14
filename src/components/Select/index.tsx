import React, { useRef, useEffect, useState, useCallback } from 'react';
import { OptionTypeBase, Props as SelectProps } from 'react-select';
import { useField } from '@unform/core';

import { Container, StyledSelect } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  label?: string;
  placeholderText: string;
}
export default function Select({
  name,
  label,
  placeholderText,
  ...rest
}: Props) {
  const selectRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // setIsFilled(!!selectRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <StyledSelect
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        placeholder={placeholderText}
        {...rest}
      />

      {error && <span>{error}</span>}
    </Container>
  );
}
