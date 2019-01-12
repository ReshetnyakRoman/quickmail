import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Switch from 'components/Switch';

const StyledDiv = styled.div`
  position: absolute;
  bottom: 40px;
  @media (max-width: 768px) {
    bottom: 20px;
  }
`;

const SwitchBlock = props => {
  const lang = props.language;
  return (
    <StyledDiv>
      <Switch
        themeDefault={props.isThemeDefault}
        checked={props.language === 'en'}
        handleChange={() => props.toogleLang(lang === 'en' ? 'ru' : 'en')}
        msgParametr={lang === 'ru' ? 'Ru' : 'En'}
        labelTextID="toogleLangID"
      />
      <br />
      <Switch
        themeDefault={props.isThemeDefault}
        checked={props.isThemeDefault}
        handleChange={props.toogleTheme}
        msgParametr={props.isThemeDefault ? 'Ligth' : 'Dark'}
        labelTextID="toogleThemeID"
      />
    </StyledDiv>
  );
};

SwitchBlock.propTypes = {
  isThemeDefault: PropTypes.bool,
  toogleTheme: PropTypes.func,
  language: PropTypes.string,
  toogleLang: PropTypes.func,
};

export default SwitchBlock;
