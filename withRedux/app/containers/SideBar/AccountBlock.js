import styled from 'styled-components';

const AccountBlock = styled.div`
  position: relative;
  justify-content: center;
  text-align: center;
  & :hover .my-account-info {
    transform: translateY(0px);
    visibility: visible;
    transition: transform 300ms ease;
  }
`;
export default AccountBlock;
