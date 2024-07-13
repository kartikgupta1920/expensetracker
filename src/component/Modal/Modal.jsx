import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Modal = ({ isOpen, children, setIsOpen }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
