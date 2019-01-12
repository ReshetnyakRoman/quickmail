import styled from 'styled-components';

const DropZone = styled.div`
      justify-content: center;
      align-items: center;
      position: absolute;
      background-color: rgba(32, 168, 216, 0.2);
      border: 3px ${props => props.theme.infoColor} dashed;
      color: ${props => props.theme.infoColor};
      height: 100%;
      width: 100%;
      text-align: center;
      font-size: 40px;
      vertical-align: baseline;
`;

export default DropZone;
