import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import classes from "./AllBookmarks.module.css";
function AllBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [counter, setCounter] = useState(false);
  function getBookmarks() {
    const allBookmarks = [];
    const ids = Object.keys(localStorage);
    for (let id of ids) {
      allBookmarks.push(JSON.parse(localStorage.getItem(id)));
    }
    setBookmarks(allBookmarks);
    setCounter(true);
  }
  useEffect(() => {
    getBookmarks();
    console.log(bookmarks);
  }, [counter]);
  return (
    <>
      <div className={classes.container}>
        {bookmarks.length === 0 && <p>No Bookmarks Added</p>}
        {bookmarks.map((article) => (
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
        ))}
      </div>
    </>
  );
}
export default AllBookmarks;
