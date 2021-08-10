// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';

import MovieItem from './MovieItem';
import Pagination from '../UI/Pagination/Pagination';

import styles from './MovieList.module.css';

export interface Props {
  list: any;
}

const FeedbackList: React.FC = () => {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    fetchData();
  }, []);

  const fetchData = (page = '1') => {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=0843fe7349d2e0a2e7cb8fd14fbe9b3f&language=en-US&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setList(data.results);
        setIsLoading(false);
      });
  };

  const changePage = (e: any) => {
    fetchData(e.target.textContent);
    setCurrentPage(+e.target.textContent);
  };

  let content;

  if (isLoading) {
    content = <div style={{ textAlign: 'center' }}>Loading...</div>;
  } else if (!isLoading && list?.length === 0) {
    content = <div style={{ textAlign: 'center' }}>No movies yet</div>;
  } else {
    content = (
      <>
        {list.map((item) => <MovieItem item={item} />)}
        <Pagination
          resultsCount={500}
          itemsPerPage={20}
          currentPage={currentPage}
          onClickHandler={changePage}
        />
      </>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Top 500 Movies</h2>
      {content}
    </div>
  );
};

export default FeedbackList;
