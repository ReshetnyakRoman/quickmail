import styled from 'styled-components';

const StyledDiv = styled.div`
  display: ${props => (props.isReply ? 'none' : 'flex')};
  padding: 8px 24px;
  margin: 0 0 16px 0;
  background-color: ${props => props.theme.emailHeader};
  color: #fff;
  font-family: inherit;
  justify-content: space-between;
`;

export default StyledDiv;
