import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CreateIcon from '@material-ui/icons/Create';
import Fab from '@material-ui/core/Fab';
import MyBlueBtn from 'components/MyBlueBtn';

const StyledFab = styled(Fab)`
  position: fixed !important;
  bottom: 0.7rem !important;
  right: 0.7rem !important;
  color: white !important;
  background-color: #f86c6b !important;
  z-index: 3 !important;
  @media (min-width: 769px) {
    display: none !important;
  }
`;

const NewEmailBtn = props => (
  <React.Fragment>
    {props.type === 'mobile' ? null : (
      <MyBlueBtn variant="contained" onClick={() => props.onNewEmailClick()}>
        {props.children}
      </MyBlueBtn>
    )}
    {props.type === 'mobile' ? (
      <StyledFab aria-label="New Email" onClick={() => props.onNewEmailClick()}>
        <CreateIcon />
      </StyledFab>
    ) : null}
  </React.Fragment>
);

NewEmailBtn.propTypes = {
  onNewEmailClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default NewEmailBtn;
