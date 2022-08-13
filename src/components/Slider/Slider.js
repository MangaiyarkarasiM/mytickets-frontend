import SimpleImageSlider from "react-simple-image-slider";
import vikram from '../../assets/vikram.jpg'
import don from '../../assets/Don.jpg';

const images = [
  { url: "https://img.freepik.com/free-vector/online-cinema-banner-with-open-clapper-board-film-strip_1419-2242.jpg?w=2000"},
  { url: vikram},
  { url: "https://media.tamilmdb.com/i/movie/04/e2/6709/1000x400/62bfb33c08d6d.png"},
  { url: don}  
];

const Slider = () => {
  return (
    <div className="text-center my-2">
      <SimpleImageSlider
        width={'100vw'}
        height={'65vh'}
        images={images}
        showBullets={true}
        showNavs={true}
        autoPlay={true}
        autoPlayDelay={2.5}
      />
    </div>
  );
}

export default Slider;