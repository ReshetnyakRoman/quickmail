import styled from 'styled-components';

const StyledFooter = styled.footer`
  height: 48px;
  position: relative;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  button:first-child {
    display: inline-block !important;
    margin: 0 !important;
  }
  label {
    margin-left: 16px;
    margin-right: 16px;
  }
`;

export default StyledFooter;
