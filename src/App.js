import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Episode from './Episode'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      season: 2,
      data: [],
      dataReceived: false,
      dataVisual: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('http://ec2-52-90-200-167.compute-1.amazonaws.com:8080')
    .then(data => data.json())
    .then(data => this.setState({dataReceived: true, data: data, dataVisual: data}))
  }

  handleChange(e) {
    this.setState({season: e.target.value,dataVisual: []});
    var newData = []
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].episodeNumber === i) {
        newData.push(<Episode 
          key={i}
          title={this.state.dataVisual[i].primaryTitle}
          originalTitle={this.state.dataVisual[i].originalTitle}
          episodeNumber={this.state.dataVisual[i].episodeNumber}
          seasonNumber={this.state.dataVisual[i].seasonNumber}
        />)
      }
    }
  }
  
  render() {

    var trekEpisodes = []
    if (this.state.dataReceived === true) {
      for (var i = 0; i < this.state.dataVisual.length; i++) {
        trekEpisodes.push(<Episode key={i}
          title={this.state.dataVisual[i].primaryTitle}
          originalTitle={this.state.dataVisual[i].originalTitle}
          episodeNumber={this.state.dataVisual[i].episodeNumber}
          seasonNumber={this.state.dataVisual[i].seasonNumber}
        />)
      }
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h2>Select Season</h2>
        <div className="data-section">
        <section class="slidecontainer">
          Season: {this.state.season}
          <input type="range" min="1" max="7" value={this.state.season} class="slider" id="myRange" onChange={this.handleChange} />
        </section>
          {trekEpisodes}
        </div>
      </div>
    );
  }
}

export default App;
