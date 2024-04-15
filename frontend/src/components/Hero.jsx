import Carousel from "./Carousel/Carousel";
import CTA from './CTA';

export default function Hero() {
  return (
    <div className="hero-container m-4">
      <Carousel />
      <CTA />
    </div>
  );
}
