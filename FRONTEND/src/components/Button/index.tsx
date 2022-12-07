import { ReactElement } from 'react';
import './style.css';

interface ButtonProps {
  mode?: 'filled' | 'stroked' | 'text' | 'icon';
  state?: 'default' | 'disabled';
  icon?: ReactElement;
  value: string | ReactElement;
  type?: 'button' | 'reset' | 'submit';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  mode = 'filled',
  state = 'default',
  type = 'button',
  icon,
  value,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`mode-${mode} state-${state} ${icon ? 'hasIcon' : ''}`}
    >
      {icon && icon}
      {value}
    </button>
  )
}