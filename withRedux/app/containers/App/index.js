import React from 'react';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Routes from 'containers/Routes';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import MainLoader from 'components/MainLoader';
import PopUpMessage from 'containers/PopUpMessage';
import LoadingBlurLayer from 'containers/LoadingBlurLayer';
import ProgressBar from 'containers/ProgressBar';
import saga from './saga';
import reducer from './reducer';
import GlobalStyle from '../../global-styles';
import { updateScreenInfo } from './actions';
import { makeSelectIsAppLoaded, makeSelectScreenType } from './selectors';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    console.log('v12');
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isAppLoaded === false) return false;
    return true;
  }

  updateWindowDimensions() {
    let screenType = 'desktop';
    if (window.innerWidth <= 320) {
      screenType = 'small-mobile';
    } else {
      screenType = window.innerWidth < 768 ? 'mobile' : 'desktop';
    }
    const screen = { width: window.innerWidth, height: window.innerHeight };
    if (this.props.screenType !== screenType)
      this.props.updateScreenInfo(screen, screenType);
  }

  render() {
    const { isAppLoaded } = this.props;
    return (
      <div>
        <Helmet titleTemplate="%s - QuickMail" defaultTitle="QuickMail">
          <meta name="description" content="Fast and Simple email service" />
        </Helmet>
        <ProgressBar />
        <LoadingBlurLayer>
          {isAppLoaded ? <Routes /> : <MainLoader />}
        </LoadingBlurLayer>
        <PopUpMessage />

        <GlobalStyle />
      </div>
    );
  }
}

App.propTypes = {
  isAppLoaded: PropTypes.bool,
  updateScreenInfo: PropTypes.func,
  screenType: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  isAppLoaded: makeSelectIsAppLoaded(),
  screenType: makeSelectScreenType(),
});

const mapDispatchToProps = dispatch => ({
  updateScreenInfo: (screen, screenType) =>
    dispatch(updateScreenInfo(screen, screenType)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'App', reducer });
const withSaga = injectSaga({ key: 'App', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DragDropContext(HTML5Backend)(App));

