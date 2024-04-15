import PropTypes from 'prop-types';
import './Card.css';

export default function Card({ img, alt = "Image description", title = "EigenLayer Data API", description = "Harness robust datasets & low-latency analytics on EigenLayer and its AVS ecosystem with Restaked.app's proprietary API." }) {
    const handleButtonClick = () => {
        window.location.href = "https://restaked-app.gitbook.io/restaked.app-api-documentation"; // Update this URL to the target documentation URL
    };

    return (
      <div className="card-container">
        <img src={img} alt={alt} className="card-image" />
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          <p className="card-description">{description}</p>
          <button className="card-button btn btn-light btn-lg" onClick={handleButtonClick}>Read Docs</button>
        </div>
      </div>
    );
}

Card.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};
