import React from 'react';
import { Motion, spring } from 'react-motion';
import Search from '@material-ui/icons/Search';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import SearchBtn from './SearchBtn';
import messages from './messages';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
    this.searchInput = React.createRef();
    this.focusSearchInput = this.focusSearchInput.bind(this);
  }

  handleClick(e) {
    this.focusSearchInput();
    this.setState({ isVisible: true });
    this.props.toogleSearchVisible(true);
  }

  focusSearchInput() {
    this.searchInput.current.focus();
  }

  handleBlur(input) {
    const timer = setTimeout(() => {
      this.searchInput.current.value = '';
      this.setState({ isVisible: false });
      this.props.toogleSearchVisible(false);
    }, 300);
  }

  handleInput(input) {
    if (input.key === 'Enter') {
      this.props.onSearch(input.target.value);
    } else {
      // this.props.onSearchBarAction({ searhText: input.target.value });
    }
  }

  render() {
    const { theme, onSearch } = this.props;
    const StyledIcon = styled(Search)`
      color: ${theme.searchPlaceholder};
      cursor: pointer;
      margin-top: 22px;
    `;
    const searchButton = this.state.isVisible ? (
      <SearchBtn handleSearch={() => onSearch(this.searchInput.current.value)}>
        <FormattedMessage {...messages.SearchBtn} />
      </SearchBtn>
    ) : null;

    return (
      <React.Fragment>
        <Motion
          style={{
            x: spring(this.state.isVisible ? 100 : 0),
            y: spring(this.state.isVisible ? 100 : 20),
          }}
        >
          {({ x, y }) => (
            <div
              style={{
                minWidth: `50px`,
                display: `flex`,
                width: `${x}%`,
              }}
            >
              <StyledIcon onClick={e => this.handleClick(e)} />

              <div style={{ width: `${x}%` }}>
                <input
                  style={{ width: '100%' }}
                  ref={this.searchInput}
                  type="text"
                  aria-label="Search Email"
                  placeholder="Search Email"
                  className="search"
                  onKeyUp={e => this.handleInput(e)}
                  onBlur={e => this.handleBlur(e)}
                />
              </div>
              {searchButton}
            </div>
          )}
        </Motion>
      </React.Fragment>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  theme: PropTypes.object,
};
