import styled from 'styled-components';
import IMG from './img/lights.jpg';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
  z-index: 20;
  background-image: url(${IMG});
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
`;

export default Wrapper;
