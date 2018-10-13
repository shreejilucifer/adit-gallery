import React, { Component } from 'react';

import AlbumsList from './Components/AlbumsList';
import AlbumPhotos from './Components/AlbumPhotos';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {

  render() {
      return (
        <Router basename={'/gallery'}>
          <div style={{margin: "50px"}}>
            <Route exact path="/" component={AlbumsList} />
            <Route path="/:id/:name" component={AlbumPhotos} />
          </div>
        </Router>
      );
    }
  }

export default App;
