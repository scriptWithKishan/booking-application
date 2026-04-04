import React, { useRef } from 'react'

const Modal = ({ heading, description, onClose, children }) => {
  const modalRef = useRef()

  const handleClose = (e) => {
    if (modalRef.current === e.target) {
      onClose()
    }
  }

  return (
    <div ref={modalRef} onClick={handleClose} className='fixed inset-0 bg-black/50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg min-w-100 flex flex-col '>
        <button onClick={() => onClose()} className='text-black text-xs self-end cursor-pointer bg-black/50 rounded-full w-6 h-6 flex items-center justify-center text-white'>X</button>
        <h2 className='text-2xl text-center font-bold mb-2'>{heading}</h2>
        <p className='text-gray-600 text-center mb-4'>{description}</p>
        {children}
      </div>
    </div>
  )
}

export default Modal