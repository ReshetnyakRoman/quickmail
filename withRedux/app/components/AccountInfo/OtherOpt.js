import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 50%;
  float: right;
  height: 2rem;
  position: relative;
  text-align: center;
  cursor: pointer;

  border-bottom-right-radius: 10px;
  color: #fff;
  font-weight: bold;

  & svg {
    width: 100%;
    height: 100%;
    stroke: #a4b7c1;
    fill: #a4b7c1;
  }
`;

export default StyledDiv;
