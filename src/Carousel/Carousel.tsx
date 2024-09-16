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

    const bookCards: React.ReactNode | React.ReactNode[] = books?.map((book: Book) => {
        return (
                <Card
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    authors={book.authors}
                    image={book.image_links ? book.image_links.smallThumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaQakHOfrZN4cKsNq6Lpu9L435U9q4l3OJMA&s'}
                />
             )
    })

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
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