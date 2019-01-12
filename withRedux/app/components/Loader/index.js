import React from 'react';
import LoaderBoarders from './LoaderBoarders';
import LoaderContainer from './LoaderContainer';

const Loader = () => (
  <LoaderContainer>
    <LoaderBoarders>
      <span>Loading...</span>
    </LoaderBoarders>
  </LoaderContainer>
);

export default Loader;
