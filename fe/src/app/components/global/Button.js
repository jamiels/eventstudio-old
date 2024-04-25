import clsx from 'clsx';

const Button = ({ isLoading, children, variant, className, ...props }) => {
  return (
    <button
      id="kt_sign_in_submit"
      className={clsx(
        'btn',
        variant === 'white' && 'btn-white',
        variant === 'primary' && 'btn-primary',
        variant === 'light' && 'btn-light',
        variant === 'secondary' && 'btn-secondary',
        variant === 'success' && 'btn-success',
        variant === 'info' && 'btn-info',
        variant === 'warning' && 'btn-warning',
        variant === 'danger' && 'btn-danger',
        variant === 'dark' && 'btn-dark',
        className
      )}
      {...props}
    >
      {!isLoading && <span className="indicator-label d-flex">{children}</span>}
      {isLoading && (
        <span className="indicator-progress" style={{ display: 'block' }}>
          Please wait...
          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
        </span>
      )}
    </button>
  );
};

export default Button;