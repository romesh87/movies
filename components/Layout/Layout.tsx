// eslint-disable-next-line no-use-before-define
import React from 'react';

import MainNavigation from './MainNavigation';

const Layout: React.FC = ({ children }) => (
  <>
    <MainNavigation />
    <main>{children}</main>
  </>
);

export default Layout;
