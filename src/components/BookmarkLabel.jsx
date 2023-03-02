import classes from "./BookmarkLabel.module.css";
import bookmarkIcon from "../assets/bookmark-icon.svg";
function BookmarkLabel(props) {
  return (
    <div
      className={
        classes[props.className]
          ? `${classes[props.className]} ${classes.BookmarkLabel}`
          : classes.BookmarkLabel
      }
      onClick={props.clickHandler}
    >
      <img src={bookmarkIcon} />
      <span> {props.text.toUpperCase()}</span>
    </div>
  );
}
export default BookmarkLabel;
