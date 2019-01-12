import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';

const ProgressBar = styled(LinearProgress)`
  width: 100%;
  height: 2px !important;
  & div {
    background-color: #3267d5;
  }
`;

export default ProgressBar;
