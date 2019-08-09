import React, {Component} from 'react';
import './topics_graph.js';
import * as d3 from "d3";
import './Topics.css';


class Search extends Component{
  constructor(props){
    super(props);

    this.init_graph = this.init_graph.bind(this);
  }

  componentDidMount() {
  }


  init_graph(){

  }


  render(){
    return (
      <div className="Topics">
        <iframe src="https://172.24.101.57/graph.html"></iframe>
      </div>
    );
  }
}
export default Search;
