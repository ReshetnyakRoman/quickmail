import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';

const StyledP = styled.p`
  color: ${props => props.theme.primaryTextColor};
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
`;

export default withTheme(StyledP);
