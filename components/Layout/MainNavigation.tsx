/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-use-before-define
import React from 'react';
import Link from 'next/link';

import Logo from './Logo';

import styles from './MainNavigation.module.css';

const MainNavigation: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a><Logo /></a>
      </Link>
    </header>
  );
};

export default MainNavigation;
