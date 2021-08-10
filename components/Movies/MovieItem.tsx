// eslint-disable-next-line no-use-before-define
import React from 'react';
import Moment from 'react-moment';

// import { IFeedbackItem } from '../../interfaces';

import styles from './MovieItem.module.css';

export interface Props {
  item: any;
}

const FeedbackItem: React.FC<Props> = ({ item }) => (
  <div className={styles.container}>
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
  </div>
);

export default FeedbackItem;
