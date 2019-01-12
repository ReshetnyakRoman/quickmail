/*
  * This is to drop off all styling 
  * from react-router Link component
*/

import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  :hover {
    text-decoration: none;
    color: inherit;
  }
`;

export default UnstyledLink;
