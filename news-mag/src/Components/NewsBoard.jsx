import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);

    const url = import.meta.env.DEV
      ? `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${
          import.meta.env.VITE_API_KEY
        }`
      : `/api/news?category=${encodeURIComponent(category)}`;

    fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          let serverMessage = "";

          try {
            const payload = await response.json();
            serverMessage = payload?.error || payload?.message || "";
          } catch {
            serverMessage = "";
          }

          throw new Error(
            serverMessage
              ? `Error: ${response.status} - ${serverMessage}`
              : `Error: ${response.status}`,
          );
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data.articles || []);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [category]);

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {error && <p className="text-danger">Failed to load news: {error}</p>}
      {articles.length > 0
        ? articles.map((news) => (
            <NewsItem
              key={news.url}
              title={news.title}
              description={news.description}
              src={news.urlToImage}
              url={news.url}
            />
          ))
        : !error && <p className="text-center">No news available.</p>}
    </div>
  );
};

NewsBoard.propTypes = {
  category: PropTypes.string.isRequired,
};

export default NewsBoard;
