import ReactDom from 'react-dom'

const Modal = ({children, handleCloseModal}) => {
  
  return ReactDom.createPortal(
    <div>
      <button  className="modal-overlay"  onClick={handleCloseModal}></button>
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.getElementById('portal')
  )
}

export default Modal