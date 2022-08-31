import React, { memo } from 'react';
import { TitleWrapper } from './Title.styled';

function Title({ title, subtitle }) {
  return (
    <TitleWrapper>
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
    </TitleWrapper>
  );
}

export default memo(Title);

// memo() prevents componenets from unnecessay re-renders
