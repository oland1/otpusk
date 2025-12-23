import './GeoOptionItem.css';
import type {GeoOption} from "../../model/types";

const ICONS = {
  country: '🌍',
  city: '🏙️',
  hotel: '🏨'
};

type Props = {
  option: GeoOption;
  onClick: () => void;
}

export const GeoOptionItem = (props: Props) => {
  const {option, onClick} = props;
  
  return (
    <li className="geo-option" onClick={onClick}>
      <div className="geo-option__icon">
        {option.flag ? (
          <img src={option.flag} alt="" width="20"/>
        ) : (
          ICONS[option.type as keyof typeof ICONS]
        )}
      </div>
      <div className="geo-option__info">
        <span className="geo-option__name">{option.name}</span>
      </div>
    </li>
  )
}