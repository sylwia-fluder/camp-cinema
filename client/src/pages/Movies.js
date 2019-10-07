import React from "react";
import Poster from "../components/Poster";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../styles/movies.scss";

class Movies extends React.Component {
  handleOnDragStart = e => e.preventDefault();

  responsive = {
    0: { items: 1 },
    1024: { items: 5 }
  };

  render() {
    return (
      <div className="carousel">
        <h2 className="day">TODAY</h2>
        <AliceCarousel
          mouseDragEnabled
          dotsDisabled
          buttonsDisabled
          responsive={this.responsive}
          ref={el => (this.Carousel = el)}
        >
          <Poster size="small" image_src="https://imgur.com/Nejkj2j.jpg" isLink/>
          <Poster size="small" image_src="https://imgur.com/RO61iFS.jpg" isLink/>
          <Poster size="small" image_src="https://imgur.com/PtWhq3d.jpg" isLink/>
          <Poster size="small" image_src="https://imgur.com/OyLVN61.jpg" isLink/>
          <Poster size="small" image_src="https://imgur.com/Nejkj2j.jpg" isLink/>
        </AliceCarousel>

        <button
          className="carousel-button prev"
          onClick={() => this.Carousel.slidePrev()}
        ></button>
        <button
          className="carousel-button next"
          onClick={() => this.Carousel.slideNext()}
        ></button>
      </div>
    );
  }
}

export default Movies;
