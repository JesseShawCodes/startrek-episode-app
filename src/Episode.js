import React, { Component } from 'react';
import './Episode.css';

class Episode extends Component {
  render() {
    return (
      <div className="episode">
        <h3>{this.props.originalTitle}</h3>
        <span className="episode-number">Episode: {this.props.episodeNumber}</span>
        <span className="season-number">Season: {this.props.seasonNumber}</span>
        <section className="badges">
          <div className="average-rating">
            <div className="badge-text">
              <span className="badge-label">Rating:</span>
              <span className="badge-rating">{this.props.rating}</span>
            </div>
          </div>
          <div className="number-votes">
            <div className="badge-text">
              <span className="badge-label">Votes:</span> 
              <span className="badge-votes">{this.props.votes}</span>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Episode;
