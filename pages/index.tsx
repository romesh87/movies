/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Head from 'next/head';
// import { InferGetStaticPropsType } from 'next';
import MovieList from '../components/Movies/MovieList';
// export const getStaticProps = async () => {

// };

// const HomePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => (
const HomePage = () => (
  <>
    <Head>
      <title>Top 500 movies</title>
      <meta name="description" content="top 500 movies IMDB" />
    </Head>
    <MovieList />
  </>
);

export default HomePage;
