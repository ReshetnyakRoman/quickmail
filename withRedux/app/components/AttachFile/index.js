import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AttachFile from '@material-ui/icons/AttachFile';
import { StyledIcon } from 'components/CircleBtn';

const handleFiles = files => {
  const filesWithInfo = Array.from(files).map(file => ({
    name: file.name,
    size: file.size,
    file,
  }));
  return filesWithInfo;
};

function AttachFiles(props) {
  const { onEmailDataChange, tooltip, textColor, bgColor, size } = props;
  const StyledInput = styled.input`
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  `;
  return (
    <label>
      <StyledInput
        type="file"
        name="fileNewEmail"
        onChange={e => onEmailDataChange(handleFiles(e.target.files))}
        multiple
      />
      <StyledIcon
        size={size}
        tooltip={tooltip}
        textColor={textColor}
        bgColor={bgColor}
      >
        <AttachFile />
      </StyledIcon>
    </label>
  );
}

AttachFiles.propTypes = {
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  onEmailDataChange: PropTypes.func,
};

export default AttachFiles;
