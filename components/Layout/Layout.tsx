import { FC } from 'react';

import MainNavigation from './MainNavigation';

const Layout: FC = ({ children }) => (
  <>
    <MainNavigation />
    <main>{children}</main>
  </>
);

export default Layout;
