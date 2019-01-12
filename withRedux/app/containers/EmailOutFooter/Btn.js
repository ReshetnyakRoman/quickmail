import { withTheme } from '@callstack/react-theme-provider';

const StyledButton = styled(Button)`
  background-color: ${props => props.theme.info} !important;
  color: white !important;
  padding: 8px !important;
  width: 110px !important;
  margin: 16px auto !important;
  & :hover {
    background-color: #146785 !important;
  }
  @media (max-width: 768px) {
    display: none !important;
  }
`;

export default withTheme(StyledButton);
