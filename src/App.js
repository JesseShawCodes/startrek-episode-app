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
      this.setState({dataVisual: newData, select: "---"})
    }
  }

  handleChange(e) {
    this.updateData(e.target.value)
  }

  sortIt(e) {
    this.setState({select: e.target.value})
    // var sortedData = this.state.dataVisual
    if (e.target.value === "Votes") {
      this.state.dataVisual.sort(function (a, b) {
        return b.numVotes - a.numVotes;
      });
    }
    if (e.target.value === "Rating") {
      this.state.dataVisual.sort(function (a, b) {
        return b.averageRating - a.averageRating;
      });
    }
    if (e.target.value === "Title") {
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
    /*Render Episode Components*/
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
    /* Render Error Message */
    if(this.state.error) {
      var error = 
      <section className="error-message">
        UNABLE TO OBTAIN DATA
      </section>
    }

    return (
      <main className="App">
        <h1>Star Trek App</h1>
        <h2>Select Season</h2>
        <div className="data-section">
        <section className="selection-container">
          <section className="season-select">
            <label for="Select Season of Star Trek">
            <form>
            <select value={this.state.season} onChange={this.handleChange} title="select-season">
              <label for="Select Season">
                Season: {this.state.season}
              </label>
              <option value="All Seasons">All Seasons</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
            </form>
            </label>
          </section>
          <section className="sort-section">
          <label for="Sort Seasons by Title, Rating, or Votes">
          <form>
            <section>
              <label for="Sort By">
              Sort by: {this.state.select}
              </label>
            </section>
            <select value={this.state.select} onChange={this.sortIt}  title="select-sort">
              <option value="default" label="default">---</option>
              <option value="Title" label="Title">Title (A - Z)</option>
              <option value="Rating" label="Rating">Average Rating (Highest - Lowest)</option>
              <option value="Votes" label="Votes">Votes (Highest - Lowest)</option>
            </select>
          </form>
          </label>
          </section>
        </section>
        <section className="episode-section">
          {trekEpisodes}
          {error}
        </section>
        </div>
      </main>
    );
  }
}

export default App;
