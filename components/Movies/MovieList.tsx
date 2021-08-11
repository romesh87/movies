import { useEffect, useState, FC } from 'react';

import MovieItem from './MovieItem';
import Pagination from '../UI/Pagination/Pagination';
import { API_BASE_URL, API_KEY } from '../../constants';

import styles from './MovieList.module.css';

const MovieList: FC = () => {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = (page = '1', sort = 'desc') => {
    setIsLoading(true);
    fetch(`${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_average.${sort}&vote_count.gte=1000&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setList(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const changePageHandler = (e) => {
    fetchData(e.target.textContent, sortOrder);
    setCurrentPage(+e.target.textContent);
  };

  const sortHandler = () => {
    setSortOrder((prevState) => {
      if (prevState === 'desc') {
        fetchData('1', 'asc');
        setCurrentPage(1);
        return 'asc';
      }
      fetchData('1', 'desc');
      setCurrentPage(1);
      return 'desc';
    });
  };

  let content;

  if (isLoading) {
    content = <div style={{ textAlign: 'center' }}>Loading...</div>;
  } else if (!isLoading && list?.length === 0) {
    content = <div style={{ textAlign: 'center' }}>No movies yet</div>;
  } else {
    content = (
      <>
        <div className={styles.sortContainer}>
          Sort by Rating:
          <button className={styles.sortBtn} type="button" onClick={sortHandler}>{sortOrder}</button>
        </div>
        <ul className={styles.grid}>
          {list.map((item) => <MovieItem key={item.id} movie={item} />)}
        </ul>
        <Pagination
          resultsCount={500}
          itemsPerPage={20}
          currentPage={currentPage}
          onClickHandler={changePageHandler}
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

export default MovieList;
