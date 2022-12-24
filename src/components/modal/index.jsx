export const Modal = (props) => {
  const { visible, title, onClose, onOk } = props;
  const onHandleSubmit = (e) => {
    e.preventDefault();
    const data = {};
    for (let i = 0; i < e.target.elements.length; i++) {
      const { name, value } = e.target.elements[i];
      if (name !== "") data[name] = value;
    }
    if (typeof onOk === "function") {
      props.onOk(data);
    }
  };
  return (
    <div
      className="modal"
      style={{ display: visible === true ? "block" : "none" }}
      tabindex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={onHandleSubmit}>
            <div className="modal-body">{props.children}</div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
