import React from "react";
import "./index.scss";

export default class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.wrapperRef = null;
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleClickOutside = (evt) => {
    const { onClose, open } = this.props;
    if (
      open &&
      this.wrapperRef &&
      !this.wrapperRef.contains(evt.target) &&
      this.wrapperRef.parentElement &&
      this.wrapperRef.parentElement.contains(evt.target)
    ) {
      onClose();
    }
  };

  render() {
    const { id, open, children, title, actions } = this.props;

    if (!open) {
      return null;
    }

    return (
      <div className="modal-container">
        <div className="backdrop"></div>
        <div
          id={id}
          className="modal-content"
          role="dialog"
          aria-modal="true"
          onClick={this.handleClickOutside}
        >
          <div ref={this.setWrapperRef} className="modal">
            <div className="modal-title">{title}</div>
            <div className="modal-children">{children}</div>
            <div className="modal-actions">{actions}</div>
          </div>
        </div>
      </div>
    );
  }
}
