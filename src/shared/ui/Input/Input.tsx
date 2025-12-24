import {forwardRef, type InputHTMLAttributes, type ReactNode, useId,} from 'react';
import {clsx} from 'clsx';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  addonLeft?: ReactNode;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const id = useId();
  const {label, error, addonLeft, onClear, className, value, ...otherProps} = props;

  const fieldClasses = clsx('ui-input__field', {
    'ui-input__field--error': error,
    'ui-input__field--with-addon': addonLeft,
    'ui-input__field--with-clear': onClear && value,
  });

  return (
    <div className={clsx('ui-input', className)}>
      {label && <label htmlFor={id} className="ui-input__label">{label}</label>}

      <div className="ui-input__wrapper">
        {addonLeft && <div className="ui-input__addon">{addonLeft}</div>}

        <input
          ref={ref}
          id={id}
          value={value}
          className={fieldClasses}
          {...otherProps}
        />

        {onClear && value && (
          <button
            type="button"
            className="ui-input__clear-button"
            onClick={onClear}
            tabIndex={-1}
          >
            ✕
          </button>
        )}
      </div>
      {error && <span className="ui-input__error-text">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';