import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { HOME_PAGE } from "./queries";
import { useQuery } from "react-apollo-hooks";
import Movie from "./Movie";

const Main = styled.div`
  margin: 60px 0px 100px 0px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 0.7fr);
  flex-wrap: wrap;
  justify-items: center;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 40px;
  font-weight: 200;
  margin-bottom: 40px;
`;

const Paragraph = styled.span`
  text-align: center;
  font-size: 17px;
  font-weight: 100;
  display: block;
  opacity: 0.5;
`;

const Loading = styled.span`
  text-align: center;
  font-style: italic;
  font-size: 17px;
  font-weight: 100;
  display: block;
  margin-top: 100px;
`;

const Home = () => {
  const { loading, data, error } = useQuery(HOME_PAGE);
  return (
    <>
      <Main>
        <Title>The MovieQL</Title>
        <Paragraph>Click on the card below for more information</Paragraph>
        {loading && <Loading>{"Loading..."}</Loading>}
        {error && <Loading>{"ERROR!"}</Loading>}
      </Main>
      <Container>
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
    </>
  );
};

export default Home;
