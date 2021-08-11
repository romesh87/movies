import { FC } from 'react';

import styles from './Pagination.module.css';

export interface Props {
  resultsCount: number;
  itemsPerPage: number;
  currentPage: number;
  onClickHandler: (e) => void;
}

const Pagination: FC<Props> = (props) => {
  const pages = Math.floor(props.resultsCount / props.itemsPerPage);
  const pagesArray = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }

  return (
    <nav className={styles.pagination}>
      <ul>
        {pagesArray.map((page) => (
          <li
            key={page}
            onClick={(e) => props.onClickHandler(e)}
            style={{
              backgroundColor:
                +props.currentPage === page ? '#007CC7' : 'white',
              color: +props.currentPage === page ? 'white' : 'black',
            }}
          >
            {page}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
