import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "./Article.module.css";
import BookmarkLabel from "../components/BookmarkLabel";
import Toast from "../components/Toast";
function Article() {
  const [addedToBookmarks, setAddedToBookmarks] = useState(false);
  const [displayToast, setDisplayToast] = useState(false);
  let { state } = useLocation();
  let { webPublicationDate } = state;
  let { thumbnail, headline, bodyText, main, trailText } = state.fields;
  function isAddedToBookmark() {
    if (localStorage.getItem(state.id)) return true;
    return false;
  }
  function addToBookmarks() {
    state.bookmarked = true;
    localStorage.setItem(state.id, JSON.stringify(state));
    setAddedToBookmarks(true);
    setDisplayToast(true);
    setTimeout(() => {
      setDisplayToast(false);
    }, 2000);
    console.log(state.bookmarked);
  }
  function removeFromBookmarks() {
    state.bookmarked = false;
    localStorage.removeItem(state.id);
    setAddedToBookmarks(false);
    setDisplayToast(true);
    setTimeout(() => {
      setDisplayToast(false);
    }, 2000);
  }

  useEffect(() => {
    setAddedToBookmarks(isAddedToBookmark());
  }, []);
  trailText = trailText.replace("<strong>", "").replace("</strong>", "");
  return (
    <>
      {displayToast && addedToBookmarks && (
        <Toast text="saved to bookmarks" className="green-bookmark" />
      )}
      {displayToast && !addedToBookmarks && (
        <Toast text="removed from bookmarks" className="red-bookmark" />
      )}
      <div className={classes.mainContainer}>
        <div>
          {addedToBookmarks ? (
            <BookmarkLabel
              className="red-bookmark"
              text="remove bookmark"
              clickHandler={removeFromBookmarks}
            />
          ) : (
            <BookmarkLabel text="add bookmark" clickHandler={addToBookmarks} />
          )}

          <span className={classes.date}>{webPublicationDate}</span>
          <h1>{headline}</h1>
          <h2>{trailText}</h2>
        </div>
        <section className={classes.content}>
          <p>{bodyText.slice(0, 3000)}</p>
          <img src={thumbnail} />
        </section>
      </div>
    </>
  );
}

export default Article;
