import classes from "./ArticleCard.module.css";

function ArticleCard(props) {
  return (
    <div className={classes.articleContainer}>
      <img src={props.articleImage} />
      <div>
        <p className={classes.title}>{props.title}</p>
        <p className={classes.decription}>{props.description}</p>
      </div>
    </div>
  );
}
export default ArticleCard;
