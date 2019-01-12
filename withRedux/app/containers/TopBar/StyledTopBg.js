import styled from 'styled-components';

const StyledTopBg = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 68px;
  border-bottom: 1px solid ${props => props.theme.sideBarBorderColor};
  position: fixed;
  width: 100%;
  padding-left: 166px;
  left: 0px;
  top: 0px;
  background-color: ${props => props.theme.sideBarBgColor};
  z-index: 5;
  & .search {
    color: ${props => props.theme.secondryTextColor};
    margin-left: 6px;
    margin-top: 24px;
    border: none;
    width: 100%;
    outline-width: 0;
  }
  & .search::placeholder {
    color: ${props => props.theme.searchPlaceholder};
  }
  @media (max-width: 768px) {
    width: 100vw;
    padding-left: 60px;
  }
`;

export default StyledTopBg;
