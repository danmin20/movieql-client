import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { MOVIE_DETAILS } from "./queries";
import { withRouter } from 'react-router';
import Movie from "./Movie";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin: 50px;
`;

const Card = styled.div`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  border-radius: 7px;
  margin-left: 20px;
`;

const Image = Card.withComponent("img");

const Title = styled.h1`
  text-align: center;
  margin-top: 20px;
  margin-left: 10px;
  font-size: 24px;
  font-weight: 200;
  margin-bottom: 20px;
`;

const Paragraph = styled.span`
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 10px;
  font-weight: 100;
  display: block;
  color: #2c2c2c;
`;

const MovieContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 0.7fr);
  flex-wrap: wrap;
  justify-items: center;
  margin-top: 50px;
`;

const Detail = ({
  match: {
    params: { movieId }
  }
}) => {
  const { loading, error, data } = useQuery(MOVIE_DETAILS, {
    variables: { movieId: parseInt(movieId) }
  });
  if (loading)
    return (
      <React.Fragment>
        <Helmet>
          <title>Loading | MovieQL</title>
        </Helmet>
        <Title>Loading...</Title>
      </React.Fragment>
    );
  if (error) return "error";
  return (
    <React.Fragment>
      <Container>
        <Helmet>
          <title>{data.movie.title} | MovieQL</title>
        </Helmet>
        <Image src={data.movie.medium_cover_image} />
        <span>
          <Title>{data.movie.title}</Title>
          <Paragraph bold>Rating: {data.movie.rating} / 10</Paragraph>
          <Paragraph>{data.movie.description_intro}</Paragraph>
        </span>
      </Container>
      <Title>Suggested</Title>
      <MovieContainer>
        {data.suggestions.map(movie => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.rating}
            poster={movie.medium_cover_image}
          />
        ))}
      </MovieContainer>
    </React.Fragment>
  );
};
export default withRouter(Detail);
