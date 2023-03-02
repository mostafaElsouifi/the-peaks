import { Link, redirect } from "react-router-dom";
import { useState } from "react";

import classes from "./Header.module.css";
import searchIcon from "../assets/search-icon.svg";
function Header() {
  const api = "7bbd4988-0d1d-493b-afb4-9df6b6f4700f";
  const [searchResults, setSearchResults] = useState([]);
  async function fetchData(searchTerm) {
    try {
      const response = await fetch(
        `https://content.guardianapis.com/search?q=${searchTerm}&page=1&show-fields=all&api-key=${api}`
      );
      const data = await response.json();

      setSearchResults(data.response.results);
      console.log(data);
      //updateLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  }
  function searchHandler(event) {
    event.preventDefault();
    let searchTerm = event.target.querySelector("input").value.trim();

    if (searchTerm !== "") {
      //fetchData(event.target.value);
      window.location.href = `/search?${searchTerm}`;
      //
    }
  }
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>
        <span>The </span>
        <span>Peaks</span>
      </Link>
      <div className={classes.searchBox}>
        <form onSubmit={searchHandler}>
          <input type="text" name="search" placeholder="Search all news" />
          <button type="submit">
            <img src={searchIcon} />
          </button>
        </form>
      </div>
    </header>
  );
}
export default Header;
