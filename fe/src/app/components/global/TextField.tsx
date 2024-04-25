import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

export interface TextFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  error?: string;
  label?: string;
  name?: string;
  required?: boolean;
}

const TextField = ({ error, className, label, name, required, ...props }: TextFieldProps) => {
  return (
    <div className="fv-row mb-7 fv-plugins-icon-container">
      {label && (
        <label className={clsx('fs-6 fw-semibold mb-2', required && 'required')}>{label}</label>
      )}
      <input className="form-control form-control-solid" {...props} />
      {error && (
        <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
};

export default TextField;