import React, {Component} from 'react';
import './Timeline.css';

class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading:true,
      current_position:0
    };
    this.getDate = this.getData.bind(this);
    this.normalize = this.normalize.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.compare_amounts = this.compare_amounts.bind(this);
    this.loadDate = this.loadDate.bind(this);
  }

componentDidMount() {
    var data = this.getData();
    this.setState({loading:false,data : data});
}

getData(){
    var url = "http://172.24.101.57/rest/webapp/timeline/space/"+this.state.current_position
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
  compare_amounts(string1, string2){
    var val1 = parseInt(string1)
    var val2 = parseInt(string2)
    if(val1>val2){
      return val1
    }

    return val2

  }

loadMore(){
  var newPos = this.state.current_position+25;
  var url = "http://172.24.101.57/rest/webapp/timeline/space/"+newPos
  var xmlHttp = null;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, false );
  xmlHttp.onload = this.setData();
  xmlHttp.send( null );
  var data = this.state.data.list.concat(JSON.parse(xmlHttp.responseText).list);
  var newData = this.state.data;
  newData.list = data;
  this.setState({current_position:newPos,data : newData});
}

setData(){
  console.log(this.arguments)
}

loadDate(date){
  var myDate = new Date(date.replace("'",""));
  var resp = "";
  resp = resp + myDate.getFullYear()
  resp = resp + "/"+myDate.getMonth()
  resp = resp + "/"+myDate.getDay()
  return resp;
}

  render(){
    return (
      <div className="Timeline">
          {this.state.loading ? <span>loading...</span> :
            <div>
              <table>
              {this.state.data.list.map((context, i)=>
                <tr>
                  <td>&bull;{this.loadDate(context.date.split("'")[1])}</td>
                  <td>{context.context_subject}</td>
                  <td>{this.compare_amounts(context.total_documents.split("'")[1], context.total_links.split("'")[1])}</td>
                  <td><a href={()=>this.normalize(context.context_url)}>link</a></td>
              </tr>
              )}
              </table>
              <button className="loadMore" onClick={this.loadMore}>Load more</button>

            </div>

          }
      </div>
    );
  }
}

export default Search;
