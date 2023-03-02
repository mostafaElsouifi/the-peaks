import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import BookmarkLabel from "../components/BookmarkLabel";
import FilterSelector from "../components/FilterSelector";
import ArticleCard from "../components/ArticleCard";
import Spinner from "../components/Spinner";
import getCurrentDate from "../../helpers/getCurrentDate";
function Home() {
  const apiKey = import.meta.env.VITE_GUARDIAN_API_KEY;

  const [data, setData] = useState([]);
  const [sportsArticles, setSportsArticles] = useState();
  const [filter, setFilter] = useState("newest");
  const [loading, updateLoading] = useState(true);
  async function fetchData() {
    try {
      const response = await fetch(
        `https://content.guardianapis.com/search?from-date=2022-08-01&order-by=${filter}&page=1&page-size=8&show-fields=all&api-key=${apiKey}`
      );
      const data = await response.json();

      setData(data.response.results);

      updateLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  }
  async function fetchByTag(tag) {
    try {
      const currentDate = getCurrentDate();
      const response = await fetch(
        `https://content.guardianapis.com/search?section=${tag}&from-date=${currentDate}&page=1&page-size=3&show-fields=all&api-key=${apiKey}`
      );
      const data = await response.json();
      console.log(data);
      setSportsArticles(data.response.results);
    } catch (e) {
      console.log(e.message);
    }
  }
  function updateFilterHandler(event) {
    event.preventDefault();
    updateLoading(true);
    setFilter(event.target.value);
  }

  useEffect(() => {
    fetchData();
    fetchByTag("sport");
  }, [filter]);
  return (
    <>
      <div className={classes.toolbar}>
        <h1>Top Stories</h1>
        <div>
          <Link to={"/allbookmarks"}>
            <BookmarkLabel text="view bookmarks" />
          </Link>
        </div>
        <div>
          <FilterSelector updateFilter={updateFilterHandler} value={filter} />
        </div>
      </div>

      {loading && <Spinner />}
      {!loading && (
        <main className={classes.main}>
          <div className={classes.container}>
            <section className={classes.topWrapper}>
              <Link
                to={data[0] && `article?id=${data[0].id}`}
                state={data[0]}
                relative="/article"
              >
                <ArticleCard
                  title={data[0] && data[0].webTitle}
                  description=""
                  articleImage={data[0] && data[0].fields.thumbnail}
                />
              </Link>

              {data.slice(1, 3).map((article) => (
                <Link
                  to={`article?${article.id}`}
                  relative="/article"
                  state={article}
                  key={article.id}
                >
                  <ArticleCard
                    title={article.webTitle}
                    articleImage={article.fields.thumbnail}
                  />
                </Link>
              ))}
            </section>
            <section className={classes.secondWrapper}>
              {data.slice(5).map((article) => (
                <Link
                  to={`article?${article.id}`}
                  relative="/article"
                  key={article.id}
                  state={article}
                >
                  <ArticleCard
                    title={article.webTitle}
                    articleImage={article.fields.thumbnail}
                  />
                </Link>
              ))}
            </section>
            <section className={classes.thirdWrapper}>
              <h1>Sports</h1>
              <div className={classes.cards}>
                {sportsArticles.map((article) => (
                  <Link
                    to={`article?${article.id}`}
                    relative="/article"
                    key={article.id}
                    state={article}
                  >
                    <ArticleCard
                      title={article.webTitle}
                      articleImage={article.fields.thumbnail}
                    />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </main>
      )}
    </>
  );
}
export default Home;
