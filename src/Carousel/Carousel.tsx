import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Book } from "../Util/Interfaces";
import Card from "../Card/Card";
import './Carousel.css';


interface Props {
    books: Book[] | null
}

function Carousel({books}: Props) {

    const bookCards = books?.map(book => {
        return (
            // <div>
                <Card
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    authors={book.authors}
                    image={book.image_links.smallThumbnail}
                    book={book}
                />
            // </div>
        )
    })

    function NextArrow(props: any) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", color: "orange" }}
            onClick={onClick}
          />
        );
      }
      
      function PrevArrow(props: any) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", color: "orange" }}
            onClick={onClick}
          />
        );
      }
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    //   nextArrow: <NextArrow />,
    //   prevArrow: <PrevArrow />
    };
    return (
    <div className="slider-container">
      <Slider {...settings}>
        {bookCards}
      </Slider>
    </div>
    );
  }

  export default Carousel