import styled, { keyframes } from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';

const rotating = keyframes`
  50% {
    -webkit-transform: rotate(calc(180deg * var(--direction)));
    -moz-transform: rotate(calc(180deg * var(--direction)));
    -o-transform: rotate(calc(180deg * var(--direction)));
    -ms-transform: rotate(calc(180deg * var(--direction)));
    transform: rotate(calc(180deg * var(--direction)));
  }
  100% {
    -webkit-transform: rotate(calc(360deg * var(--direction)));
    -moz-transform: rotate(calc(360deg * var(--direction)));
    -o-transform: rotate(calc(360deg * var(--direction)));
    -ms-transform: rotate(calc(360deg * var(--direction)));
    transform: rotate(calc(360deg * var(--direction)));
  }
`;

const LoaderBoarders = styled.div`
  width: 10rem;
  height: 10rem;
  font-size: 25px;
  border-top: 0.3rem solid #ff69b4;
  border-radius: 50%;
  position: relative;
  --direction: 1;
  -webkit-animation: ${rotating} 2s ease-in-out infinite;
  -moz-animation: ${rotating} 2s ease-in-out infinite;
  -o-animation: ${rotating} 2s ease-in-out infinite;
  -ms-animation: ${rotating} 2s ease-in-out infinite;
  animation: ${rotating} 2s ease-in-out infinite;
  background-color: ${props => props.theme.blurLayerColor};

  ::before,
  ::after {
    content: '';
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    top: -0.2rem;
  }
  ::before {
    border-top: 0.3rem solid #1e90ff;
    -webkit-transform: rotate(120deg);
    -moz-transform: rotate(120deg);
    -o-transform: rotate(120deg);
    -ms-transform: rotate(120deg);
    transform: rotate(120deg);
  }
  ::after {
    border-top: 0.3rem solid #ffd700;
    -webkit-transform: translateX(-100%) rotate(240deg);
    -moz-transform: translateX(-100%) rotate(240deg);
    -o-transform: translateX(-100%) rotate(240deg);
    -ms-transform: translateX(-100%) rotate(240deg);
    transform: translateX(-100%) rotate(240deg);
  }
  & span {
    display: inline-block;
    postion: absolute;
    color: ${props => props.theme.primaryTextColor};
    width: inherit;
    height: inherit;
    text-align: center;
    line-height: 10rem;
    font-size: 16px;
    -webkit-animation: ${rotating} 2s linear infinite;
    -moz-animation: ${rotating} 2s linear infinite;
    -o-animation: ${rotating} 2s linear infinite;
    -ms-animation: ${rotating} 2s linear infinite;
    animation: ${rotating} 2s linear infinite;
    --direction: -1;
  }
`;

export default withTheme(LoaderBoarders);
