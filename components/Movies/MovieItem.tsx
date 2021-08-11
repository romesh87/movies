/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Moment from 'react-moment';

// import { IPost } from '../../interfaces';
import { getItemFromLocalStorage, setItemInLocalStorage } from '../../utils';

import styles from './MovieItem.module.css';

interface Props {
  movie: any;
}

const PostItem: React.FC<Props> = ({ movie }) => {
  const {
    original_title,
    release_date,
    vote_average,
    poster_path,
  } = movie;

  const imagePath = `https://image.tmdb.org/t/p/w500/${poster_path}`;

  const [isHighlighted, setIsHighlighted] = useState(false);
  const [link, setLink] = useState('#');

  useEffect(() => {
    const highlightedMovies = JSON.parse(getItemFromLocalStorage('highlighted_movies')) || {};
    if (highlightedMovies[movie.id]) {
      setIsHighlighted(true);
    }
  }, []);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=0843fe7349d2e0a2e7cb8fd14fbe9b3f&language=en-US`)
      .then((response) => response.json())
      .then((data) => {
        // console.log({ data });
        setLink(`https://www.imdb.com/title/${data.imdb_id}`);
      });
  }, [movie.id]);

  const handleHighlight = () => {
    const highlightedMovies = JSON.parse(getItemFromLocalStorage('highlighted_movies')) || {};

    setIsHighlighted((prevState) => {
      if (highlightedMovies[movie.id]) {
        setItemInLocalStorage('highlighted_movies', JSON.stringify({ ...highlightedMovies, [movie.id]: !prevState }));
      }
      if (!highlightedMovies[movie.id] && !prevState) {
        setItemInLocalStorage('highlighted_movies', JSON.stringify({ ...highlightedMovies, [movie.id]: true }));
      }

      return !prevState;
    });
  };

  return (
    <li>
      <div className={isHighlighted ? `${styles.post} ${styles.highlighted}` : styles.post}>
        <a href={link} target="_blank" rel="noreferrer">
          <div className={styles.image}>
            <Image
              src={imagePath}
              alt={original_title}
              width={500}
              height={800}
              layout="responsive"
            />
          </div>
        </a>
        <div className={styles.body}>
          <h3>{original_title}</h3>
          <div className={styles.content}>
            <time>
              Year:
              <Moment format="YYYY">
                {release_date}
              </Moment>
            </time>
            <div>
              Rating:
              {vote_average}
            </div>
          </div>
          <button className={styles.btnHighlight} type="button" onClick={handleHighlight}>
            <img height={30} width={30} src="/icons/star.png" alt="star_icon" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default PostItem;
