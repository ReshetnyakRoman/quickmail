import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';
import PropTypes from 'prop-types';

function ReceivingDate(props) {
  const { theme, view, emailInfo } = props;
  const dateShortHand = new Date(Date.parse(emailInfo.receivingDate));
  const date =
    view === 'short'
      ? dateShortHand.toLocaleString('ru-RU', {
          month: 'short',
          day: 'numeric',
        })
      : dateShortHand.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        }) +
        ', ' +
        dateShortHand.toLocaleString('ru-RU', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });

  const ShortDiv = styled.div`
    font-size: 80%;
    color: ${theme.secondryTextColor};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;

    flex-align: stretch;
    align-self: stretch;
    align-items: center !important;

    white-space: nowrap;
    width: 50px;
    margin-right: 12px;

    padding-right: 0.5rem;
  `;
  const FullDiv = styled.div`
    font-size: 80%;
    color: ${theme.secondryTextColor};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;

    position: absolute;
    right: 1%;
    top: 50%;
    transform: translate(0%, -50%);
    display: inline-block;
    float: right;

    @media (max-width: 375px) {
      position: relative;
      width: 100%;
      float: left !important;
      display: block !important;
      margin: 0.5rem 0.1rem;
    }
  `;

  const Wrapper = view === 'short' ? ShortDiv : FullDiv;
  return <Wrapper>{date}</Wrapper>;
}

ReceivingDate.propTypes = {
  theme: PropTypes.object,
  emailInfo: PropTypes.object,
};

export default withTheme(ReceivingDate);
