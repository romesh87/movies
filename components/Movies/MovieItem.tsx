// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';

import { getItemFromLocalStorage, setItemInLocalStorage } from '../../utils';

// import { IFeedbackItem } from '../../interfaces';

import styles from './MovieItem.module.css';

export interface Props {
  item: any;
}

const FeedbackItem: React.FC<Props> = ({ item }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const highlightedMovies = JSON.parse(getItemFromLocalStorage('highlighted_movies')) || {};
    if (highlightedMovies[item.id]) {
      setIsHighlighted(true);
    }
  }, []);

  const handleHighlight = () => {
    const highlightedMovies = JSON.parse(getItemFromLocalStorage('highlighted_movies')) || {};

    setIsHighlighted((prevState) => {
      if (highlightedMovies[item.id]) {
        setItemInLocalStorage('highlighted_movies', JSON.stringify({ ...highlightedMovies, [item.id]: !prevState }));
      }
      if (!highlightedMovies[item.id] && !prevState) {
        setItemInLocalStorage('highlighted_movies', JSON.stringify({ ...highlightedMovies, [item.id]: true }));
      }

      return !prevState;
    });
  };

  return (
    <div className={isHighlighted ? `${styles.container} ${styles.highlighted}` : styles.container}>
      <div className={styles.header}>
        <div>
          <div className={styles.name}>{item.original_title}</div>
        </div>
        <div className={styles.datetime}>
          Year:
          <Moment format="YYYY">
            {item.release_date}
          </Moment>
        </div>
        <div className={styles.datetime}>
          Rating:
          {item.vote_average}
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.datetime}>
          Image:
          {item.poster_path}
        </div>
        <div className={styles.datetime}>
          Link:
        </div>
      </div>
      <button type="button" onClick={handleHighlight}>Highlight</button>
    </div>
  );
};

export default FeedbackItem;
