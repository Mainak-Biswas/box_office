import React from 'react';
import Navs from './Navs';
import Title from './Title';

function MainPageLayout({ children }) {
  return (
    <div>
      <Title
        title="Box Office"
        subtitle="Are you Looking for a Movie or an Actor"
      />
      <Navs />
      {children}
    </div>
  );
}

export default MainPageLayout;
