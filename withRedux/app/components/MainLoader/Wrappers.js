import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
  background-color: #fff;
  z-index: 10;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
`;

const ProgressWrapper = styled.div`
  width: 70%;
`;

export { Wrapper, ProgressWrapper };
