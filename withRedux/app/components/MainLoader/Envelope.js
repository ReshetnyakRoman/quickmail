import styled, { keyframes } from 'styled-components';

const open = keyframes`
  0%, 20% {
    opacity: 0;
    top: 16px;
  }
  20%, 50% {
    opacity: 0;
  }
  55%, 100% {
    opacity: 1;
    top: 155px;
  }
`;

const flip = keyframes`
  0%, 60% {
    border-width: 0 144px 110px 144px;
    -webkit-transform: rotate3d(1, 0, 0, 180deg);
    -moz-transform: rotate3d(1, 0, 0, 180deg);
    -o-transform: rotate3d(1, 0, 0, 180deg);
    -ms-transform: rotate3d(1, 0, 0, 180deg);
    transform: rotate3d(1, 0, 0, 180deg);
  }
  60%, 100% {
    border-width: 0 144px 110px 144px;
    -webkit-transform: rotate3d(1, 0, 0, 0deg);
    -moz-transform: rotate3d(1, 0, 0, 0deg);
    -o-transform: rotate3d(1, 0, 0, 0deg);
    -ms-transform: rotate3d(1, 0, 0, 0deg);
    transform: rotate3d(1, 0, 0, 0deg);
  }
`;

const openSmall = keyframes`
  0%, 20% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
    top: 160px;
  }
  20%, 50% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  55%, 100% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
    top: 90px;
  }
`;

const flipSmall = keyframes`
  0%, 60% {
    border-width: 0 72px 55px 72px;
    -webkit-transform: rotate3d(1, 0, 0, 180deg);
    -moz-transform: rotate3d(1, 0, 0, 180deg);
    -o-transform: rotate3d(1, 0, 0, 180deg);
    -ms-transform: rotate3d(1, 0, 0, 180deg);
    transform: rotate3d(1, 0, 0, 180deg);
  }
  60%, 100% {
    border-width: 0 70px 55px 70px;
    -webkit-transform: rotate3d(1, 0, 0, 0deg);
    -moz-transform: rotate3d(1, 0, 0, 0deg);
    -o-transform: rotate3d(1, 0, 0, 0deg);
    -ms-transform: rotate3d(1, 0, 0, 0deg);
    transform: rotate3d(1, 0, 0, 0deg);
  }
`;

const Envelope = styled.div`
  background-color: #3267d5;
  width: 300px;
  height: 180px;
  margin: 0 auto 100px auto;
  border-top: 0px solid #ececec;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    width: 150px;
    height: 90px;
    margin: 0 auto 20px auto;
    border-top: 2px solid #ececec;
    border-radius: 10px;
  }
`;

const EnvelopeLeft = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 270px 170px 0;
  border-color: transparent transparent #2ab6f6 transparent;
  position: absolute;
  left: 0;
  bottom: 0;
  @media (max-width: 768px) {
    border-width: 0 135px 85px 0;
  }
`;

const EnvelopeRight = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 170px 270px;
  border-color: transparent transparent #81d2f9 transparent;
  position: absolute;
  right: 0;
  bottom: 0;
  @media (max-width: 768px) {
    border-width: 0 0 85px 135px;
  }
`;

const EnvelopeTop = styled.div`
  width: 0px;
  height: 0;
  border-style: solid;
  border-color: transparent transparent #2a55c5 transparent;
  position: absolute;
  top: 16px;
  -webkit-animation: ${flip} 3s linear infinite;
  -moz-animation: ${flip} 3s linear infinite;
  -o-animation: ${flip} 3s linear infinite;
  -ms-animation: ${flip} 3s linear infinite;
  animation: ${flip} 3s linear infinite;
  -webkit-perspective: 800px;
  -moz-perspective: 800px;
  -ms-perspective: 800px;
  perspective: 800px;
  -webkit-transform-origin: 100% 100%;
  -moz-transform-origin: 100% 100%;
  -o-transform-origin: 100% 100%;
  -ms-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
  @media (max-width: 768px) {
    top: 38px;
    left: 29px;
    -webkit-animation: ${flipSmall} 3s linear infinite;
    -moz-animation: ${flipSmall} 3s linear infinite;
    -o-animation: ${flipSmall} 3s linear infinite;
    -ms-animation: ${flipSmall} 3s linear infinite;
    animation: ${flipSmall} 3s linear infinite;
  }
`;

const EnvelopeContent = styled.div`
  width: 70px;
  height: 20px;
  background-color: #e0e0e0;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  left: 140px;
  top: 280px;
  z-index: 11;
  -webkit-animation: ${open} 3s linear infinite;
  -moz-animation: ${open} 3s linear infinite;
  -o-animation: ${open} 3s linear infinite;
  -ms-animation: ${open} 3s linear infinite;
  animation: ${open} 3s linear infinite;
  opacity: 0;
  &::after {
    content: '';
    width: 200%;
    height: 100%;
    background-color: #e0e0e0;
    position: absolute;
    left: -10px;
    bottom: 60px;
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    transform: rotate(-90deg);
  }
  @media (max-width: 768px) {
    width: 35px;
    height: 10px;
    left: 75px;
    top: 90px;
    -webkit-animation: ${openSmall} 3s linear infinite;
    -moz-animation: ${openSmall} 3s linear infinite;
    -o-animation: ${openSmall} 3s linear infinite;
    -ms-animation: ${openSmall} 3s linear infinite;
    animation: ${openSmall} 3s linear infinite;
    &::after {
      left: -5px;
      bottom: 30px;
    }
  }
`;

export default Envelope;
export { EnvelopeLeft, EnvelopeRight, EnvelopeTop, EnvelopeContent };
