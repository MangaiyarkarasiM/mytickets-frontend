import './Modal.css'

const Modal = (props) => {
  if (!props.open) {
    return null;
  }
  return (
    <div className="profileModal d-flex justify-content-center align-items-center">
      <div className="dialog bg-white rounded w-75 my-1">
        {/* Modal Header */}
        <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
          <h4 className="ml-3">{props.title}</h4>
          <button type="button" className="close mr-3" onClick={props.onClose} >&times;</button>
        </div>
        
        {/* Modal Body */}
        <div className="p-2 scrollable">
          {
            props.children
          }
        </div>
        
        {/* Modal Footer */}
        {
          props.showFooter ? (
            <div className="p-2">
              <button onClick={props.onClose}>Close</button>
            </div>
          ) : null
        }
      </div>
    </div>
  );
};

export default Modal;
