import React, { Component } from 'react';
import './App.css';
import Episode from './Episode'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      season: 2,
      data: [],
      dataReceived: false,
      dataVisual: [],
      select: "votes"
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateData = this.updateData.bind(this);
    this.sortIt = this.sortIt.bind(this);
  }

  componentDidMount() {
    fetch('http://ec2-52-90-200-167.compute-1.amazonaws.com:8080')
    .then(data => data.json())
    .then(data => this.setState({dataReceived: true, data: data, dataVisual: data}))
    .then(this.updateData(this.state.season))
  }

  updateData(e) {
    this.setState({season: e,dataVisual: []});
    var newData = []
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].seasonNumber === parseInt(e)) {
        newData.push(this.state.data[i])
      }
    }
    this.setState({dataVisual: newData})
  }

  handleChange(e) {
    this.updateData(e.target.value)
  }

  sortIt(e) {
    this.setState({select: e.target.value})
    // var sortedData = this.state.dataVisual
    if (this.state.select === "votes") {
      this.state.dataVisual.sort(function (a, b) {
        return b.numVotes - a.numVotes;
      });
    }
    if (this.state.select === "rating") {
      this.state.dataVisual.sort(function (a, b) {
        return b.averageRating - a.averageRating;
      });
    }
    if (this.state.select === "title") {
      this.state.dataVisual.sort(function(a, b) {
        console.log(a)
        var nameA = a.originalTitle.toUpperCase();
        var nameB = b.originalTitle.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
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
          rating={this.state.dataVisual[i].averageRating}
          votes={this.state.dataVisual[i].numVotes}
        />)
      }
    }

    return (
      <div className="App">
        <h2>Select Season</h2>
        <div className="data-section">
        <section className="slidecontainer">
          Season: {this.state.season}
          <input type="range" min="1" max="7" value={this.state.season} className="slider" id="myRange" onChange={this.handleChange} />
          Sort by: 
          <select value={this.state.select} onChange={this.sortIt}>
            <option value="title">Title</option>
            <option value="rating">Average Rating</option>
            <option value="votes">Votes</option>
          </select>
        </section>
        <section className="episode-section">
          {trekEpisodes}
        </section>
        </div>
      </div>
    );
  }
}

export default App;
