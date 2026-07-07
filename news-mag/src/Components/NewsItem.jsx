import image from "../assets/p.png";
import PropTypes from "prop-types";

const NewsItem = ({ title, description, src, url }) => {
  const safeTitle = title ? title.slice(0, 50) : "Untitled News";
  const safeDescription = description
    ? description.slice(0, 90)
    : "No description available for this news.";

  return (
    <div
      className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2 "
      style={{ maxWidth: "320px" }}
    >
      <img
        src={src ? src : image}
        style={{ height: "200px", width: "305px" }}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{safeTitle}</h5>
        <p className="card-text">{safeDescription}</p>
        {url ? (
          <a
            href={url}
            className="btn btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            Read More
          </a>
        ) : (
          <button className="btn btn-secondary" disabled>
            Link unavailable
          </button>
        )}
      </div>
    </div>
  );
};

NewsItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  src: PropTypes.string,
  url: PropTypes.string,
};

export default NewsItem;
