import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { FormattedMessage } from 'react-intl';
import { NativeTypes } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';
import EmailOutTitle from 'containers/EmailOutTitle';
import SendToInput from 'containers/SendToInput';
import AttachedDocs from 'containers/AttachedDocs';
import MyEditor from '../MyEditor/Loadable';
// import { MyEditor } from '../App';
import messages from './messages';
import { updateReplyEmailData } from '../Mailbox/actions';
import ReplySectionHeader from './Header';
import Wrapper from './Wrapper';
import DropZone from 'components/DropZone';
import EmailOutFooter from '../EmailOutFooter';

const fileTarget = {
  drop(props, monitor) {
    const files = monitor.getItem().files;
    const filesWithInfo = Array.from(files).map(file => ({
      name: file.name,
      size: file.size,
      file: file,
    }));
    props.updateReplyEmailData({ attachments: filesWithInfo });
  },
};

const StyledInput = styled(SendToInput)`
  padding: 20px !important;
  margin: 8px 4px;
`;

class ReplySection extends React.PureComponent {
  render() {
    const { connectDropTarget, isOver, theme } = this.props;
    return (
      <Wrapper theme={theme}>
        <EmailOutTitle emailType="reply" />
        <ReplySectionHeader />
        {connectDropTarget(
          <div style={{ position: 'relative' }}>
            {isOver && (
              <DropZone theme={theme}>
                <FormattedMessage {...messages.dropTarget} />
              </DropZone>
            )}
            <MyEditor emailType="reply" />
            <AttachedDocs emailType="reply" />
          </div>,
        )}
        <EmailOutFooter emailType="reply" />
      </Wrapper>
    );
  }
}

ReplySection.propTypes = {
  updateReplyEmailData: PropTypes.func,
  isOver: PropTypes.bool,
  canDrop: PropTypes.bool,
  theme: PropTypes.object,
  connectDropTarget: PropTypes.func,
};

const mapDispatchToProps = {
  updateReplyEmailData,
};

const ReplySectionDnD = DropTarget(
  NativeTypes.FILE,
  fileTarget,
  (connect1, monitor) => ({
    connectDropTarget: connect1.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(withTheme(ReplySection));

export default connect(
  null,
  mapDispatchToProps,
)(withTheme(ReplySectionDnD));
