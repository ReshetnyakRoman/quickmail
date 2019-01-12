import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: ${props => (props.isReply ? '4px' : 0)};
  height: 48px;
  background-color: ${props => props.bgColor};
`;

export default Wrapper;
