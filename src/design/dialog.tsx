import * as React from 'react';
import { isNil } from 'lodash';

export class Dialog extends React.Component<Props> {
  modal: HTMLDivElement;
  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false);
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleKeyUp(e) {
    const { onCloseRequest } = this.props;
    const keys = {
      27: () => {
        e.preventDefault();
        onCloseRequest();
        window.removeEventListener('keyup', this.handleKeyUp, false);
      },
    };

    if (keys[e.keyCode]) { keys[e.keyCode](); }
  }

  handleOutsideClick(e) {
    const { onCloseRequest } = this.props;

    if (!isNil(this.modal)) {
      if (!this.modal.contains(e.target)) {
        onCloseRequest();
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    }
  }

  render() {
    const {
      onCloseRequest,
      children,
    } = this.props;

    return (
      <div className={'modalOverlay'}>
        <div
          className={'modal'}
          ref={node => (this.modal = node)}
        >
          <div className={'modalContent'}>
            {children}
          </div>
        </div>

        <button
          type="button"
          className={'closeButton'}
          onClick={onCloseRequest}
        />
      </div>
    );
  }
}

interface Props {
  onCloseRequest: () => void;
}


