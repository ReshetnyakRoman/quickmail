import React from 'react';
import { spring, TransitionMotion } from 'react-motion';
import { animation } from 'config';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectScreenType } from 'containers/App/selectors';

const animConfig = animation.newEmailConfig;

class EmailOutStyle extends React.Component {
  willLeave() {
    return {
      positionY: spring(600, animConfig),
      opacity: spring(0),
    };
  }

  render() {
    const { theme } = this.props;
    const StyledDiv = styled.div`
      border: 1px solid ${theme.sideBarBorderColor};
      box-shadow: 0 0.125rem 0.25rem ${theme.shadow2};
      margin-bottom: 8px;
      padding-bottom: 8px;
      z-index: 10;
      position: fixed;
      bottom: 8px;
      right: 16px;
      background-color: ${theme.backgroundColorLight};
      display: flex;
      flex-direction: column;
      min-height: 600px;
      max-height: 70vh;
      max-width: calc(100vw * 0.7);
      @media (max-width: 768px) {
        width: 100vw;
        max-width: 100vw;
        height: 100vh;
        min-height: 300px;
        max-height: 100vh;
        top: 0;
        right: 0;
      }

      .email-body {
        position: relative;
        box-flex: 8;
        flex-grow: 8;
        display: flex;
        margin: 0px;
        margin-bottom: 0px;
        height: 100% !important;
        flex-grow: 8;
        color: ${theme.primaryTextColor};
      }
      .email-body > div {
        display: flex;
      }
      .email-body > div > div > .DraftEditor-root {
        height: calc(100% - 50px) !important;
        overflow: auto;
      }
      @media (max-width: 768px) {
        .email-body {
          margin-bottom: 0px;
        }
        .email-body > div {
          align-items: stretch;
        }
        .email-body > div > div > .DraftEditor-root {
          height: calc(100% - 86px);
          max-height: calc(80vh - 86px);
        }
        .email-body > div > div > .editor-toolbar {
          box-flex: 1;
          flex-grow: 1;
        }
      }
    `;
    const styles = [
      {
        key: 'EmailOut',
        style: {
          positionY: spring(0, animConfig),
          opacity: spring(1),
        },
      },
    ];
    const defStyles = [
      {
        key: 'EmailOut',
        style: {
          positionY:
            this.props.screnType !== 'desktop'
              ? spring(0, animConfig)
              : spring(300, animConfig),
          opacity: spring(1),
        },
      },
    ];

    return (
      <TransitionMotion
        willLeave={this.willLeave}
        defaultStyles={defStyles}
        styles={styles}
      >
        {styles => (
          <StyledDiv
            key="EmailOut"
            style={{
              transform: `translateY(${styles[0].style.positionY}px)`,
              opacity: styles[0].style.opacity,
            }}
          >
            {this.props.children}
          </StyledDiv>
        )}
      </TransitionMotion>
    );
  }
}

EmailOutStyle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  screnType: PropTypes.string,
  theme: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  screnType: makeSelectScreenType(),
});

export default connect(
  mapStateToProps,
  null,
)(withTheme(EmailOutStyle));
