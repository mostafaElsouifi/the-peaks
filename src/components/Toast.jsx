import classes from "./Toast.module.css";
import bookmarkIcon from "../assets/bookmark-icon.svg";
function Toast(props) {
  return (
    <div
      className={`${classes[props.className]} ${classes.BookmarkLabel}`}
      onClick={props.clickHandler}
    >
      <img src={bookmarkIcon} />
      <span> {props.text.toUpperCase()}</span>
    </div>
  );
}

export default Toast;
