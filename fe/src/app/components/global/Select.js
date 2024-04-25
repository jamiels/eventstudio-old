import ReactSelect from 'react-select';
import clsx from 'clsx';

const Select = ({
  defaultValue = null,
  onChange,
  label,
  layout = 'vertical',
  error,
  ...props
}) => {
  return (
    <div>
      <div
        className={clsx(
          'd-flex',
          layout === 'vertical' ? 'flex-column' : 'flex-row align-items-center',
        )}
      >
        {label && (
          <label className={clsx('fs-6 fw-semibold', layout === 'vertical' ? 'mb-2' : 'me-2')}>
            {label}
          </label>
        )}
        <ReactSelect
          defaultValue={defaultValue}
          isMulti={false}
          onChange={(option) => onChange(option)}
          {...props}
          classNames={{
            control: () =>
              'select2-selection select2-selection--single form-select form-select-solid',
            indicatorSeparator: () => 'd-none',
            indicatorsContainer: (props) => 'd-none',
          }}
        />
      </div>
      {error && (
        <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
};

export default Select;