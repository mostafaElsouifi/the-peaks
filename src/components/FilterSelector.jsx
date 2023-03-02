import classes from "./FilterSelector.module.css";

function FilterSelector(props) {
  return (
    <select
      name="filter"
      className={classes.select}
      onChange={props.updateFilter}
      value={props.value}
    >
      <option name="newest" value="newest">
        Newest First
      </option>
      <option name="oldest" value="oldest">
        Oldest First
      </option>
      <option name="relevance" value="relevance">
        Most Popular
      </option>
    </select>
  );
}
export default FilterSelector;
