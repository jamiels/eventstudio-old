import React from 'react';
import { Modal as BTModal } from 'react-bootstrap';

const ModalBody = ({ children }) => {
  return <BTModal.Body className="modal-body scroll-y mx-5 mx-xl-15 my-7">{children}</BTModal.Body>;
};

const ModalFooter = ({ children }) => {
  return <BTModal.Footer className="modal-footer flex-end">{children}</BTModal.Footer>;
};

const Modal = ({ show, children, title, onHide }) => {
  return (
    <BTModal show={show} dialogClassName="modal-dialog-centered mw-650px" onHide={onHide} backdrop='static'>
      <BTModal.Header closeButton>{title && <h2 className="fw-bold">{title}</h2>}</BTModal.Header>
      {children}
    </BTModal>
  );
};

export { ModalBody, ModalFooter, Modal };