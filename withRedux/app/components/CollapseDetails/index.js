import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/SendToInput/messages';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';
import PropTypes from 'prop-types';

function CollapseDetails(props) {
  const { theme } = props;
  const StyledIcon = styled(ArrowDropDown)`
    height: 18px !important;
    width: 18px !important;
    color: inherit !important;
  `;
  const Wrapper = styled.div`
    @media (min-width: 769px) {
      display: none;
      font-size: 80%;
      margin-top: 0;
      padding-top: 0;
      justify-content: flex-start;
    }
  `;
  const GrayText = styled.span`
    color: ${theme.secondryTextColor};
    font-size: 13px;
  `;
  const BlueText = styled.span`
    color: ${theme.infoColor};
    font-size: 13px;
    margin-left: 4px;
  `;

  return (
    <Wrapper onClick={() => props.onShowDetailsClick()}>
      <GrayText>
        <FormattedMessage {...messages.to} />
      </GrayText>
      <BlueText className="my-text-blue">
        <FormattedMessage {...messages.showDetails} />
        <StyledIcon />
      </BlueText>
    </Wrapper>
  );
}

CollapseDetails.propTypes = {
  theme: PropTypes.object,
  handleDetailsClick: PropTypes.func,
};

export default withTheme(CollapseDetails);
