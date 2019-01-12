import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FolderOpen from '@material-ui/icons/FolderOpen';
import { withTheme } from '@callstack/react-theme-provider';
import { Motion, spring } from 'react-motion';
import messages from 'components/SideBarMenu/messages';
import { FormattedMessage } from 'react-intl';
import { allDefaultFolders } from 'config';

function CurrentFolder(props) {
  const { screnType, theme, isVisible, folder } = props;
  const StyledH3 = styled.h3`
    margin-bottom: 0px;
    white-space: nowrap;
    color: ${theme.infoColor};
    margin: 20px 0px 0px 16px;
  `;
  const StyledH4 = styled.h4`
    margin-bottom: 0px;
    white-space: nowrap;
    color: ${theme.infoColor};
    margin: 20px 0px 0px 16px;
  `;
  const StyledIcon = styled(FolderOpen)`
    font-size: 32px !important;
    transform: translateY(-3px);
  `;
  let folderName =
    allDefaultFolders.indexOf(folder) === -1 ? (
      (folderName = folder)
    ) : (
      <FormattedMessage {...messages[folder]} />
    );

  const adjustedFolder =
    screnType === 'desktop' ? (
      <StyledH3 className="mb-0 currnt-folder">
        <StyledIcon /> {folderName}
      </StyledH3>
    ) : (
      <StyledH4 className="mb-0 currnt-folder">
        <StyledIcon /> {folderName}
      </StyledH4>
    );

  return (
    <Motion style={{ x: spring(isVisible ? 100 : 0) }}>
      {({ x }) => (
        <div style={{ opacity: `${x}%`, width: `${x}%`, overflow: 'hidden' }}>
          {adjustedFolder}
        </div>
      )}
    </Motion>
  );
}

export default withTheme(CurrentFolder);

CurrentFolder.propTypes = {
  screnType: PropTypes.string,
  theme: PropTypes.object,
  isVisible: PropTypes.bool,
  folder: PropTypes.string,
};
