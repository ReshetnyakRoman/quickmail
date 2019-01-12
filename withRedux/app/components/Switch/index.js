import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/App/messages';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';

const SwitchToogle = props => {
  const {
    checked,
    handleChange,
    msgParametr,
    labelTextID,
    themeDefault,
    theme,
  } = props;

  const variantColors = {
    success: '#4dbd74',
    warning: '#ffc107',
    error: '#f86c6b',
    info: '#20a8d8',
  };

  const StyledSwitch = styled(Switch)`
    & span:first-child span {
      color: ${checked ? theme.infoColor : theme.successColor};
    }
    & span:last-child {
      opacity: 0.5;
      background-color: ${checked
        ? theme.infoColor
        : theme.successColor} !important;
    }

    & span span:last-child {
      background-color: rgba(255, 255, 255, 0) !important;
    }
  `;
  const StyledFormControlLabel = styled(FormControlLabel)`
    & span:last-child span {
      color: ${theme.sideBarColor} !important;
      font-size: 12px;
    }
  `;
  const StyledFormControl = styled(FormControl)`
    margin: 7px 10px !important;
    padding: 0 !important;
    height: 20px;
  `;

  return (
    <StyledFormControl component="fieldset">
      <StyledFormControlLabel
        control={
          <StyledSwitch
            checked={checked}
            onChange={() => handleChange()}
            value={labelTextID}
          />
        }
        label={
          <FormattedMessage
            {...messages[labelTextID]}
            values={{ msgParametr: msgParametr.toUpperCase() }}
          />
        }
      />
    </StyledFormControl>
  );
};

export default withTheme(SwitchToogle);
