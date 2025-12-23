import React, {useState} from 'react';
import {Input} from '@/shared/ui/Input';
import {Dropdown} from '@/shared/ui/Dropdown';
import {Button} from '@/shared/ui/Button';
import {GeoOptionItem} from '@/entities/geo/ui';
import {useGeoSearch} from '../../model/useGeoSearch';
import './SearchToursForm.css';
import type {GeoOption} from "@/entities/geo/model/types.ts";

export const SearchToursForm = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    query,
    options,
    // selectedItem,
    isLoading,
    handleFocus,
    handleChange,
    handleClear,
    handleSelect,
  } = useGeoSearch();
  
  const handleOptionSelect = (option: GeoOption) => {
    handleSelect(option);
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Тут буде логіка пошуку турів з урахуванням selectedItem
    alert(`Пошук`);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2 className="search-form__title">Пошук турів</h2>

      <div className="search-form__field">
        <Input
          ref={setAnchorEl}
          value={query}
          onFocus={async () => {
            await handleFocus();
            setIsOpen(true);
          }}
          onChange={(e) => handleChange(e.target.value)}
          onClear={handleClear}
          placeholder="Країна, місто або готель"
          autoComplete="off"
        />

        <Dropdown
          isOpen={isOpen}
          anchorEl={anchorEl}
          onClose={() => setIsOpen(false)}
        >
          {isLoading && <li className="geo-option__loading">Завантаження…</li>}

          {!isLoading && options.length === 0 && (
            <li className="geo-option__empty">Нічого не знайдено</li>
          )}

          {!isLoading && options.map((option) => (
            <GeoOptionItem
              key={`${option.type}-${option.id}`}
              option={option}
              onClick={() => handleOptionSelect(option)}
            />
          ))}
        </Dropdown>
      </div>

      <Button
        label="Знайти"
        type="submit"
        size="lg"
        variant="primary"
        className="search-form__submit"
      />
    </form>
  );
};