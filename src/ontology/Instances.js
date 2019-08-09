import React, {Component} from 'react';
import './Instances.css';

class Instance extends Component{
  constructor(props){
    super(props);

    this.state = {
      loading:true,
      current_position:0,
      current_position_entity:0,
      autocomplete:{list:[]},
      autocompleteShown:{list:[]},
      data:{list:[]}
    };
  }

  loadMore(amount){
    var search = document.getElementById('searchInput').value;
    if(amount==0){
      var newPos = 0;
    }
    else{
      var newPos = this.state.current_position+amount;
    }
    var url = "http://localhost:8888/doctime/webapp/autocomplete/instance/"+newPos
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.setRequestHeader("base-iri",search);
    //xmlHttp.onload = this.setData();
    xmlHttp.send( null );
    var data = JSON.parse(xmlHttp.responseText);
    console.log(data)
    this.setState({current_position:newPos, autocompleteShown:data});
  }

  loadSingle(amount, selected){
    if(amount==0){
      var newPos = 0;
    }
    else{
      var newPos = this.state.current_position_entity+amount;
    }
    var url = "http://172.24.101.57/rest/webapp/view_by/instance/"+amount
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.setRequestHeader("base-iri",selected);
    xmlHttp.send( null );
    var data = JSON.parse(xmlHttp.responseText);
    this.setState({current_position_entity:newPos, data:data, currentClass:selected});

  }

  render(){
    return (
      <div className="Instances container">
        <div className="row">
          <div className="searchElement col-sm-6">
            <input id="searchInput" className="elementSearch" placeholder="Class" onChange={this.startWith}></input>


            <button onClick={()=>this.loadMore(0)}>Search</button>
            <br/>
              <button onClick={()=>this.loadMore(-15)}>prev</button>
              -
              <button onClick={()=>this.loadMore(15)}>next</button>
            {this.state.autocompleteShown.list.map((element, i)=>
              <p><span className="clickable" onClick={()=>this.loadSingle(0, element.element)}>{element.element}</span></p>
            )}
          </div>
          <div className="selectElement col-sm-6">
            {this.state.data.list.map((element, i)=>
              <p><span className="clickable">{element.element}</span></p>
            )}
            <button onClick={()=>this.loadSingle(-15, this.state.currentClass)}>prev</button>
            -
            <button onClick={()=>this.loadSingle(15, this.state.currentClass)}>next</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Instance;
