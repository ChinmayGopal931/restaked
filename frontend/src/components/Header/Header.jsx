import './Header.css'; 

export default function Header({ img, title, ctaText, ctaOnClick }) {
  return (
    <header className="header-container" >
        <img className='header-img' src={ img } />
        <h1 className='header-title' >Real-time <b>EigenLayer</b> data and analytics.</h1>
    </header>
  );
}

