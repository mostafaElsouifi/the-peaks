import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./SearchResults.module.css";
import ArticleCard from "../components/ArticleCard";
import Spinner from "../components/Spinner";
function SearchResults() {
  const apiKey = import.meta.env.VITE_GUARDIAN_API_KEY;
  const [searchResults, setSearchResults] = useState([]);
  const [loading, updateLoading] = useState(true);
  const [counter, setCounter] = useState(false);

  async function fetchData(searchTerm) {
    try {
      const response = await fetch(
        `https://content.guardianapis.com/search?q=${searchTerm}&page=1&show-fields=all&api-key=${apiKey}`
      );
      const data = await response.json();

      setSearchResults(data.response.results);
      updateLoading(false);
      setCounter(true);
      //updateLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    const searchTerm = window.location.search.replace("?", "");
    fetchData(searchTerm);

    console.log(searchResults);
  }, [counter]);
  return (
    <>
      <div className={classes.container}>
        <h1>Search Results</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className={classes.wrapper}>
            {searchResults.length > 0 ? (
              searchResults.map((article) => (
                <Link
                  to={`../article?${article.id}`}
                  relative="/article"
                  key={article.id}
                  state={article}
                >
                  <ArticleCard
                    title={article.webTitle}
                    articleImage={article.fields.thumbnail}
                  />
                </Link>
              ))
            ) : (
              <p>No results</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default SearchResults;
