import styles from './Button.module.css';

const Button = ({
                  type = 'button',
                  variant = 'primary',
                  size = 'large',
                  onClick,
                  children,
                }) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;