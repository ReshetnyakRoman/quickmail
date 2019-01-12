import React from 'react';
import styled from 'styled-components';

const LocalWrapper = styled.span`
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  border-radius: 40px;
  text-align: center;
  font-size: 24px;
  color: #fff;
  font-family: 'Times New Roman', cursive, sans-serif;
`;

const Red = styled.span`
  color: #f86c6b;
`;
const Blue = styled.span`
  color: #20a8d8;
`;

const Logo = () => (
  <LocalWrapper>
    <Red>Q</Red>
    uick
    <Blue>M</Blue>
    ail
  </LocalWrapper>
);

export default Logo;
