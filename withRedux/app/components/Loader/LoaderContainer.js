import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
  padding: 0;
  z-index: 50;
  position: fixed;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  background-color: ${props => props.theme.blurLayerColor};
  display: flex;
`;

export default withTheme(LoaderContainer);
