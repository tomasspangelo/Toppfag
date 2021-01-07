import React from "react";
import Carousel from "react-bootstrap/Carousel";
import backgroundImg from "./carouselb.png";

const HomeCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={backgroundImg}
          alt="First slide"
          height="400px"
        />
        <Carousel.Caption>
          <h3>
            Lei av å finne ut av hvordan faget er etter at du har hatt det?
          </h3>
          <p>
            Med ToppFag kan du se vurderinger tidligere elever har gjort av et
            emne, slik at du slipper å finne ut halvveis ut i semesteret at
            dette faget ikke er noe for deg!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={backgroundImg}
          alt="Third slide"
          height="400px"
        />

        <Carousel.Caption>
          <h3>Vurderinger gjort av studenter</h3>
          <p>
            Emnebeskrivelser kan ofte være misvisende og gi et helt annet
            inntrykk av faget enn det studenter sitter igjen med etter å ha hatt
            det. Les inntrykkene studenter sitter igjen med etter å ha
            gjennomført faget.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={backgroundImg}
          alt="Third slide"
          height="400px"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeCarousel;
