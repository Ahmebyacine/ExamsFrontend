import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded shadow-lg z-10">
        <button onClick={onClose} className="absolute top-2 right-2 text-black">
          &times;
        </button>
        <div className='ax-h-[80vh] overflow-auto'>
        {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;