import { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { Eye, EyeSlash, WarningOctagon } from 'phosphor-react';

import './style.css';

interface TextFieldProps {
  icon?: React.ReactElement;
  label: string;
  name: string;
  type?: 'text' | 'password';
  variants?: any;
  error?: FieldError;
  forceError?: boolean;
  register?: UseFormRegisterReturn;
  defaultValue?: string;
  disabled?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  icon,
  label,
  name,
  type = 'text',
  variants,
  register,
  error,
  defaultValue,
  forceError = false,
  disabled = false,
}) => {
  const hasError = error?.message ? true : false;
  const [controlType, setControlType] = useState(type);
  const changeVisible = () => {
    setControlType(controlType === 'password' ? 'text' : 'password');
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <div id='textField'>

        {icon && <div id='startIconSlot' className={hasError || forceError ? 'hasError' : ''}>{icon}</div>}

        <input
          id={name}
          name={name}
          className={`
            ${icon ? 'hasIcon' : ''}
            ${hasError || forceError ? 'hasError' : ''}
            ${type === 'password' ? 'isPassword' : ''}
          `}
          type={controlType}
          defaultValue={defaultValue}
          autoComplete="off"
          required
          {...register}
        />

        <label
          className={`
            ${hasError || forceError ? 'hasError' : ''}
            ${icon ? 'hasIcon' : ''}
          `}
          htmlFor={name}>
          <span>{label}</span>
        </label>

        {type === 'password' && (
          <button id='endIconSlot' type="button" onClick={changeVisible}>
            {controlType === 'password' ? <Eye /> : <EyeSlash />}
          </button>
        )}

      </div>
      {hasError && (
        <div id='errorSlot'>
          <WarningOctagon />
          <legend>{error?.message}</legend>
        </div>
      )}
    </div>
  );
};