export default async function handler(req, res) {
  const category = req.query.category || "general";
  const apiKey = process.env.NEWS_API_KEY || process.env.VITE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Server is missing NEWS_API_KEY (or VITE_API_KEY).",
    });
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${encodeURIComponent(
        category,
      )}&apiKey=${apiKey}`,
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.message || `News API error: ${response.status}`,
      });
    }

    return res.status(200).json({ articles: data.articles || [] });
  } catch {
    return res
      .status(500)
      .json({ error: "Failed to fetch news from upstream API." });
  }
}
