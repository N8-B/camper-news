import React, { Component } from 'react';
import request from 'superagent';

const CN_URL = "http://www.freecodecamp.com/news/hot";

const App = React.createClass({

  getInitialState: function() {
    return {
      feed: undefined
    }
  },

  componentDidMount: function() {
    var self = this;
    request
      .get(CN_URL)
      .end(function(err, res) {
        let feedJSON = res.body;
        console.log(feedJSON);
        self.setState({ feed: feedJSON });
      });
  },

  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  convertTimestamp: function (timestamp) {
    let d = new Date(timestamp);
    let dateString = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    return dateString;
  },

  render: function() {
    var feedItems = this.state.feed || [];

    return (
      <div className="container">
        <div className="header">
          <h1>Camper News <span className="source-code-link"><a href="https://github.com/N8-B/camper-news">view source code</a></span></h1>
          <span className="decoration-element"></span>
        </div>

          <div className="news-items">
          { feedItems.map((item) => {
            return (
              <div className="news-item" key={item.id}>
                <div className="news-image">
                  {<img src={item.author.picture} alt="" />}
                </div>
                <h3 className="news-header">{item.headline}</h3>
                <div className="news-copy">
                  <a href={item.link}>View Article</a> | <span className="time">{ this.convertTimestamp(item.timePosted) }</span>
                  <div className="upvotes"><i className="fa fa-heart"></i> <span>{item.rank}</span></div>
                </div>
              </div>
            );
          }) }
          </div>
      </div>
    );
  }
});

export default App;
