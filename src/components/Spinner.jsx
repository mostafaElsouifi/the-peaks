import classes from "./Spinner.module.css";
function Spinner() {
  return (
    <div className={classes.lds_ring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
export default Spinner;
