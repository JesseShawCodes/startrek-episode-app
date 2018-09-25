import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Episode from './Episode'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  componentDidMount() {
    fetch('http://ec2-52-90-200-167.compute-1.amazonaws.com:8080')
    .then(data => data.json())
    .then(data => this.setState({dataReceived: true, data: data}))
  }
  
  render() {
    var data = []
    if (this.state.dataReceived === true) {
      for (var i = 0; i < this.state.data.length; i++) {
        data.push(<Episode key={i}
          title={this.state.data[i].primaryTitle}
          originalTitle={this.state.data[i].originalTitle}
          episodeNumber={this.state.data[i].episodeNumber}
          seasonNumber={this.state.data[i].seasonNumber}
        />)
      }
      console.log("DATA RECEIVED!")
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h2>Select Season</h2>
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="2">5</option>
          <option value="3">6</option>
          <option value="4">7</option>
        </select>
        <div className="data-section">
          {data}
        </div>
      </div>
    );
  }
}

export default App;
