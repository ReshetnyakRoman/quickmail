import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withTheme } from '@callstack/react-theme-provider';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import { updateReplyEmailData, updateNewEmailData } from '../Mailbox/actions';
import RecipentBage from './RecipentBage';
import {
  makeSelectNewEmailObj,
  makeSelectReplyEmailObj,
} from '../Mailbox/selectors';

class SendToInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleCopyInput = this.handleCopyInput.bind(this);
    this.addressInput = React.createRef();
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.createInitialSatate = this.createInitialSatate.bind(this);
    this.state = {
      addressList: this.createInitialSatate(),
    };
  }

  createInitialSatate() {
    const {
      emailType,
      replyEmailObj,
      newEmailObj,
      prefix,
      recipentsList,
    } = this.props;
    if (recipentsList) return recipentsList.slice();

    const recipients = prefix === 'to' ? 'to' : 'cc';
    const initialSatate =
      emailType === 'reply'
        ? replyEmailObj[recipients].slice()
        : newEmailObj[recipients].slice();
    return initialSatate;
  }

  componentDidMount() {
    const recipentsList = this.state.addressList;

    if (
      String(this.props.prefix)
        .toLowerCase()
        .indexOf('to') > -1 &&
      this.props.isChangable
    ) {
      this.addressInput.current.focus();
    }
    if (
      String(this.props.prefix)
        .toLowerCase()
        .indexOf('forward') > -1 &&
      this.props.isChangable
    ) {
      this.addressInput.current.focus();
    }
    if (
      recipentsList.length > 0 &&
      typeof this.props.onInputChange === 'function'
    ) {
      // this is to popUp cc recipients to emailReply obj
      // this.props.onInputChange(recipentsList);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.recipentsList) return false;
    if (nextState.addressList.length === this.state.addressList.length)
      return false;
    return true;
  }

  componentDidUpdate(prevProps) {
    console.log('Input', this.props.prefix, 're-rendered');
    if (this.props.isChangable) {
      this.addressInput.current.focus();
    }
  }

  handleCloseClick(email) {
    const newAddressList = this.state.addressList
      .slice()
      .filter(person => person.email !== email);
    this.setState({
      addressList: newAddressList,
    });
    this.props.onInputChange(newAddressList);
  }

  handleCopyInput(props) {
    // проверяем что данного адреса еще нет в списке и добавляем иначе обнуляем поле ввода
    if (
      props.key === 'Backspace' &&
      this.addressInput.current.value.length === 0
    ) {
      const newAddressList = this.state.addressList.slice();
      newAddressList.pop();

      this.setState({
        addressList: newAddressList,
      });
      this.props.onInputChange(newAddressList);
    }
    if (props.key === 'Enter' || props.key === ' ') {
      if (
        this.state.addressList.filter(
          person => person.email === this.InputValue,
        ).length === 0 &&
        this.InputValue !== '' &&
        this.InputValue !== undefined
      ) {
        const newAddressList = this.state.addressList
          .slice()
          .concat([{ email: this.InputValue, name: this.InputValue }]);

        this.setState({
          addressList: newAddressList,
        });
        this.props.onInputChange(newAddressList);
      }

      this.addressInput.current.value = '';
    } else {
      this.InputValue = this.addressInput.current.value;
    }
  }

  handleInputBlur() {
    // let newAddressList = this.state.addressList;
    if (
      this.state.addressList.filter(person => person.email === this.InputValue)
        .length === 0 &&
      this.InputValue !== '' &&
      this.InputValue !== undefined
    ) {
      const newAddressList = this.state.addressList
        .slice()
        .concat([{ email: this.InputValue, name: this.InputValue }]);
      this.setState({
        addressList: newAddressList,
      });
      this.props.onInputChange(newAddressList);
    }

    this.addressInput.current.value = '';
  }

  render() {
    // console.log('input', this.props.prefix, 'rendered');
    const { prefix, isChangable, isUnderlined, theme } = this.props;
    const Wrapper = styled.div`
      font-size: 0.8rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      border-bottom: ${isUnderlined
        ? `1px solid ${theme.sideBarBorderColor}`
        : '0px'};
      input {
        color: ${theme.primaryTextColor};
        display: inline-block;
        border: none;
        box-flex: 8;
        flex-grow: 8;
        padding: 0;
        margin: 0;
        outline-width: 0;
        font-size: 0.8rem;
        ::placeholder {
          color: ${theme.secondryTextColor};
        }
      }
    `;
    const StyledSpan = styled.span`
      padding-right: 4px;
      color: ${theme.secondryTextColor};
    `;

    const styledPrefix = (
      <StyledSpan>
        <FormattedMessage {...messages[prefix]} />
        &nbsp;
      </StyledSpan>
    );

    const RecipentBages = (
      <RecipentBage
        recipentsList={this.state.addressList}
        isClosable={isChangable}
        handleCloseClick={this.handleCloseClick}
        type={prefix}
      />
    );

    const Input = isChangable ? (
      <input
        type="text"
        aria-label="to"
        autoComplete="on"
        ref={this.addressInput}
        onKeyUp={this.handleCopyInput}
        onBlur={this.handleInputBlur}
      />
    ) : null;

    return (
      <Wrapper>
        {styledPrefix}
        {RecipentBages}
        {Input}
      </Wrapper>
    );
  }
}

SendToInput.propTypes = {
  isUnderlined: PropTypes.bool,
  isChangable: PropTypes.bool,
  onInputChange: PropTypes.func,
  recipentsList: PropTypes.array,
  prefix: PropTypes.string,
  theme: PropTypes.object,
  emailType: PropTypes.string,
  emailObj: PropTypes.object,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onInputChange: recipients => {
    const key = ownProps.prefix === 'to' ? 'to' : 'cc';
    if (ownProps.isChangable && ownProps.emailType === 'reply') {
      dispatch(updateReplyEmailData({ [key]: recipients }));
    } else {
      dispatch(updateNewEmailData({ [key]: recipients }));
    }
  },
});

const mapStateToProps = createStructuredSelector({
  replyEmailObj: makeSelectReplyEmailObj(),
  newEmailObj: makeSelectNewEmailObj(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(SendToInput));
