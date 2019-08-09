import React, {Component} from 'react';
import './Classes.css';

class Properties extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading:true,
      current_position:0,
      autocomplete:{list:[]},
      autocompleteShown:{list:[]},
      data:{list:[]}
    };
    this.getDate = this.getData.bind(this);
    this.normalize = this.normalize.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.startWith = this.startWith.bind(this);
  }

componentDidMount() {
    var data = this.getData();
    this.setState({loading:false,autocomplete:data,autocompleteShown:data});
}

getData(){
    var url = "http://172.24.101.57/rest/webapp/autocomplete/property/"
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
  }

  normalize(input){
    var output = input.replace(">*>*>",",");
    output = output.replace("<$<$<",";");
    output = output.replace("<#><#>",":");
    return output
  }

loadMore(amount, selected){
  if(amount==0){
    var newPos = 0;
  }
  else{
    var newPos = this.state.current_position+amount;
  }
  var url = "http://172.24.101.57/rest/webapp/view_by/property/"+selected+"/"+newPos
  var xmlHttp = null;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, false );
  //xmlHttp.onload = this.setData();
  xmlHttp.send( null );
  var data = JSON.parse(xmlHttp.responseText);
  this.setState({current_position:newPos,data:data, currentClass:selected});
}

startWith(){
  var search = document.getElementById('searchInput').value;
  if(search==""){
    var newList = this.state.autocomplete.list;
    this.setState({autocompleteShown:{list:newList}});
  }
  else{
    var listElements = this.state.autocomplete.list;
    var newList = [];
    for(var i=0;i<listElements.length;i++){
      var elementString = listElements[i].class.split("#")[1]
      if(elementString.startsWith(search)){
        newList.push(listElements[i])
      }
    }
    this.setState({autocompleteShown:{list:newList}});
}
}

  render(){
    return (
      <div className="Panels container">
        <div className="row">
          <div className="searchElement col-sm-6">
            <input id="searchInput" className="elementSearch" placeholder="Class" onChange={this.startWith}></input>
            {this.state.autocompleteShown.list.map((element, i)=>
              <p><span className="clickable" onClick={()=>this.loadMore(0, element.class.split("#")[1])}>{element.class}</span></p>
            )}
          </div>
          <div className="selectElement col-sm-6">
            {this.state.data.list.map((element, i)=>
              <p><span className="clickable">{element.element}-{element.element2}</span></p>
            )}
            <button onClick={()=>this.loadMore(-15, this.state.currentClass)}>prev</button>
            -
            <button onClick={()=>this.loadMore(15, this.state.currentClass)}>next</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Properties;
