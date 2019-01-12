import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { ThemeProvider } from '@callstack/react-theme-provider';
import { makeSelectIsThemeDefault } from './selectors';
import { ligthTheme, darkTheme } from './themes';
class MyThemeProvider extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const theme = this.props.isThemeDefault ? ligthTheme : darkTheme;
    return <ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>;
  }
}

MyThemeProvider.propTypes = {
  isThemeDefault: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(
  makeSelectIsThemeDefault(),
  isThemeDefault => ({ isThemeDefault }),
);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyThemeProvider);
