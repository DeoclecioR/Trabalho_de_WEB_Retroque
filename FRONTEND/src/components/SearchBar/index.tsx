import { Dispatch, SetStateAction } from 'react';

import { MagnifyingGlass } from 'phosphor-react';

import './style.css';

interface SearchBarProps {
  label: string;
  name: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  label,
  name,
  value,
  setValue,
}) => {

  return (
    <div id='searchBar'>
      <input
        id={name}
        name={name}
        placeholder={label}
        type="text"
        value={value}
        onChange={(e) => setValue ? setValue(e.target.value) : null}
        autoComplete="off"
      />
      <button>
        <MagnifyingGlass />
      </button>
    </div>
  )
}

