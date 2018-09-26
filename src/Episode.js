import React, { Component } from 'react';
import './Episode.css';

class Episode extends Component {
  render() {
    return (
      <div className="episode">
        <h3>{this.props.title}</h3>
        <span className="title">{this.props.originalTitle}</span>
        <span className="episode-number">Episode: {this.props.episodeNumber}</span>
        <span className="season-number">Season: {this.props.seasonNumber}</span>
        <div className="average-rating">Rating: {this.props.rating}</div>
        <div className="number-votes">Number Votes: {this.props.votes}</div>
      </div>
    );
  }
}

export default Episode;
