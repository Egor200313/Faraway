import '../css/Modal.css';

export function Modal(props) {
  const { isOpen, handleClose, children } = props;
  const handleOverlayClick = () => {
    console.log('clicked side');
    handleClose();
  };

  const handleModalClick = (event) => {
    console.log('clicked inside');
    event.stopPropagation();
    event.preventDefault();
  };

  if (!isOpen) return null;
  return (
    <div className="modal-container" onClick={handleOverlayClick}>
      <div className="modal-window" onClick={handleModalClick}>
        {children}
      </div>
    </div>
  );
}
