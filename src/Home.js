import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Query } from "react-apollo";
import { HOME_PAGE } from "./queries";
import { useQuery } from "react-apollo-hooks";
import Movie from "./Movie";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 0.7fr);
  flex-wrap: wrap;
  justify-items: center;
`;

const Home = () => {
  const { loading, data, error } = useQuery(HOME_PAGE);
  return (
    <Container>
      <Helmet>
        <title>Home | MovieQL</title>
      </Helmet>
      {loadding && "Loading"}
      {error && "ERROR!"}
      {!loading &&
        data &&
        data.movies &&
        data.movies.map(movie => (
          <Movie
            id={movie.id}
            key={movie.id}
            poster={movie.medium_cover_image}
            title={movie.title}
            rating={movie.rating}
          />
        ))}
    </Container>
  );
};

export default Home;
