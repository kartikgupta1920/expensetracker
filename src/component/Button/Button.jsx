import React from 'react';
import styles from './Button.module.css';

const Button = ({ type = 'button', onClick, children, variant = 'primary', shadow = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${shadow ? styles.shadow : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
