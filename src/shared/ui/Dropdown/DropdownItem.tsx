import './Dropdown.css';
import type {ReactNode} from "react";

interface DropdownItemProps {
  icon?: ReactNode;
  name: string;
  onClick?: () => void;
  className?: string;
}

export const DropdownItem = ({icon, name, onClick, className = ''}: DropdownItemProps) => (
  <li
    className={`dropdown-item ${className}`}
    onClick={onClick}
    role="option"
  >
    {icon && <div className="dropdown-item__icon">{icon}</div>}
    <div className="dropdown-item__content">
      <span className="dropdown-item__text">{name}</span>
    </div>
  </li>
);