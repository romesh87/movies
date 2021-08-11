import { useEffect, useState, FC } from 'react';
import Image from 'next/image';
import Moment from 'react-moment';

import { getItemFromLocalStorage, setItemInLocalStorage } from '../../utils';
import { API_BASE_URL, API_KEY } from '../../constants';

import styles from './MovieItem.module.css';

export interface Props {
  movie: {
    id: string;
    original_title: string;
    release_date: string;
    vote_average: string;
    poster_path: string;
  }
}

const MovieItem: FC<Props> = ({ movie }) => {
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
    } else {
      setIsHighlighted(false);
    }
  }, [movie.id]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((data) => {
        setLink(`https://www.imdb.com/title/${data.imdb_id}`);
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.log(error));
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
      <div className={isHighlighted ? `${styles.movie} ${styles.highlighted}` : styles.movie}>
        <a href={link} target="_blank" rel="noreferrer">
          <div className={styles.image}>
            { poster_path ? (
              <Image
                src={imagePath}
                alt={original_title}
                width={500}
                height={800}
                layout="responsive"
              />
            )
              : <div className={styles.posterFallback}>No Image</div>}
          </div>
        </a>
        <div className={styles.body}>
          <h3>{original_title}</h3>
          <div className={styles.content}>
            <time>
              <span className={styles.boldText}>Year: </span>
              <Moment format="YYYY">
                {release_date}
              </Moment>
            </time>
            <div>
              <span className={styles.boldText}>Rating: </span>
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

export default MovieItem;
