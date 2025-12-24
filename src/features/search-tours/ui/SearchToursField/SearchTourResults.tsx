import {DropdownItem} from '@/shared/ui';
import {useGeoSearch} from "@/features/search-tours";

const ICONS = {country: '🌍', city: '🏙️', hotel: '🏨'};

type Props = {
  onSelect?: () => void;
}
export const SearchTourResults = (props: Props) => {
  const {options, handleSelect} = useGeoSearch();

  if (options.length === 0) return <DropdownItem className="dropdown-item--status" name="Нічого не знайдено"/>;

  return options.map((option) => (
    <DropdownItem
      key={`${option.type}-${option.id}`}
      icon={option.flag ? <img src={option.flag} alt="" width="20"/> : ICONS[option.type as keyof typeof ICONS]}
      name={option.name}
      onClick={() => {
        handleSelect(option);
        if (props?.onSelect) props.onSelect();
      }}
    />
  ))
};