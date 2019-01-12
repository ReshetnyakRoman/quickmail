import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withTheme } from '@callstack/react-theme-provider';
import React from 'react';
import Editor from 'draft-js-plugins-editor';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import { stateToHTML } from 'draft-js-export-html';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-anchor-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';
import 'draft-js-alignment-plugin/lib/plugin.css';

import {
  makeSelectOpenEmailData,
  makeSelectReplyEmailStatus,
  makeSelectNewEmailObj,
  makeSelectReplyEmailObj,
} from '../Mailbox/selectors';
import { updateReplyEmailData, updateNewEmailData } from '../Mailbox/actions';

const blockDndPlugin = createBlockDndPlugin();
const focusPlugin = createFocusPlugin();
const alignmentPlugin = createAlignmentPlugin();
const resizeablePlugin = createResizeablePlugin();
const { AlignmentTool } = alignmentPlugin;
const linkPlugin = createLinkPlugin({ placeholder: 'http://…' });
const hashtagPlugin = createHashtagPlugin();
const emojiPlugin = createEmojiPlugin({ useNativeArt: true });
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

const plugins = [
  hashtagPlugin,
  emojiPlugin,
  toolbarPlugin,
  linkPlugin,
  alignmentPlugin,
  focusPlugin,
  resizeablePlugin,
  blockDndPlugin,
];

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: this.createInitialState(),
    };
    this.createInitialState = this.createInitialState.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  createInitialState() {
    const {
      emailInfo,
      replyEmailStatus,
      replyEmailObj,
      newEmailObj,
      emailType,
    } = this.props;

    const emailObj = emailType === 'reply' ? replyEmailObj : newEmailObj;
    let editorState = EditorState.createEmpty();
    let title = '';
    let initialSatate;
    if (emailType === 'reply') {
      title = `</br><p><i>----- Forward ----- 
            <br />From: ${emailInfo.from.email} &nbsp;&nbsp;To: ${
        emailInfo.to[0].email
      } &nbsp;&nbsp;Received: ${emailInfo.receivingDate.toLocaleString(
        'ru-RU',
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        },
      )}</i></br></p>`;

      if (replyEmailStatus === 'reply' || replyEmailStatus === 'replyAll') {
        title = `</br><p><i>----- Reply ----- 
          <br />From: ${emailInfo.from.email} &nbsp;&nbsp;To: ${
          emailInfo.to[0].email
        } &nbsp;&nbsp;Received: ${emailInfo.receivingDate.toLocaleString(
          'ru-RU',
          { year: 'numeric', month: 'short', day: 'numeric' },
        )}</i></br></p>`;
      }

      initialSatate = emailObj.body ? emailObj.body : title + emailInfo.body;
    } else {
      initialSatate = emailObj.body;
    }

    if (initialSatate) {
      try {
        const processedHTML = convertFromHTML(initialSatate);
        const contentState = ContentState.createFromBlockArray(processedHTML);

        editorState = EditorState.createWithContent(contentState);
      } catch (err) {
        return editorState;
      }
    }

    return editorState;
  }

  onChange(editorState) {
    if (
      editorState.getCurrentContent() !==
      this.state.editorState.getCurrentContent()
    ) {
      this.props.updateEmailData(stateToHTML(editorState.getCurrentContent()));
      this.setState({
        editorState,
      });
    }
  }

  focus = () => {
    this.editor.focus();
  };

  shouldComponentUpdate(nextProps) {
    const { emailType, replyEmailObj, newEmailObj } = this.props;
    const curretnEmailObj = emailType === 'reply' ? replyEmailObj : newEmailObj;
    const nextReplyEmailObj = nextProps.replyEmailObj;
    const nextNewEmailObj = nextProps.newEmailObj;
    const nextEmailObj =
      emailType === 'reply' ? nextReplyEmailObj : nextNewEmailObj;

    if (curretnEmailObj.body === nextEmailObj.body) return false;
    return true;
  }

  componentDidMount() {
    const focus = this.props.replyEmailStatus !== 'forward';

    this.props.updateEmailData(
      stateToHTML(this.state.editorState.getCurrentContent()),
    );
    if (focus) {
      this.editor.focus();
    }
  }
  componentDidUpdate() {
    const focus = this.props.replyEmailStatus !== 'forward';
    if (focus) {
      this.editor.focus();
    }
  }

  render() {
    const { theme } = this.props;
    const Wrapper = styled.div`
      margin-left: 16px;
      margin-right: 16px;
      margin-top: 16px;
      margin-bottom: 16px;
      & ul {
        margin-left: 24px;
      }
      @media (max-width: 768px) {
        margin-left: 8px;
        margin-right: 8px;
        margin-top: 6px;
        margin-bottom: 6px;
      }
    `;
    const StyledDiv = styled.div`
      margin-top: 8px;
      & > div {
        background-color: ${theme.backgroundColorLight} !important;
        border: 1px solid ${theme.sideBarBorderColor};
        box-shadow: 0px 0px 0px ${theme.shadow2} !important;
      }
      & div button {
        padding: 0 !important;
        cursor: pointer;
        :hover,
        :hover svg {
          background-color: ${theme.badegBG} !important;
        }

        color: ${theme.secondryTextColor} !important;
        background-color: ${theme.backgroundColorLight} !important;
      }
      & div button svg {
        fill: ${theme.secondryTextColor} !important;
        cursor: pointer;
        background-color: ${theme.backgroundColorLight} !important;
      }
      & [class*='EmojiPlugin'] {
        background-color: ${theme.backgroundColorLight} !important;
        box-shadow: 0px 0px 0px ${theme.shadow2} !important;
      }
      & div[class*='emojiSelectPopoverScrollbar'] {
        background-color: ${theme.secondryTextColor} !important;
      }
      & div[class*='emojiSelectPopoverScrollbarThumb'] {
        background-color: ${theme.sideBarBorderColor} !important;
        box-shadow: 0px 0px 0px ${theme.shadow2} !important;
      }
      @media (max-width: 768px) {
        box-flex: 1;
        flex-grow: 1;
      }
    `;
    return (
      <Wrapper>
        <div onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={element => {
              this.editor = element;
            }}
          />
          <StyledDiv>
            <Toolbar>
              {externalProps => (
                <React.Fragment>
                  <EmojiSelect />
                  <BoldButton {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <Separator {...externalProps} />
                  <HeadlineOneButton {...externalProps} />
                  <HeadlineTwoButton {...externalProps} />
                  <HeadlineThreeButton {...externalProps} />
                  <Separator {...externalProps} />
                  <UnorderedListButton {...externalProps} />
                  <OrderedListButton {...externalProps} />
                  <BlockquoteButton {...externalProps} />
                  <CodeBlockButton {...externalProps} />
                </React.Fragment>
              )}
            </Toolbar>
            <EmojiSuggestions />
          </StyledDiv>

          <AlignmentTool />
        </div>
      </Wrapper>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  emailInfo: makeSelectOpenEmailData(),
  replyEmailObj: makeSelectReplyEmailObj(),
  newEmailObj: makeSelectNewEmailObj(),
  replyEmailStatus: makeSelectReplyEmailStatus(),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateEmailData: content => {
    if (ownProps.emailType === 'reply') {
      dispatch(updateReplyEmailData({ body: content }));
    } else {
      dispatch(updateNewEmailData({ body: content }));
    }
  },
});

MyEditor.propTypes = {
  newEmailObj: PropTypes.object,
  replyEmailObj: PropTypes.object,
  emailInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  emailType: PropTypes.string,
  updateEmailData: PropTypes.func,
  replyEmailStatus: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(MyEditor));
