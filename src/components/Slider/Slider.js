import SimpleImageSlider from "react-simple-image-slider";
import et from '../../assets/ET.jpg';
import vikram from '../../assets/vikram.jpg'
import don from '../../assets/Don.jpg';

const images = [
  { url: vikram},
  { url: et},
  { url: don},
  { url: "https://cdn.kalingatv.com/wp-content/uploads/2021/01/kgf-chapter-2-Youtube.jpg" },
  
];

const Slider = () => {
  return (
    <div className="text-center my-2 ml-3">
      <SimpleImageSlider
        width={'95%'}
        height={400}
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