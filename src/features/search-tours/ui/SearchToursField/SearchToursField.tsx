import {useState} from 'react';
import {Input} from '@/shared/ui/Input';
import {Dropdown} from '@/shared/ui/Dropdown';
import {SearchTourResults} from './SearchTourResults.tsx';
import {useGeoSearch} from "@/features/search-tours";

export const SearchToursField = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    query,
    options,
    isLoading,
    handleFocus,
    handleChange,
    handleClear,
  } = useGeoSearch();

  return (
    <div className="search-form__field">
      <Input
        ref={setAnchorEl}
        value={query}
        onFocus={async () => {
          await handleFocus();
          setIsOpen(true);
        }}
        onChange={(e) => {
          handleChange(e.target.value);
          if (!isOpen) setIsOpen(true);
        }}
        onClear={() => {
          handleClear();
          setIsOpen(true);
        }}
        placeholder="Країна, місто або готель"
        autoComplete="off"
      />

      <Dropdown
        isOpen={isOpen && (options.length > 0 || isLoading || query.length > 0)}
        anchorEl={anchorEl}
        onClose={() => setIsOpen(false)}
      >
        <SearchTourResults onSelect={() => setIsOpen(false)}/>
      </Dropdown>
    </div>
  );
};