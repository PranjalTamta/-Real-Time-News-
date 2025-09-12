import { useState, useEffect } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${
      import.meta.env.VITE_API_KEY
    }`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
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

export default NewsBoard;
