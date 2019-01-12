import styled from 'styled-components';

const LoaderContainer = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 20%;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: end;
  -moz-box-align: end;
  -o-box-align: end;
  -ms-flex-align: end;
  -webkit-align-items: flex-end;
  align-items: flex-end;
  position: relative;
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    border-radius: 20%;
  }
`;

export default LoaderContainer;
