import styled from 'styled-components';

const StyledDiv = styled.div`
  height: 50%;
  & :after {
    content: '';
    position: relative;
    display: block;
    clear: both;
  }
`;

export default StyledDiv;
