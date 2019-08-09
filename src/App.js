import React, {Component} from 'react';
import './App.css';
import Search from './components/Search.js';
import Timeline from './components/Timeline.js';
import Topics from './components/Topics.js';

import Classes from './ontology/Classes.js';
import Properties from './ontology/Properties.js';
import Instances from './ontology/Instances.js';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      tab_current:1
    };
    this.selectTab = this.selectTab.bind(this);
    this.goToGraph = this.goToGraph.bind(this);
  }

  goToGraph(){
    window.location.href = 'http://172.24.101.57/graph.html';
  }
  
  selectTab(currentTab){
    this.setState({
      tab_current:currentTab
    });
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <span className="clickable">SPARQL</span><span className="MainTitle"> DocTime </span><span className="clickable">OWLDoc</span>
        </header>
        <body>
          <div className="NavigationMenu">
            <button onClick={() => this.selectTab(1)}>&#x1f50d; Search</button>
            <button onClick={() => this.selectTab(2)}>&#x1F551; Timeline</button>
            <button onClick={this.goToGraph}>&#x2604;	Topics</button>
            <button onClick={() => this.selectTab(4)}>&#x2610; Class</button>
            <button onClick={() => this.selectTab(5)}>&#x260A; Property</button>
            <button onClick={() => this.selectTab(6)}>&#x260C; Instance</button>
          </div>
          <div>
            {this.state.tab_current == 0 && <p>loading...</p>}
            {this.state.tab_current == 1 && <Search></Search>}
            {this.state.tab_current == 2 && <Timeline></Timeline>}
            {this.state.tab_current == 3 && <Topics></Topics>}

            {this.state.tab_current == 4 && <Classes></Classes>}
            {this.state.tab_current == 5 && <Properties></Properties>}
            {this.state.tab_current == 6 && <Instances></Instances>}
          </div>

        </body>
      </div>
    );
  }
}

export default App;
