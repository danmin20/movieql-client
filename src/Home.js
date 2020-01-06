import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { HOME_PAGE } from "./queries";
import { useQuery } from "react-apollo-hooks";
import Movie from "./Movie";

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 0.7fr);
  flex-wrap: wrap;
  justify-items: center;
`;

const Title = styled.h2`
  text-align: center;
  margin-top: 50px;
  margin-left: 10px;
  font-size: 30px;
  font-weight: 200;
  margin-bottom: 20px;
`;

const Paragraph = styled.span`
  text-align: center;
  margin-top: 50px;
  margin-left: 10px;
  font-style: italic;
  font-size: 17px;
  font-weight: 100;
  margin-bottom: 20px;
  display: block;
`;

const Home = () => {
  const { loading, data, error } = useQuery(HOME_PAGE);
  return (
    <Container>
      <span>
        <Title>The MovieQL</Title>
        <Paragraph>Clik to See Details</Paragraph>
        <Paragraph>
          {loading && "Loading..."}
          {error && "ERROR!"}
        </Paragraph>
      </span>
      <Helmet>
        <title>Home | MovieQL</title>
      </Helmet>
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
