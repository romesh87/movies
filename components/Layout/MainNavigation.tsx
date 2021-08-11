import { FC } from 'react';
import Link from 'next/link';

import Logo from './Logo';

import styles from './MainNavigation.module.css';

const MainNavigation: FC = () => (
  <header className={styles.header}>
    <Link href="/">
      <a><Logo /></a>
    </Link>
  </header>
);

export default MainNavigation;
