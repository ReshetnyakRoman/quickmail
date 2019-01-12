import styled, { keyframes } from 'styled-components';

const gradientAnimation = keyframes`
  0% {
    background-color: #4dbd74;
  }
  10% {
    background-color: #20a8d8;
  }
  20% {
    background-color: #ffc107;
  }
  30% {
    background-color: #4dbd74;
  }
  40% {
    background-color: #ffc107;
  }
  50% {
    background-color: #20a8d8;
  }
  60% {
    background-color: #ffc107;
  }
  70% {
    background-color: #4dbd74;
  }
  80% {
    background-color: #20a8d8;
  }
  90% {
    background-color: #4dbd74;
  }
  100% {
    background-color: #ffc107;
  }
`;

const Gradient = styled.div`
  top: 20;
  left: 0;
  position: fixed;
  -webkit-animation: ${gradientAnimation} 60s linear infinite;
  -moz-animation: ${gradientAnimation} 60s linear infinite;
  -o-animation: ${gradientAnimation} 60s linear infinite;
  -ms-animation: ${gradientAnimation} 60s linear infinite;
  animation: ${gradientAnimation} 60s linear infinite;
  z-index: 1;
  opacity: 0.5;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=50)';
  filter: alpha(opacity=50);
  width: 100%;
  height: 100%;
  background-color: #f35626;
`;

export default Gradient;
