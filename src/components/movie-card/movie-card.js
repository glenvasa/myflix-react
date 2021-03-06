import React from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./movie-card.css";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world,
    // which, in this case, is `MainView`, as `MainView is what's connected
    // to your database via the movies endpoint of your API
    const { movie } = this.props;

    return (
      <Card
        style={{ width: "22rem", height: "38rem", backgroundColor: "black" }}
        className="movie-card mt-3 rounded"
      ><Card.Title className='movie-title'>{movie.Title}</Card.Title>
       <Link to={`/movies/${movie._id}`}>
         <Card.Img variant="top" src={movie.ImagePath}  className="movie-image"/>
       </Link>
        
        <Card.Body className="movie-card-body">
          
          {/* <Card.Text>{movie.Description}</Card.Text> */}
          <Link to={`/movies/${movie._id}`}>
            <Button
              variant="link"
              className="movie-card-button"
            >
              Movie Details
            </Button>
          </Link>
          {/* <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link" style={{ background: '#690f38' }}>Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link" style={{ background: '#690f38' }}>Genre</Button>
          </Link> */}
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }),
  }),
};
