import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  padding-bottom: 4px;
  flex-direction: column;
  border-radius: 4px;
  margin: 16px;
  box-shadow: 0px 0px 10px ${props => props.theme.shadow2};
  background-color: ${props => props.theme.backgroundColorLight};
  color: ${props => props.theme.primaryTextColor};
  @media (max-width: 768px) {
    margin: 16px 0px;
  }
`;

export default Wrapper;
