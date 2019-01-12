import styled from 'styled-components';

const StyledDiv = styled.span`
  width: 50%;
  float: left;
  height: 2rem;
  position: relative;
  text-align: center;
  cursor: pointer;

  position: absolute;
  left: 0%;
  transform: traslate(-50%, -50%);
  width: 50%;

  border-bottom-left-radius: 10px;
  background-color: #f86c6b;
  color: #fff;
  font-weight: bold;
  font-size: 65%;
  padding: 10px 0;

  & :hover {
    background-color: #f63c3c;
  }
`;

export default StyledDiv;
