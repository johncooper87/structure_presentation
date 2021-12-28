import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styles.scss';

function About() {
  return (
    <Carousel
      showArrows={false}
      showThumbs={false}
      showStatus={false}
      autoPlay
      infiniteLoop
      className="carousel-root"
    >
      <div>
        <div className="slide1_container">
          <img src="/images/slide1.png" alt="Настраивайте виджеты" />
        </div>
        <div className="legend">
          <div className="legend__title">Облачная система мониторинга персонала</div>
          <div className="legend__text">Аналитика данных IoT-системы Exon Smart</div>
        </div>
      </div>
      <div>
        <img src="/images/slide2.png" alt="Настраивайте виджеты" />
        <div className="legend">
          <div className="legend__title">Умные устройства</div>
          <div className="legend__text">
            Смарт-часы и турникеты для контроля эффективности и безопасности на предприятиях.
          </div>
        </div>
      </div>
    </Carousel>
  );
}

export default About;
