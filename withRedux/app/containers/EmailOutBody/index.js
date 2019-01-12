import React from 'react';
import { connect } from 'react-redux';
import { NativeTypes } from 'react-dnd-html5-backend';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withTheme } from '@callstack/react-theme-provider';
import DropZone from 'components/DropZone';
import { FormattedMessage } from 'react-intl';
import { updateNewEmailData } from '../Mailbox/actions';
import messages from '../ReplySection/messages';
// import { MyEditor } from '../App';
import MyEditor from '../MyEditor/Loadable';

const fileTarget = {
  drop(props, monitor) {
    const files = monitor.getItem().files;
    const filesWithInfo = Array.from(files).map(file => ({
      name: file.name,
      size: file.size,
      file: file,
    }));
    props.updateNewEmailData({ attachments: filesWithInfo });
  },
};

class EmailOutBody extends React.Component {
  render() {
    const { connectDropTarget, isOver, theme } = this.props;
    const StyledDiv = styled.div`
      position: relative;
      box-flex: 8;
      flex-grow: 8;
      display: flex;
      margin: 0px;
      margin-bottom: 0px;
      height: 100% !important;
      flex-grow: 8;
      color: ${theme.primaryTextColor};
      & > div {
        display: flex;
      }
      > div > div > .DraftEditor-root {
        height: calc(100% - 50px) !important;
        overflow: auto;
      }
      @media (max-width: 768px) {
        margin-bottom: 0px;
        & > div {
          align-items: stretch;
        }
        & > div > div > .DraftEditor-root {
          height: calc(100% - 86px);
          max-height: calc(80vh - 86px);
        }
        & > div > div > .editor-toolbar {
          box-flex: 1;
          flex-grow: 1;
        }
      }
    `;
    return connectDropTarget(
      <div className="email-body">
        {isOver && (
          <DropZone theme={theme}>
            <FormattedMessage {...messages.dropTarget} />
          </DropZone>
        )}
        <MyEditor emailType="NewEmail" />
      </div>,
    );
  }
}

EmailOutBody.propTypes = {
  updateNewEmailData: PropTypes.func,
  isOver: PropTypes.bool,
  canDrop: PropTypes.bool,
  theme: PropTypes.object,
  connectDropTarget: PropTypes.func,
};

const mapDispatchToProps = {
  updateNewEmailData,
};

const EmailOutBodyDnD = DropTarget(
  NativeTypes.FILE,
  fileTarget,
  (connect1, monitor) => ({
    connectDropTarget: connect1.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(EmailOutBody);

export default connect(
  null,
  mapDispatchToProps,
)(withTheme(EmailOutBodyDnD));
