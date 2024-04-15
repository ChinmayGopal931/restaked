import Header from '../components/Header/Header';
import Hero from '../components/Hero';

export default function Home() {
    return (
      <div className="home-container mx-auto">
          <Header img='https://i.postimg.cc/5tWHkwyR/Logo-Clear-Background.png' title='Real-time EigenLayer Data Analytics & APIs' />
          <Hero />
      </div>
    );
}