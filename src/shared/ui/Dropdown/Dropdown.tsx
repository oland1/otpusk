import {type ReactNode, useEffect} from 'react';
import {createPortal} from 'react-dom';
import {autoUpdate, flip, offset, shift, size, useFloating} from '@floating-ui/react-dom';
import './Dropdown.css';

interface DropdownProps {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

export const Dropdown = ({isOpen, anchorEl, children, onClose, className = ''}: DropdownProps) => {
  const {
    x,
    y,
    strategy,
    refs: {setFloating, floating}
  } = useFloating({
    open: isOpen,
    elements: {
      reference: anchorEl,
    },
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip(),
      shift(),
      size({
        apply({rects, elements}) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: '300px',
            overflowY: 'auto',
          });
        },
      }),
    ],
  });

  // Це як приклад - загалом краще мати один глобальний обробник кліків поза компонентом
  useEffect(() => {
    if (!isOpen || !anchorEl) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedOutsideDropdown = floating.current && !floating.current.contains(target);
      const clickedOutsideAnchor = anchorEl && !anchorEl.contains(target);

      if (clickedOutsideDropdown && clickedOutsideAnchor) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, anchorEl, onClose, floating]);
  ///

  if (!isOpen || !anchorEl) return null;

  return createPortal(
    <div
      ref={setFloating}
      className={`ui-dropdown ${className}`}
      style={{
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
        zIndex: 9999,
      }}
    >
      <ul className="ui-dropdown__content" role="listbox">
        {children}
      </ul>
    </div>,
    document.body
  );
};