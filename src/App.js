import React, { Component } from 'react';
import './App.css';
import Episode from './Episode'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: false,
      data: [],
      dataReceived: false,
      dataVisual: [],
      season: "All Seasons",
      select: "default",
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateData = this.updateData.bind(this);
    this.sortIt = this.sortIt.bind(this);
  }

  // React LifeCycle Methods
  componentDidMount() {
    let appState = this
    fetch('http://ec2-52-90-200-167.compute-1.amazonaws.com:8080')
    .then(data => data.json())
    .then(data => this.setState({dataReceived: true, data: data, dataVisual: data}))
    .catch(function(){
      appState.setState({error: true});
    })
  }

  updateData(e) {
    this.setState({season: e,dataVisual: []});
    console.log(e)
    if(e === "All Seasons") {
      this.setState({dataVisual: this.state.data});
    }
    else {
      var newData = []
      for (var i = 0; i < this.state.data.length; i++) {
        if (this.state.data[i].seasonNumber === parseInt(e, 10)) {
          newData.push(this.state.data[i])
        }
      }
      this.setState({dataVisual: newData, select: "default"})
    }
  }

  handleChange(e) {
    this.updateData(e.target.value)
  }

  sortIt(e) {
    this.setState({select: e.target.value})
    // var sortedData = this.state.dataVisual
    if (e.target.value === "votes") {
      this.state.dataVisual.sort(function (a, b) {
        return b.numVotes - a.numVotes;
      });
    }
    if (e.target.value === "rating") {
      this.state.dataVisual.sort(function (a, b) {
        return b.averageRating - a.averageRating;
      });
    }
    if (e.target.value === "title") {
      this.state.dataVisual.sort(function(a, b) {
        var nameA = a.originalTitle;
        var nameB = b.originalTitle;
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
    if (this.state.dataReceived) {
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

    if(this.state.error) {
      var error = 
      <section className="error-message">
        UNABLE TO OBTAIN DATA
      </section>
    }

    return (
      <div className="App">
        <h1>Star Trek App</h1>
        <h2>Select Season</h2>
        <div className="data-section">
        <section className="slidecontainer">
          <section className="season-select">
            <section>
              Season: {this.state.season}
            </section>
            <select value={this.state.season} onChange={this.handleChange}>
              <option value="All Seasons">All Seasons</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </section>
          <section className="sort-section">
            <section>
            Sort by: 
            </section>
            <select value={this.state.select} onChange={this.sortIt}>
              <option value="default">---</option>
              <option value="title">Title (A - Z)</option>
              <option value="rating">Average Rating (Highest - Lowest)</option>
              <option value="votes">Votes (Highest - Lowest)</option>
            </select>
          </section>
        </section>
        <section className="episode-section">
          {trekEpisodes}
          {error}
        </section>
        </div>
      </div>
    );
  }
}

export default App;
