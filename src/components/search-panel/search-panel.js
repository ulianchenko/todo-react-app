import React from "react";

import "./search-panel.css";

export default class SearchPanel extends React.Component {





  render() {

    const {onSearch} = this.props
    return (
      <input type="text"
              className="form-control search-input"
              placeholder="type to search"
              onChange={(e) => {onSearch(e.target.value)}}/>
    );
  }

}
