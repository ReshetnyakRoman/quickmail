import React from 'react';
import EmailValidation from 'utils/EmailValidation';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withTheme } from '@callstack/react-theme-provider';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function RecipentBage(props) {
  const { handleCloseClick, recipentsList, isClosable, theme, type } = props;
  const CloseSpan = styled.span`
    cursor: pointer;
    padding: 0 4px;
    margin-left: 4px;
    font-size: 12px;
    :hover {
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.3);
    }
  `;
  const Wrapper = styled.div`
    display: flex;
    margin: 0;
    position: relative;
    align-items: center;
  `;
  const InfoPopup = styled.div`
    cursor: text;
    visibility: hidden;
    position: absolute;
    border-radius: 5px;
    white-space: nowrap;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    background-color: ${props1 =>
      props1.isValid ? theme.emailToolTipBG : theme.warningColor};
    left: 30px;
    padding: 6px 10px;
    z-index: 5;
    transform: translate(10px, 10px);
    opacity: 0;
    font-size: 80%;
    color: ${theme.secondryTextColor};
    & span {
      color: ${props1 => (props1.isValid ? theme.infoColor : 'black')};
    }
    ${Wrapper}:hover & {
      transform: translate(0px, 0px);
      visibility: visible;
      opacity: 1;
      transition: all 300ms ease;
      transition-delay: 0.7s;
    }
  `;

  const BageType1 = styled.span`
    cursor: context-menu;
    display: inline-block;
    padding: 2px 6px 2px 6px;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    background-color: ${props2 =>
      props2.isValid ? theme.badegBG : theme.errorColor};
    color: ${props2 => (props2.isValid ? theme.badgeText : 'white')};
    }
  `;
  const BageType2 = styled.span`
    cursor: context-menu;
    color: ${theme.primaryTextColor};
    font-size: 0.8rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `;
  const BageType3 = styled.span`
    cursor: context-menu;
    font-size: 0.8rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: bold;
    color: ${props3 =>
      props3.isValid ? theme.primaryTextColor : theme.errorColor};
  `;
  const StyledComa = styled.span`
    color: ${theme.primaryTextColor};
  `;

  const closeButton = email =>
    isClosable ? (
      <CloseSpan onClick={() => handleCloseClick(email)}>
        &nbsp; &times; &nbsp;
      </CloseSpan>
    ) : null;

  const len = recipentsList.length;
  const recipents = recipentsList.map((person, index) => {
    const mainInfo = person.name ? person.name : person.email;
    const coma =
      index === len - 1 ? (
        <span>&nbsp;</span>
      ) : (
        <StyledComa>,&nbsp;</StyledComa>
      );
    const isValid = EmailValidation(person.email);

    const popup = isValid ? (
      <InfoPopup isValid={isValid}>
        email:&nbsp;
        <span>{person.email}</span>
      </InfoPopup>
    ) : (
      <InfoPopup isValid={isValid}>
        <FormattedMessage {...messages.invalidEmail} />
      </InfoPopup>
    );

    let personInfo = (
      <BageType1 isValid={isValid}>
        {mainInfo}
        {closeButton(person.email)}
      </BageType1>
    );

    if (type === 'from') {
      personInfo = <BageType2>{mainInfo}</BageType2>;
    }

    if (type === 'reply') {
      personInfo = <BageType3 isValid={isValid}>{mainInfo}</BageType3>;
    }

    return (
      <Wrapper key={mainInfo}>
        {personInfo}
        {popup}
        {coma}
      </Wrapper>
    );
  });

  return <React.Fragment>{recipents}</React.Fragment>;
}
RecipentBage.propTypes = {
  handleCloseClick: PropTypes.func,
  recipentsList: PropTypes.array,
  isClosable: PropTypes.bool,
  theme: PropTypes.object,
  type: PropTypes.string,
};

export default withTheme(RecipentBage);
