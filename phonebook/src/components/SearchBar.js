import React from "react";

function SearchBar(props) {
  return (
    <div>
      search{" "}
      <input onChange={props.onChange} placeholder={props.text} />
    </div>
  );
}

export default SearchBar;
